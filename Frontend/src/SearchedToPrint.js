import React from 'react';
import { Table } from 'semantic-ui-react';
import './Modal.css';
import './Scoring_all.css';

class SearchToPrint extends React.Component {

    render() {
        // console.log("searched Proposals: ", this.props.searched_pls);

        return (
            <main className='searcheddisplay' >
                <Table celled padded >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width='1' >ID</Table.HeaderCell>
                            <Table.HeaderCell width='5' >Title</Table.HeaderCell>
                            <Table.HeaderCell width='2' >Created</Table.HeaderCell>
                            <Table.HeaderCell width='1' >Stage</Table.HeaderCell>
                            <Table.HeaderCell width='1' >Status</Table.HeaderCell>
                            <Table.HeaderCell width='2' >Presenter</Table.HeaderCell>
                            <Table.HeaderCell width='2' >Sponsor</Table.HeaderCell>
                            <Table.HeaderCell width='2' >Support</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body >
                        {this.props.searched_pls.map((item, i) => {
                            return (
                                <Table.Row key={i}>
                                    <Table.Cell> {item.id} </Table.Cell>
                                    <Table.Cell singleLine > <strong>{item.title} </strong> </Table.Cell>
                                    <Table.Cell> {item.created_at.split('T')[0]} </Table.Cell>
                                    <Table.Cell> {item.stage} </Table.Cell>
                                    <Table.Cell> {item.status} </Table.Cell>
                                    <Table.Cell> {item.project_presenter} </Table.Cell>
                                    <Table.Cell> {item.VA_sponsor} </Table.Cell>
                                    <Table.Cell> {item.support} </Table.Cell>
                                </Table.Row >
                            )
                        })}
                    </Table.Body>
                </Table>
            </main>
        )
    }
}

export default SearchToPrint