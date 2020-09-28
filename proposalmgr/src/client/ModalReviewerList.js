import React from 'react';
import { Button, Modal, Table } from 'semantic-ui-react';
import './Modal.css';
import './Scoring_all.css';

class ModalReviewerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.log('All reviewers List by Modal: ', this.props.reviewerlist);

    return (
      <div>
        <Modal
          className="modal-container"
          id="modal_score"
          size="fullscreen"
          open={this.props.listReviewerClickopen}
        >
          <Modal.Header>
            ___ List of All Reviewers @ C-DACS for MVP ___{' '}
            <Button
              type="button"
              className="ui button"
              id="btn-close-list-reviewers"
              onClick={this.props.listReviewerClickclose}
            >
              CLOSE _ this window
            </Button>
          </Modal.Header>

          <div className="reviewreportdisplayscroll">
            <Table>
              <Table.Body className="reportprint-tbl">
                <Table.Row>
                  <Table.Cell className="tbl-head-score-width">
                    Reviewer_ID
                  </Table.Cell>
                  <Table.Cell className="tbl-head-score-width">
                    Login_UserName
                  </Table.Cell>
                  <Table.Cell className="tbl-head-score-width">
                    First_Name
                  </Table.Cell>
                  <Table.Cell className="tbl-head-score-width">
                    Last_Name
                  </Table.Cell>
                  <Table.Cell className="tbl-head-score-width">
                    Email_Address
                  </Table.Cell>
                  <Table.Cell className="tbl-head-score-width">
                    User_Role
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            {!!this.props.reviewerlist &&
              this.props.reviewerlist.map((item, i) => {
                return (
                  <Table key={i}>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell className="tbl-head-score-width-num">
                          {item.id}
                        </Table.Cell>
                        <Table.Cell className="tbl-head-score-width-num">
                          {item.ldap_username}
                        </Table.Cell>
                        <Table.Cell className="tbl-head-score-width-num">
                          {item.first_name}
                        </Table.Cell>
                        <Table.Cell className="tbl-head-score-width-num">
                          {item.last_name}
                        </Table.Cell>
                        <Table.Cell className="tbl-head-score-width-num">
                          {item.email}
                        </Table.Cell>
                        <Table.Cell className="tbl-head-score-width-num">
                          {item.user_status}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                );
              })}
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalReviewerList;
