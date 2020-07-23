import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import './Modal.css';

class ModalUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.updateProposal[0].id,
            title: this.props.updateProposal[0].title,
            VA_sponsor: this.props.updateProposal[0].VA_sponsor,
            support: this.props.updateProposal[0].support,
            project_presenter: this.props.updateProposal[0].project_presenter,
            stage: this.props.updateProposal[0].stage,
            cycle: !!this.props.updateProposal[0].cycle === false ? 1 : this.props.updateProposal[0].cycle,
            status: this.props.updateProposal[0].status,
            created: this.props.updateProposal[0].created_at,
            //   reviewers: {}
        }
    }

    updatedToServer = () => {
        const updatedata = {
            id: this.state.id,
            title: this.state.title,
            VA_sponsor: this.state.VA_sponsor,
            support: this.state.support,
            project_presenter: this.state.project_presenter,
            stage: this.state.stage,
            cycle: this.state.cycle,
            status: this.state.status,
        };
        console.log('updated data for POST: ', updatedata);

        fetch(`${process.env.PUBLIC_URL}/api/proposals`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedata)
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('HTTP error - to proposal table, status = ' + response.status);
                }
                console.log(response);
            });
        alert('You have successfully updated the Proposal');
    }

    render() {
        const deletdTitle = this.state.title.includes('DELETED__');

        if (!deletdTitle) {
            return (
                < div >
                    <Modal id='modal_update' open={this.props.updateClickopen} >
                        <Modal.Header>
                            Update a Proposal: by C-DACS Adminstrators only
                        </Modal.Header>
                        <Form className='modal-container'>
                            <Form.Group unstackable widths={2}>
                                <Form.Input label='proposal_ID' placeholder='proposal_ID' value={this.state.id}
                                    name='id' onChange={(e) => this.setState({ id: e.target.value })}
                                />
                                <Form.Input label='Title' placeholder='Title' name='title'
                                    value={this.state.title}
                                    onChange={(e) => this.setState({ title: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group unstackable widths={2}>
                                <Form.Input label='Sponsor' placeholder='Sponsor' name='VA_sponsor'
                                    value={this.state.VA_sponsor === null ? 'sponsor' : this.state.VA_sponsor}
                                    onChange={(e) => this.setState({ VA_sponsor: e.target.value })}
                                />
                                <Form.Input label='Support' placeholder='Support' name='support'
                                    value={this.state.support === null ? 'support' : this.state.support}
                                    onChange={(e) => this.setState({ support: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group unstackable widths={2}>
                                <Form.Input label='Presenter' placeholder='Presenter' name='project_presenter'
                                    value={this.state.project_presenter === null ? 'presenter' : this.state.project_presenter}
                                    onChange={(e) => this.setState({ project_presenter: e.target.value })}
                                />
                                <Form.Input label='Created-Date-Time' placeholder='Created-time' name='Created-time'
                                    value={this.state.created}
                                />
                            </Form.Group><br />

                            <div className="dropdown-selections">

                                <div>
                                    <p id="selectstage-title"> Stage  </p>
                                    <select name="stage" className="ui dropdown" id="selectStage-update"
                                        value={this.state.stage === null ? 1 : this.state.stage}
                                        onChange={(e) => { this.setState({ stage: +e.target.value }) }}>
                                        >
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                    </select>
                                </div>


                                <div>
                                    <p id="selectcycle-title"> Cycle  </p>
                                    <select name="cycle" className="ui dropdown" id="selectCycle-update"
                                        value={this.state.cycle === null ? 1 : this.state.cycle}
                                        onChange={(e) => { this.setState({ cycle: +e.target.value }) }}>
                                        >
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                        <option value='6'>6</option>
                                        <option value='7'>7</option>
                                        <option value='8'>8</option>
                                        <option value='9'>9</option>
                                        <option value='10'>10</option>
                                        <option value='11'>11</option>
                                        <option value='12'>12</option>
                                    </select>
                                </div>

                                <div>
                                    <p id="selectstatus-title"> Status </p>
                                    <select name="status" className="ui dropdown" id="selectStatus-update"
                                        value={this.state.status === null ? 1 : this.state.status}
                                        onChange={(e) => { this.setState({ status: e.target.value }) }}>
                                        >
                                    <option value='tentative'>Tentative</option>
                                        <option value='approved'>Approved</option>
                                        <option value="declined">Declined</option>
                                    </select>
                                </div>

                            </div>

                            <hr />

                            <Button type='button' id='btn-submit'
                                className='ui button' onClick={this.updatedToServer}
                            >
                                Submit your Change
                            </Button>
                            <button type='button'
                                onClick={this.props.updateClickclose}
                                id='btn-close' className='ui button'>
                                Close this Window
                            </button>
                        </Form>
                    </Modal>
                </div >
            )
        }
        else {
            alert('Deleted proposal cannot be Updated any more.');
            window.location.reload(true);
        }
    }
}

export default ModalUpdate
