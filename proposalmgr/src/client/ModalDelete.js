import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import './Modal.css';
import fetchApi from './fetchApi.js';

class ModalDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.deleteProposal[0].id,
            title: this.props.deleteProposal[0].title,
            VA_sponsor: this.props.deleteProposal[0].VA_sponsor,
            support: this.props.deleteProposal[0].support,
            project_presenter: this.props.deleteProposal[0].project_presenter,
            stage: this.props.deleteProposal[0].stage,
            status: this.props.deleteProposal[0].status
        }
    }

    /* IT IS NOT A GOOD IDEA to completely remove a record form Database:

        deletedToServer = () => {
            const deletedata = {
                id: this.state.id,
            };
            console.log('deleted data for POST: ', deletedata);
    
            fetchApi(`/api/proposals`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(deletedata)
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('HTTP error, status = ' + response.status);
                    }
                    console.log(response);
                })
        }
    */

    deletedToServer = () => {
        const deletedata = {
            id: this.state.id,
            title: 'DELETED__ ' + this.state.title,
        };

        fetchApi(`/api/proposals`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deletedata)
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('HTTP error, status = ' + response.status);
                }
                console.log(response);
            });
        alert('You have successfully deleted the Proposal');
    }

    render() {
        const deletdTitle = this.state.title.includes('DELETED__');
        if (!deletdTitle) {
            return (
                <div>
                    <Modal id='modal_delete' open={this.props.deleteClickopen} >
                        <Modal.Header>
                            Delete a Proposal: by C-DACS staff only
                    </Modal.Header>
                        <Form className='modal-container'>
                            <Form.Group unstackable widths={2}>
                                <Form.Input label='proposal_ID' placeholder='proposal_ID' value={this.state.id}
                                    name='id' onChange={(e) => this.setState({ id: e.target.value })}
                                />
                                <Form.Input label='Title' placeholder='Title' name='title'
                                    value={this.state.title}
                                />
                            </Form.Group>

                            <Form.Group unstackable widths={2}>
                                <Form.Input label='Stage' placeholder='Stage' name='Stage'
                                    value={this.state.stage}
                                />
                                <Form.Input label='Status' placeholder='Status' name='Status'
                                    value={this.state.status}
                                />
                            </Form.Group>

                            <Form.Group unstackable widths={2}>
                                <Form.Input label='Sponsor' placeholder='Sponsor' name='VA_sponsor'
                                    value={this.state.VA_sponsor}
                                />
                                <Form.Input label='Support' placeholder='Support' name='support'
                                    value={this.state.support}
                                />
                            </Form.Group>

                            <Form.Group unstackable widths={2}>
                                <Form.Input label='Presenter' placeholder='Presenter' name='project_presenter'
                                    value={this.state.project_presenter}
                                />
                            </Form.Group><br />
                            <hr />
                            <Button type='button' id='btn-submit'
                                className='ui button' onClick={this.deletedToServer}
                            >
                                DELETE Proposal
                        </Button>
                            <button type='button'
                                onClick={this.props.deleteClickclose}
                                id='btn-close' className='ui button'>
                                Close this Window
                        </button>
                        </Form>
                    </Modal>
                </div>
            )
        } else {
            // event.stopPropagation();
            alert('Deleted proposal cannot be Deleted again.');
            window.location.reload(true);
        }
    }
}

export default ModalDelete
