import React from 'react';
import { Form, Table } from 'semantic-ui-react';
import './Modal.css';
import './Scoring_all.css';

class ReportToPrint extends React.Component {

    render() {
        return (
            <div className='reviewreportdisplayscroll'>
                <Form >
                    <Form.Group unstackable widths={5}>
                        <Form.Input label='proposal_ID' placeholder='proposal_ID' name='id'
                            value={this.props.reportProposal[0].id} />
                        <Form.Input label='Title' placeholder='Title' name='title'
                            value={this.props.reportProposal[0].title} />
                        <Form.Input label='Sponsor' placeholder='Sponsor' name='Sponsor'
                            value={this.props.reportProposal[0].VA_sponsor} />
                        <Form.Input label='Presenter' placeholder='Presenter' name='Presenter'
                            value={this.props.reportProposal[0].project_presenter} />
                        <Form.Input label='Proposal Created' placeholder='Created_Date' name='Created_Date'
                            value={this.props.reportProposal[0].created_at.split('T')[0]} />
                    </Form.Group>
                </Form>
                {!!this.props.reviewdata && this.props.reviewdata.map((item, i) =>
                    <Table key={i} >
                        <Table.Header >
                            <Table.Row >
                                <Table.HeaderCell className='tbl-head-width'>Aspects (Scores)</Table.HeaderCell>
                                <Table.HeaderCell>Comments _&_ Considerations ____ by tacking number =
                                            <button type='button' id='btn-btn-report'> {((+item.reviewer_id) * 1.732 / 1.414).toFixed(4)}</button>

                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body className="reportprint-tbl" >
                            <Table.Row>
                                <Table.Cell>
                                    1. Business Need ({item.business_score})
                                    </Table.Cell>
                                <Table.Cell>
                                    {item.business_comms}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    2. Feasibility ({item.feasibility_score})
                                        </Table.Cell>
                                <Table.Cell>
                                    {item.feasibility_comms}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    3. Resources ({item.resources_score})
                                         </Table.Cell>
                                <Table.Cell>
                                    {item.resources_comms}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    4. Commitment ({item.commitment_score})
                                         </Table.Cell>
                                <Table.Cell>
                                    {item.commitment_comms}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    5. Constraints ({item.constraints_score})
                                         </Table.Cell>
                                <Table.Cell>
                                    {item.constraints_comms}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    6. Overall Comments
                                        </Table.Cell>
                                <Table.Cell >
                                    {item.overall_comms}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                )}
            </div >
        )
    }
}

export default ReportToPrint