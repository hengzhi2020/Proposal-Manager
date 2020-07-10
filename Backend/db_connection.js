const async = require('async');
const mysql = require('mysql');
const ldap = require('ldapjs');

var authenObj = {
    username: null,
    password: null,
    passLDAP: false,
    passSQL: false,
}

/* This is for VM CentOS connection */
/*
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Boston4now&",
    database: "vaProject"
});
*/

/* This is for MacOS connection */

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "VA_Boston2020",
    password: "Boston4now",
    database: "Proposals_MRS"
});


/* This is for Docker mysql connection */
/*
var con = mysql.createConnection({
    host: "192.168.1.10",     // $ ifconfig | grep 168
    user: "hengzhi2",
    password: "123456",
    database: "proposal_database",
    port: "3306"
});
*/

/* ---------- LDAP Authentication _and_ SQL Verification of reviewers ---------- */

function authenticateDN(username, password) {
    var client = ldap.createClient({
        url: 'ldap://127.0.0.1:389'
    });
    client.bind(username, password,
        function (err) {
            if (err) {
                authenObj.passLDAP = false;
                console.log("Error in new LDAP connection: " + err);
            } else {
                authenObj.passLDAP = true;
                console.log("LDAP connection: Success! username: " + username);

                var opts = {
                    // filter: '(objectClass=*)',              // ==> ALL
                    // filter: '(|(uid=2)(sn=Jhon)(uid-3))',   // ==> OR
                    // filter: '(&(uid=2)(sn=Jhon))'           // ==> AND
                    // filter: '(uidNumber=2008)',
                    // filter: '(uid=hwang)',                  // ==> LDAP username   
                    filter: '(sn=wang)',
                    scope: 'sub',
                    attributes: ['sn']
                };

                client.search('ou=People', opts, function (err, res) {
                    if (err) {
                        console.log("Error in Search: " + err);
                    } else {
                        res.on('searchEntry', function (entry) {
                            console.log('entry: ' + JSON.stringify(entry.object));
                        });
                        res.on('searchReference', function (referral) {
                            console.log('referral: ' + referral.uris.join());
                        });
                        res.on('error', function (err) {
                            console.error('error: ' + err.message);
                        });
                        res.on('end', function (result) {
                            console.log('status: ' + result.status);
                        });
                    }
                });
                // ----------------------------------------------------------------------

            }
        }
    );
}

exports.loginValidation = function (req, res) {

    // after integrating this web portal into VA intranet dashboard, it is supposed
    // to decode SSO(single sign-on) token and get LDAP username to replace the next "req.body.username";
    // "Proposal Manager" requires LDAP "username" only, no password, no LDAP authen for one more time;
    // add OpenLDAP search() with "req.body.username" and "req.body.password" to get the DN for the next
    // ------------------ Search function ----------------------
    authenObj.username = req.body.username;
    authenObj.password = req.body.password;
    // authenticateDN("cn=admin,dc=openldap,dc=local", "516405");
    authenObj.passLDAP = true;
}

exports.authenResults = function (req, res) {

    async.series([

        function (callback) {
            con.query('select id from reviewers where ldap_username = ?', [authenObj.username],
                (err, result) => {

                    if (result.length === 1) {
                        authenObj.passSQL = true;
                    };
                    if (result.length === 0) {
                        authenObj.passSQL = false;
                    };
                    //  console.log("Line-111 query result is: ", result);
                    callback(err);
                }
            );
        },
        function (callback) {
            res.send(authenObj);
            callback(null);
        }
    ],
    );
}

exports.getReviewerInfo = function (req, res) {

    if (authenObj.username) {
        con.query('SELECT id as Id1, id as Id2, ldap_username, user_status FROM reviewers WHERE ldap_username = ? UNION ALL SELECT MIN(id), MAX(id), NULL, NULL FROM reviewers', [authenObj.username],
            function (err, result) {
                if (err) throw err;
                res.json(result);
                console.log('GET reviewers id and user_status from DB: OK');
            });
    }
}
/* -------------------------------------------------------------------------------------------------------- */

exports.proposalList = function (req, res) {
    con.query('select * from proposals order by id desc limit ? offset ?', [+req.query.pageSize, (+req.query.pageNumber - 1) * (+req.query.pageSize)], function (err, result) {
        if (err) throw err;
        res.json(result);
        console.log('GET proposals from DB: OK');
    });
}


exports.getSearchList = function (req, res) {

    var searchTitle = req.query.searchTitle.length !== 0 ? ('%' + req.query.searchTitle + '%') : '';
    var searchDate = req.query.searchDate.length !== 0 ? ('%' + req.query.searchDate + '%') : '';

    if (req.query.searchCombine === 'AND') {
        con.query('select * from proposals where title like ? and created_at like ? order by id desc', [searchTitle, searchDate], function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    } else {
        con.query('select * from proposals where title like ? or created_at like ? order by id desc', [searchTitle, searchDate], function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    }
}

/* working well
exports.getSearchList = function (req, res) {

    con.query('select * from proposals order by id desc', function (err, result) {
        if (err) throw err;
        res.json(result);
        console.log('getSearchList from DB: OK');
    });
}
*/

exports.getReviewReports = function (req, res) {
    con.query('select * from reviewdata', function (err, result) {
        if (err) throw err;
        res.json(result);
    });
}

exports.createProposal = function (req, res) {
    con.query("INSERT INTO proposals (title, VA_sponsor, support, project_presenter, stage, cycle, status) VALUES(?,?,?,?,?,?,?)",
        [req.body.title, req.body.VA_sponsor, req.body.support, req.body.project_presenter, req.body.stage, req.body.cycle, req.body.status],
        (err, result) => {
            if (err) { console.log(err) };
            console.log('Created one proposal record');
        });
}

exports.updateProposal = function (req, res) {
    con.query('UPDATE proposals SET title=?, VA_sponsor=?, support=?, project_presenter=?,stage=?,cycle=?,status=? WHERE id =?',
        [req.body.title, req.body.VA_sponsor, req.body.support, req.body.project_presenter, req.body.stage, req.body.cycle, req.body.status, req.body.id],
        (err, result) => {
            if (err) { console.log(err) };
            console.log('Updated one proposal record');
        });
}

exports.deleteProposal = function (req, res) {
    /*
        con.query('DELETE FROM proposal WHERE id =?', [req.body.id],
            (err, result) => {
                if (err) { console.log(err) };
                console.log('Deleted one proposal record');
            });
    */
    var deletedstatus = 'true';
    con.query('UPDATE proposals SET title=?, deleted=? WHERE id =?', [req.body.title, deletedstatus, req.body.id],
        (err, result) => {
            if (err) { console.log(err) };
            console.log('Updated one proposal record');
        });
}

exports.createRowsForEachReviewer = function (req, res) {

    for (let i = req.body.reviewerIdStart; i <= req.body.reviewerIdEnd; i++) {
        con.query("INSERT INTO reviewdata (proposal_id, reviewer_id, business_comms, feasibility_comms, resources_comms, commitment_comms, constraints_comms, overall_comms) VALUES(?,?,?,?,?,?,?,?)",
            [req.body.maxProposalId + 1, i, '_', '_', '_', '_', '_', '_'],
            (err, result) => {
                if (err) { console.log(err) };
                console.log('Successfully Created - initial record-rows for each reviewer');
            }
        );
    }

}


exports.saveReviewData = function (req, res) {

    var sql = "SELECT count(*) FROM reviewdata WHERE proposal_id= ? AND reviewer_id= ?";
    var sql1 = "SELECT count(*) FROM reviewdata WHERE proposal_id= ? AND reviewer_id= ? AND submitted = ?";
    var existRecord, saveState;

    async.series([

        function (callback) {
            con.query(sql, [req.body.proposal_id, req.body.reviewer_id],
                (err, result) => {
                    console.log('Query for proposalID and reviewerID = ', result);
                    existRecord = Object.values(result[0])[0];
                    console.log('after Query for existRecord = ', existRecord);
                    callback(err);
                }
            );
        },

        function (callback) {
            con.query(sql1, [req.body.proposal_id, req.body.reviewer_id, 'false'],
                (err, result) => {
                    console.log('Query for proposalID and reviewerID and submitState = ', result);
                    saveState = Object.values(result[0])[0];
                    console.log('after Query for saveState = ', saveState);
                    callback(err);
                }
            );
        },

        function (callback) {
            if (existRecord === 0) {
                console.log('Before __ Creating a record');
                con.query("INSERT INTO reviewdata (proposal_id, reviewer_id, business_score, business_comms, feasibility_score, feasibility_comms, resources_score, resources_comms, commitment_score, commitment_comms, constraints_score, constraints_comms, overall_comms) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [req.body.proposal_id, req.body.reviewer_id, req.body.business_score, req.body.business_comms, req.body.feasibility_score, req.body.feasibility_comms, req.body.resources_score, req.body.resources_comms, req.body.commitment_score, req.body.commitment_comms, req.body.constraints_score, req.body.constraints_comms, req.body.overall_comms],
                    (err, result) => {
                        if (err) { console.log(err) };
                        console.log('Successfully CREATE - added one record - Scores and Comments');

                    }
                );
            }
            callback(null);
        },

        function (callback) {
            if (saveState === 1) {
                console.log('Before __ Updating a record');
                con.query("UPDATE reviewdata SET business_score=?, business_comms=?, feasibility_score=?, feasibility_comms=?, resources_score=?, resources_comms=?, commitment_score=?, commitment_comms=?, constraints_score=?, constraints_comms=?, overall_comms=? WHERE proposal_id=? AND reviewer_id=?",
                    [req.body.business_score, req.body.business_comms, req.body.feasibility_score, req.body.feasibility_comms, req.body.resources_score, req.body.resources_comms, req.body.commitment_score, req.body.commitment_comms, req.body.constraints_score, req.body.constraints_comms, req.body.overall_comms, req.body.proposal_id, req.body.reviewer_id],
                    (err, result) => {
                        if (err) { console.log(err) };
                        console.log('Successfully UPDATE - modified one record - Scores and Comments');
                    }
                );
            }
            callback(null);
        }
    ],
        // optional callback
        function (err, results) {
            // results is now equal to ['one', 'two']
        }
    );

}

exports.submitReviewData = function (req, res) {

    var sql1 = "SELECT count(*) FROM reviewdata WHERE proposal_id= ? AND reviewer_id= ? AND submitted = ?";
    var saveState;

    async.series([

        function (callback) {
            con.query(sql1, [req.body.proposal_id, req.body.reviewer_id, 'false'],
                (err, result) => {
                    console.log('submit__ Query for proposalID and reviewerID and submitState = ', result);
                    saveState = Object.values(result[0])[0];
                    console.log('submit__ after Query for saveState = ', saveState);
                    callback(err);
                }
            );
        },

        function (callback) {
            if (saveState === 1) {
                console.log('Before __ Submitting a record');
                con.query("UPDATE reviewdata SET business_score=?, business_comms=?, feasibility_score=?, feasibility_comms=?, resources_score=?, resources_comms=?, commitment_score=?, commitment_comms=?, constraints_score=?, constraints_comms=?, overall_comms=?, submitted=? WHERE proposal_id=? AND reviewer_id=?",
                    [req.body.business_score, req.body.business_comms, req.body.feasibility_score, req.body.feasibility_comms, req.body.resources_score, req.body.resources_comms, req.body.commitment_score, req.body.commitment_comms, req.body.constraints_score, req.body.constraints_comms, req.body.overall_comms, req.body.submitted, req.body.proposal_id, req.body.reviewer_id],
                    (err, result) => {
                        if (err) { console.log(err) };
                        console.log('Successfully Submitted Your Review and Scores __ You can NOT Change it any more');
                    }
                );
            }
            callback(null);
        }
    ],
        // optional callback
        function (err, results) {
            // results is now equal to ['one', 'two']
        }
    );

}
