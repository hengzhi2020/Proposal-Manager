import React from 'react';
import { Button, Form, Modal, Tab, Menu } from 'semantic-ui-react';
import './Modal.css';
import './Scoring_all.css';
import ScoringPositive from './Scoring_pos';
import ScoringNegative from './Scoring_neg';
import CommAdd1 from './CommAdd1';
import CommAdd2 from './CommAdd2';
import CommAdd3 from './CommAdd3';
import CommAdd4 from './CommAdd4';
import CommAdd5 from './CommAdd5';
import CommAdd6 from './CommAdd6';
import CommAdd7 from './CommSummary7';

class ModalScore extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score1: null,
            comm1: '',
            score2: null,
            comm2: '',
            score3: null,
            comm3: '',
            score4: null,
            comm4: '',
            score5: null,
            comm5: '',
            comm6: '',
        };
    }

    componentDidMount() {
        this.updateDATAbyReviewerData();
    }

    getScore1 = (score1) => {
        this.props.DATA.BusinessNeed.score = score1;

    }
    getComm1 = (comm1) => {
        if (comm1 !== '') {
            this.props.DATA.BusinessNeed.comments = comm1;
        }
    }
    getScore2 = (score2) => {
        this.props.DATA.Feasibility.score = score2;
    }
    getComm2 = (comm2) => {
        if (comm2 !== '') {
            this.props.DATA.Feasibility.comments = comm2;
        }
    }
    getScore3 = (score3) => {
        this.props.DATA.Resources.score = score3;
    }
    getComm3 = (comm3) => {
        if (comm3 !== '') {
            this.props.DATA.Resources.comments = comm3;
        }
    }
    getScore4 = (score4) => {
        this.props.DATA.Commitment.score = score4;
    }
    getComm4 = (comm4) => {
        if (comm4 !== '') {
            this.props.DATA.Commitment.comments = comm4;
        }
    }
    getScore5 = (score5) => {
        this.props.DATA.Constraints.score = score5;
    }
    getComm5 = (comm5) => {
        if (comm5 !== '') {
            this.props.DATA.Constraints.comments = comm5;
        }
    }
    getComm6 = (comm6) => {
        if (comm6 !== '') {
            this.props.DATA.OverAllComments.typein = comm6;
        }
    }

    getScore6 = () => {
        this.setState({
            score1: this.props.DATA.BusinessNeed.score,
            score2: this.props.DATA.Feasibility.score,
            score3: this.props.DATA.Resources.score,
            score4: this.props.DATA.Commitment.score,
            score5: this.props.DATA.Constraints.score,
        })
    }

    getReviewUpdated7 = (e) => {
        this.setState({
            score1: this.props.DATA.BusinessNeed.score,
            comm1: this.props.DATA.BusinessNeed.comments,
            score2: this.props.DATA.Feasibility.score,
            comm2: this.props.DATA.Feasibility.comments,
            score3: this.props.DATA.Resources.score,
            comm3: this.props.DATA.Resources.comments,
            score4: this.props.DATA.Commitment.score,
            comm4: this.props.DATA.Commitment.comments,
            score5: this.props.DATA.Constraints.score,
            comm5: this.props.DATA.Constraints.comments,
            comm6: this.props.DATA.OverAllComments.typein,
        });
    }

    saveReviewToServer = () => {

        const reviewdata = {
            proposal_id: this.props.scoreProposal[0].id,
            reviewer_id: this.props.DATA.Reviewer.id,
            business_score: this.props.DATA.BusinessNeed.score,
            business_comms: this.props.DATA.BusinessNeed.comments,
            feasibility_score: this.props.DATA.Feasibility.score,
            feasibility_comms: this.props.DATA.Feasibility.comments,
            resources_score: this.props.DATA.Resources.score,
            resources_comms: this.props.DATA.Resources.comments,
            commitment_score: this.props.DATA.Commitment.score,
            commitment_comms: this.props.DATA.Commitment.comments,
            constraints_score: this.props.DATA.Constraints.score,
            constraints_comms: this.props.DATA.Constraints.comments,
            overall_comms: this.props.DATA.OverAllComments.typein,
            action: 'savereview',
        };

        fetch(`${process.env.PUBLIC_URL}/api/reviewdata`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewdata)
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('save__ HTTP error, status = ' + response.status);
                }
                console.log(response);
            });
        alert('You have successfully saved "LIVE Summary" update');
    }

    submitReviewToServer = () => {

        const reviewdata = {
            proposal_id: this.props.scoreProposal[0].id,
            reviewer_id: this.props.DATA.Reviewer.id,
            business_score: this.props.DATA.BusinessNeed.score,
            business_comms: this.props.DATA.BusinessNeed.comments,
            feasibility_score: this.props.DATA.Feasibility.score,
            feasibility_comms: this.props.DATA.Feasibility.comments,
            resources_score: this.props.DATA.Resources.score,
            resources_comms: this.props.DATA.Resources.comments,
            commitment_score: this.props.DATA.Commitment.score,
            commitment_comms: this.props.DATA.Commitment.comments,
            constraints_score: this.props.DATA.Constraints.score,
            constraints_comms: this.props.DATA.Constraints.comments,
            overall_comms: this.props.DATA.OverAllComments.typein,
            submitted: 'true',
            action: 'submitreview'
        };

        console.log('submit__ reviewdata -to- server ==> ', reviewdata);

        fetch(`${process.env.PUBLIC_URL}/api/reviewdata`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewdata)
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('submit__ HTTP error, status = ' + response.status);
                }
                console.log(response);
            });
        alert('Reminder: You cannot change the Scores & Comments after SUBMIT !');
    }

    render() {

        let panes;
        if (this.state.comm1 &&
            this.state.comm2 &&
            this.state.comm3 &&
            this.state.comm4 &&
            this.state.comm5 &&
            this.state.comm6) {

            panes = [
                {
                    menuItem: (<Menu.Item key='final-report'  ><p className='menuitems' id='menuitem7' >- LIVE Summary -</p></Menu.Item>),
                    pane: {
                        key: 'tab7',
                        content: (
                            <div>
                                <CommAdd7
                                    proposalID={this.props.scoreProposal[0].id}
                                    proposalName={this.props.scoreProposal[0].title}
                                    proposalSponsor={this.props.scoreProposal[0].VA_sponsor}
                                    proposalSupport={this.props.scoreProposal[0].support}
                                    proposalPresenter={this.props.scoreProposal[0].project_presenter}
                                    proposalCreated={this.props.scoreProposal[0].created_at}
                                    proposalUpdated={this.props.scoreProposal[0].updated_at}

                                    reviewerName={this.props.DATA.Reviewer.name}
                                    reviewingDate={this.props.DATA.Reviewer.date}

                                    businessScore={this.state.score1}
                                    businessComm={this.state.comm1}
                                    feasibilityScore={this.state.score2}
                                    feasibilityComm={this.state.comm2}
                                    resourcesScore={this.state.score3}
                                    resourcesComm={this.state.comm3}
                                    commitmentScore={this.state.score4}
                                    commitmentComm={this.state.comm4}
                                    constraintsScore={this.state.score5}
                                    constraintsComm={this.state.comm5}
                                    overAllComm={this.state.comm6}
                                    getReviewUpdated7={this.getReviewUpdated7}
                                />
                            </div>
                        ),
                    },
                },
                {
                    menuItem: (<Menu.Item key='message-1' ><p className='menuitems' >1. Business Need </p></Menu.Item>),
                    pane: {
                        key: 'tab1',
                        content: (
                            <div>
                                <ScoringPositive
                                    tabName='Business-Need --> '
                                    getScore1={this.getScore1}
                                />
                                <CommAdd1
                                    getComm1={this.getComm1}
                                    comm1={this.state.comm1}
                                />
                            </div>
                        ),
                    },
                },
                {
                    menuItem: (<Menu.Item key='message-2'><p className='menuitems'>2. Feasibility & Goals</p></Menu.Item>),
                    pane: {
                        key: 'tab2',
                        content: (
                            <div>
                                <ScoringPositive
                                    tabName='Feasibility-and-SMART-Goals --> '
                                    getScore2={this.getScore2}
                                />
                                <CommAdd2
                                    getComm2={this.getComm2}
                                    comm2={this.state.comm2}
                                />
                            </div>
                        ),
                    },
                },
                {
                    menuItem: (<Menu.Item key='message-3'><p className='menuitems'>3. Resources</p></Menu.Item>),
                    pane: {
                        key: 'tab3',
                        content: (
                            <div>
                                <ScoringPositive
                                    tabName='Resources --> '
                                    getScore3={this.getScore3}
                                />
                                <CommAdd3
                                    getComm3={this.getComm3}
                                    comm3={this.state.comm3}
                                />
                            </div>
                        ),
                    },
                },
                {
                    menuItem: (<Menu.Item key='message-4'><p className='menuitems'>4. Commitment</p></Menu.Item>),
                    pane: {
                        key: 'tab4',
                        content: (
                            <div>
                                <ScoringPositive
                                    tabName='Commitment --> '
                                    getScore4={this.getScore4}
                                />
                                <CommAdd4
                                    getComm4={this.getComm4}
                                    comm4={this.state.comm4}
                                />
                            </div>
                        ),
                    },
                },
                {
                    menuItem: (<Menu.Item key='message-5'><p id='menuitem5'>5. Constrains</p></Menu.Item>),
                    pane: {
                        key: 'tab5',
                        content: (
                            <div>
                                <ScoringNegative
                                    tabName='Constrains --> '
                                    getScore5={this.getScore5}
                                />
                                <CommAdd5
                                    getComm5={this.getComm5}
                                    comm5={this.state.comm5}
                                />
                            </div>
                        ),
                    },
                },
                {
                    menuItem: (<Menu.Item key='message-6' onClick={this.getScore6}><p className='menuitems'>6. Overall Comments</p></Menu.Item>),
                    pane: {
                        key: 'tab6',
                        content: (
                            <div>
                                <CommAdd6

                                    getComm6={this.getComm6}
                                    comm6={this.state.comm6}

                                    proposalID={this.props.scoreProposal[0].id}
                                    proposalName={this.props.scoreProposal[0].title}
                                    proposalSponsor={this.props.scoreProposal[0].VA_sponsor}
                                    proposalSupport={this.props.scoreProposal[0].support}
                                    proposalPresenter={this.props.scoreProposal[0].project_presenter}
                                    proposalCreated={this.props.scoreProposal[0].created_at}
                                    proposalUpdated={this.props.scoreProposal[0].updated_at}

                                    businessScore={this.state.score1}
                                    feasibilityScore={this.state.score2}
                                    resourcesScore={this.state.score3}
                                    commitmentScore={this.state.score4}
                                    constraintsScore={this.state.score5}
                                    reviewerName={this.props.DATA.Reviewer.name}
                                    reviewingDate={this.props.DATA.Reviewer.date}
                                />
                            </div>
                        ),
                    },
                },
            ]
        }

        return (
            <div>
                <Modal className='modal-container' id='modal_score' size='fullscreen' open={this.props.scoreClickopen} >
                    <Modal.Header>
                        Reviewers: __ Please Give Scores and Add Comments to this Proposal __
                    </Modal.Header>
                    <Form className='modal_ID_Title'>
                        <Form.Group unstackable widths={2}>
                            <Form.Input label='proposal_ID' placeholder='proposal_ID' value={this.props.scoreProposal[0].id}
                            />
                            <Form.Input label='Title' placeholder='Title' name='title' value={this.props.scoreProposal[0].title}
                            />
                        </Form.Group>
                    </Form>
                    <div>
                        <div className='scoring-comments' onClick={this.getReviewUpdated7}>
                            <Tab className='tabs_all' panes={panes} renderActiveOnly={false} />
                        </div>
                    </div>

                    <div className='score_comm_btns'>
                        <Button type='button' id='btn-save-scoring'
                            className='ui button' onClick={this.saveReviewToServer}
                        >
                            SAVE _ Scores and Comments
                        </Button>
                        <Button type='button' id='btn-submit-scoring'
                            className='ui button' onClick={this.submitReviewToServer}
                        >
                            SUBMIT _ the Final Report
                        </Button>
                        <button type='button' id='btn-close-scoring'
                            className='ui button' onClick={this.props.scoreClickclose}
                        >
                            CLOSE _ this Window
                        </button>
                    </div>
                </Modal>
            </div>
        )
    }

    updateDATAbyReviewerData = () => {

        let Selectedreviewdata = this.props.reviewdata.filter((item) => (
            + item.reviewer_id === +this.props.DATA.Reviewer.id
        ));

        if (Selectedreviewdata.length === 0) {
            alert('You have not been authorized to review this proposal--!');
            window.location.reload(true);
        } else {

            this.props.DATA.BusinessNeed.score = Selectedreviewdata[0].business_score;
            this.props.DATA.BusinessNeed.comments = Selectedreviewdata[0].business_comms;
            this.props.DATA.Feasibility.score = Selectedreviewdata[0].feasibility_score;
            this.props.DATA.Feasibility.comments = Selectedreviewdata[0].feasibility_comms;
            this.props.DATA.Resources.score = Selectedreviewdata[0].resources_score;
            this.props.DATA.Resources.comments = Selectedreviewdata[0].resources_comms;
            this.props.DATA.Commitment.score = Selectedreviewdata[0].commitment_score;
            this.props.DATA.Commitment.comments = Selectedreviewdata[0].commitment_comms;
            this.props.DATA.Constraints.score = Selectedreviewdata[0].constraints_score;
            this.props.DATA.Constraints.comments = Selectedreviewdata[0].constraints_comms;
            this.props.DATA.OverAllComments.typein = Selectedreviewdata[0].overall_comms;

            this.setState({
                score1: this.props.DATA.BusinessNeed.score,
                comm1: this.props.DATA.BusinessNeed.comments,
                score2: this.props.DATA.Feasibility.score,
                comm2: this.props.DATA.Feasibility.comments,
                score3: this.props.DATA.Resources.score,
                comm3: this.props.DATA.Resources.comments,
                score4: this.props.DATA.Commitment.score,
                comm4: this.props.DATA.Commitment.comments,
                score5: this.props.DATA.Constraints.score,
                comm5: this.props.DATA.Constraints.comments,
                comm6: this.props.DATA.OverAllComments.typein,
            });
        }
    }
}

export default ModalScore

