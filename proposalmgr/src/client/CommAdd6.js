import React from 'react';
import './Scoring_all.css';
import { Table, Form } from 'semantic-ui-react';

class CommAdd6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  componentDidMount() {
    this.setState({ value: this.props.comm6 });
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    this.props.getComm6(this.state.value);
    const createddate =
      !!this.props.proposalCreated && this.props.proposalCreated.split('T')[0];
    const updateddate =
      !!this.props.proposalUpdated && this.props.proposalUpdated.split('T')[0];

    let scoreflag = true;
    if (
      +this.props.businessScore < +3 ||
      +this.props.feasibilityScore < +3 ||
      +this.props.resourcesScore < +3 ||
      +this.props.commitmentScore < +3 ||
      Math.abs(+this.props.constraintsScore) > +3
    ) {
      scoreflag = false;
    }

    return (
      <div>
        <div className="Comm_6_left">
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Sponsor</Table.Cell>
                <Table.Cell>{this.props.proposalSponsor}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Support</Table.Cell>
                <Table.Cell>{this.props.proposalSupport}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Presenter</Table.Cell>
                <Table.Cell>{this.props.proposalPresenter}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Created Date</Table.Cell>
                <Table.Cell>{createddate}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Updated Date</Table.Cell>
                <Table.Cell>{updateddate}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Reviewer Name</Table.Cell>
                <Table.Cell>{this.props.reviewerName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Reviewed Date</Table.Cell>
                <Table.Cell>{this.props.reviewingDate}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>

        <div className="Comm_6_middle">
          <Table collapsing color="orange" inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Aspects (Scores)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  1. Business Need ({this.props.businessScore})
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  2. Feasibility/Goals ({this.props.feasibilityScore})
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  3. Resources ({this.props.resourcesScore})
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  4. Commitment ({this.props.commitmentScore})
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  5. Constraints ({this.props.constraintsScore})
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row id="overallscore">
                <Table.Cell>
                  Scores: {scoreflag ? 'PASSED' : 'NOT PASSED'}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>

        <div className="Comm_6_right">
          <Form success onSubmit={this.handleSubmit}>
            <h3 id="textlabel">
              {' '}
              As for the scores listed on the left, please type in your "Overall
              Comments". SAVE it for further editing, or SUBMIT it. __ Thanks
              for your reviewing! __
            </h3>
            <textarea
              id="Comm_textarea6"
              placeholder="Write Overall Comments"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default CommAdd6;
