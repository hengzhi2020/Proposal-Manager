import React from 'react';
import { Form, Table } from 'semantic-ui-react';
import './Modal.css';
import './Scoring_all.css';

class ReportScoreToPrint extends React.Component {
  render() {
    let scoreCount = 0;
    let scoreBusiness = 0;
    let scoreFeasibility = 0;
    let scoreResources = 0;
    let scoreCommitment = 0;
    let scoreConstraints = 0;

    return (
      <div className="reviewreportdisplayscroll">
        <Form>
          <Form.Group unstackable widths={5}>
            <Form.Input
              label="proposal_ID"
              placeholder="proposal_ID"
              name="id"
              value={this.props.reportProposal[0].id}
            />
            <Form.Input
              label="Title"
              placeholder="Title"
              name="title"
              value={this.props.reportProposal[0].title}
            />
            <Form.Input
              label="Sponsor"
              placeholder="Sponsor"
              name="Sponsor"
              value={this.props.reportProposal[0].VA_sponsor}
            />
            <Form.Input
              label="Presenter"
              placeholder="Presenter"
              name="Presenter"
              value={this.props.reportProposal[0].project_presenter}
            />
            <Form.Input
              label="Proposal Created"
              placeholder="Created_Date"
              name="Created_Date"
              value={this.props.reportProposal[0].created_at.split('T')[0]}
            />
          </Form.Group>
        </Form>
        <Table>
          <Table.Body className="reportprint-tbl">
            <Table.Row>
              <Table.Cell className="tbl-head-score-width">
                Tracking Number
              </Table.Cell>
              <Table.Cell className="tbl-head-score-width">
                Business Need
              </Table.Cell>
              <Table.Cell className="tbl-head-score-width">
                Feasibility
              </Table.Cell>
              <Table.Cell className="tbl-head-score-width">
                Resources
              </Table.Cell>
              <Table.Cell className="tbl-head-score-width">
                Commitment
              </Table.Cell>
              <Table.Cell className="tbl-head-score-width">
                Constraints
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        {!!this.props.reviewdata &&
          this.props.reviewdata.map((item, i) => {
            if (
              (!!item.business_score || item.business_score === 0) &&
              (!!item.feasibility_score || item.feasibility_score === 0) &&
              (!!item.resources_score || item.resources_score === 0) &&
              (!!item.commitment_score || item.commitment_score === 0) &&
              (!!item.constraints_score || item.constraints_score === 0)
            ) {
              scoreCount = scoreCount + 1;
              scoreBusiness = scoreBusiness + item.business_score;
              scoreFeasibility = scoreFeasibility + item.feasibility_score;
              scoreResources = scoreResources + item.resources_score;
              scoreCommitment = scoreCommitment + item.commitment_score;
              scoreConstraints = scoreConstraints + item.constraints_score;
              // console.log('scoreBusiness is', scoreBusiness);
              return (
                <Table key={i}>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell className="tbl-head-score-width-num">
                        {((+item.reviewer_id * 1.732) / 1.414).toFixed(4)}
                      </Table.Cell>
                      <Table.Cell className="tbl-head-score-width-num">
                        {item.business_score}
                      </Table.Cell>
                      <Table.Cell className="tbl-head-score-width-num">
                        {item.feasibility_score}
                      </Table.Cell>
                      <Table.Cell className="tbl-head-score-width-num">
                        {item.resources_score}
                      </Table.Cell>
                      <Table.Cell className="tbl-head-score-width-num">
                        {item.commitment_score}
                      </Table.Cell>
                      <Table.Cell className="tbl-head-score-width-num">
                        {item.constraints_score}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              );
            }
            return '';
          })}
        <Table>
          <Table.Body className="reportprint-tbl">
            <Table.Row>
              <Table.Cell className="tbl-head-score-width">
                Averge Scores -->
              </Table.Cell>
              <Table.Cell className="tbl-head-score-width">
                {(scoreBusiness / scoreCount).toFixed(2)}
              </Table.Cell>
              <Table.Cell className="tbl-head-score-width">
                {(scoreFeasibility / scoreCount).toFixed(2)}
              </Table.Cell>
              <Table.Cell className="tbl-head-score-width">
                {(scoreResources / scoreCount).toFixed(2)}
              </Table.Cell>
              <Table.Cell className="tbl-head-score-width">
                {(scoreCommitment / scoreCount).toFixed(2)}
              </Table.Cell>
              <Table.Cell className="tbl-head-score-width">
                {(scoreConstraints / scoreCount).toFixed(2)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default ReportScoreToPrint;
