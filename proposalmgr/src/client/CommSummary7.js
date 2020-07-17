import React from 'react';
import './Scoring_all.css';
import { Table } from 'semantic-ui-react'

class Summary_Review extends React.Component {

    render() {
        const createddate = !!this.props.proposalCreated && this.props.proposalCreated.split('T')[0];
        const updateddate = !!this.props.proposalUpdated && this.props.proposalUpdated.split('T')[0];
        return (
            <div>
                <div className='Report_left' >
                    <Table definition >
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
                    <Table definition >
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Login Username</Table.Cell>
                                <Table.Cell>{this.props.reviewerName}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Reviewing Date</Table.Cell>
                                <Table.Cell>{this.props.reviewingDate}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div className='Report_right' >
                    <Table celled fixed singleLine id="live-data-comm">
                        <Table.Header>
                            <Table.Row >
                                <Table.HeaderCell>Aspects (Scores)</Table.HeaderCell>
                                <Table.HeaderCell>Comments & Considerations</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row >
                                <Table.Cell >
                                    1. Business Need ({this.props.businessScore})
                                </Table.Cell>
                                <Table.Cell >
                                    {this.props.businessComm}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    2. Feasibility /Goals ({this.props.feasibilityScore})
                        </Table.Cell>
                                <Table.Cell>
                                    {this.props.feasibilityComm}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    3. Resources ({this.props.resourcesScore})
                        </Table.Cell>
                                <Table.Cell>
                                    {this.props.resourcesComm}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    4. Commitment ({this.props.commitmentScore})
                        </Table.Cell>
                                <Table.Cell>
                                    {this.props.commitmentComm}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    5. Constraints ({this.props.constraintsScore})
                        </Table.Cell>
                                <Table.Cell>
                                    {this.props.constraintsComm}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    6. Overall Comments
                        </Table.Cell>
                                <Table.Cell >
                                    {this.props.overAllComm}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        )
    }
}

export default Summary_Review

