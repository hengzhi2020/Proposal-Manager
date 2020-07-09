
import React from 'react';
import './Listtable.css';
import './ModalUpdate';
import { Button, Popup, Header, Table, Menu, Pagination } from 'semantic-ui-react';

export default function Listtable(props) {

    let proposalList;
    if (!!props.proposals) {
        proposalList = props.proposals.map((item, i) => {
            if (item.title.includes('DELETED_')) {
                return (
                    <Table.Row key={i}>
                        <Table.Cell singleLine>
                            <strong className='deleted-title-show'>{item.title} </strong>
                            <Popup
                                content={
                                    <Table basic='very' celled collapsing>
                                        <Table.Body >
                                            <Table.Row>
                                                <Table.Cell >
                                                    <Header as='h4'>
                                                        <Header.Content>
                                                            Proposal_ID
                                                </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{item.id}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        <Header.Content>
                                                            Sponsor
                                                </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{item.VA_sponsor}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        <Header.Content>
                                                            Support
                                                </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{item.support}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        <Header.Content>
                                                            Presenter
                                                </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{item.project_presenter}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        <Header.Content>
                                                            CreateTime
                                                </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{item.created_at}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        <Header.Content>
                                                            UpdateTime
                                                </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{item.updated_at}</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                }
                                trigger={<Button className='mini compact button' icon='add' />}
                            />
                        </Table.Cell>
                        <Table.Cell> {item.created_at.split('T')[0]} </Table.Cell>
                        <Table.Cell> {item.stage} </Table.Cell>
                        <Table.Cell> {item.cycle} </Table.Cell>
                        <Table.Cell> {item.status} </Table.Cell>
                        <Table.Cell textAlign='center'> {
                            <button
                                key={i} type='button'
                                className='btn-update-hover-deleted'
                                value={item.id}
                                onClick={props.updateHandler}
                            >
                                Update
                            </button>
                        }
                        </Table.Cell>
                        <Table.Cell textAlign='center'> {
                            < button
                                key={i} type='button'
                                className='btn-delete-hover-deleted'
                                value={item.id}
                                onClick={props.deleteHandler}
                            >
                                Delete
                             </button>
                        }
                        </Table.Cell>
                        <Table.Cell textAlign='center'> {
                            <button
                                key={i} type='button'
                                className='btn-scoring-hover-deleted'
                                value={item.id}
                                onClick={props.scoreHandler}
                            >
                                Scoring
                            </button>
                        }
                        </Table.Cell>
                        <Table.Cell textAlign='center'> {
                            <button
                                key={i} type='button'
                                className='btn-report-hover'
                                value={item.id}
                                onClick={props.reportHandler}
                            >
                                Report
                    </button>
                        }
                        </Table.Cell>
                    </Table.Row >
                )
            } else {
                return (
                    <Table.Row key={i}>
                        <Table.Cell singleLine >
                            <strong>{item.title} </strong>
                            <Popup
                                content={
                                    <Table basic='very' celled collapsing>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        <Header.Content>
                                                            Proposal_ID
                                                </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{item.id}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        <Header.Content>
                                                            Sponsor
                                                </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{item.VA_sponsor}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        <Header.Content>
                                                            Support
                                                </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{item.support}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        <Header.Content>
                                                            Presenter
                                                </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{item.project_presenter}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        <Header.Content>
                                                            CreateTime
                                                </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{item.created_at}</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>
                                                    <Header as='h4'>
                                                        <Header.Content>
                                                            UpdateTime
                                                </Header.Content>
                                                    </Header>
                                                </Table.Cell>
                                                <Table.Cell>{item.updated_at}</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                }
                                trigger={<Button className='mini compact button' icon='add' />}
                            />
                        </Table.Cell>
                        <Table.Cell> {item.created_at.split('T')[0]} </Table.Cell>
                        <Table.Cell> {item.stage} </Table.Cell>
                        <Table.Cell> {item.cycle} </Table.Cell>
                        <Table.Cell> {item.status} </Table.Cell>
                        <Table.Cell textAlign='center'> {
                            <button
                                key={i} type='button'
                                className='btn-update-hover'
                                value={item.id}
                                onClick={props.updateHandler}
                            >
                                Update
                    </button>
                        }
                        </Table.Cell>
                        <Table.Cell textAlign='center'> {
                            <button
                                key={i} type='button'
                                className='btn-delete-hover'
                                value={item.id}
                                onClick={props.deleteHandler}
                            >
                                Delete
                    </button>
                        }
                        </Table.Cell>
                        <Table.Cell textAlign='center'> {
                            <button
                                key={i} type='button'
                                className='btn-scoring-hover'
                                value={item.id}
                                onClick={props.scoreHandler}
                            >
                                Scoring
                    </button>
                        }
                        </Table.Cell>
                        <Table.Cell textAlign='center'> {
                            <button
                                key={i} type='button'
                                className='btn-report-hover'
                                value={item.id}
                                onClick={props.reportHandler}
                            >
                                Report
                    </button>
                        }
                        </Table.Cell>
                    </Table.Row >
                )
            }
        })
    }

    return (
        <main className='table-container' >
            <Table celled padded >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width='7' >Title</Table.HeaderCell>
                        <Table.HeaderCell width='2' >Created</Table.HeaderCell>
                        <Table.HeaderCell width='1' >Stage</Table.HeaderCell>
                        <Table.HeaderCell width='1' >Cycle</Table.HeaderCell>
                        <Table.HeaderCell width='1' >Status</Table.HeaderCell>
                        <Table.HeaderCell width='1' textAlign='center'>Update</Table.HeaderCell>
                        <Table.HeaderCell width='1' textAlign='center'>Delete</Table.HeaderCell>
                        <Table.HeaderCell width='1' textAlign='center'>Review</Table.HeaderCell>
                        <Table.HeaderCell width='1' textAlign='center'>Report</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {proposalList}
                </Table.Body>

                <Table.Footer >
                    <Table.Row >
                        <Table.HeaderCell colSpan='9' >
                            <Menu floated='right' >
                                <Pagination onPageChange={props.pageSelector}
                                    defaultActivePage={0}
                                    totalPages={props.DATA.ProposalsDisplay.totalPages}
                                    ellipsisItem={null}
                                    // firstItem={null}
                                    // lastItem={null}
                                    siblingRange={9}
                                />
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </main>
    )
}
