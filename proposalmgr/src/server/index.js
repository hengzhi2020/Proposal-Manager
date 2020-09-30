const express = require('express');
const async = require('async');
const morgan = require('morgan');
const cors = require('cors');
const proposalList = require('./db_connection').proposalList;
const totalProposalsCount = require('./db_connection').totalProposalsCount;
const updateProposal = require('./db_connection').updateProposal;
const createProposal = require('./db_connection').createProposal;
const deleteProposal = require('./db_connection').deleteProposal;
const saveReviewData = require('./db_connection').saveReviewData;
const submitReviewData = require('./db_connection').submitReviewData;
const getReviewReports = require('./db_connection').getReviewReports;
const getReviewerInfo = require('./db_connection').getReviewerInfo;
const getReviewerList = require('./db_connection').getReviewerList;
const getSearchList = require('./db_connection').getSearchList;
// const loginValidation = require('./db_connection').loginValidation;
// const authenResults = require('./db_connection').authenResults;

const bodyParser = require('body-parser');
const app = express();

app.use(express.static('dist'));
app.use(morgan('common'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* This is the old one with Login Interface for TEST purpose */
/* 
app.route('/loginData')
    .post((req, res) => {
        loginValidation(req, res);
    })
    .get((req, res) => {
        authenResults(req, res);
        })
 */

app.get('/api/reviewers', (req, res) => {
  getReviewerInfo(req, res);
});

app.get('/api/reviewerlist', (req, res) => {
  getReviewerList(req, res);
});

app.get('/api/proposals/num', (req, res) => {
  totalProposalsCount(req, res);
});

app
  .route('/api/proposals')
  .get((req, res) => {
    proposalList(req, res);
  })
  .post((req, res) => {
    createProposal(req, res);
  })
  .put((req, res) => {
    updateProposal(req, res);
  })
  .patch((req, res) => {
    deleteProposal(req, res);
  });

app
  .route('/api/reviewdata')
  .get((req, res) => {
    getReviewReports(req, res);
  })
  .patch((req, res) => {
    saveReviewData(req, res);
  })
  .put((req, res) => {
    submitReviewData(req, res);
  });

app.get('/api/proposals/search', (req, res) => {
  getSearchList(req, res);
});

app.get('/api/', (req, res) => {
  console.log(req.url);
  res.send('Node Express Server: Connected');
});

app.listen(8000, () => {
  console.log('Node Express Server: started on PORT 8000');
});
