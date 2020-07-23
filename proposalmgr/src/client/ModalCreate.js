import React from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import './Modal.css';

class ModalCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            VA_sponsor: '',
            support: '',
            project_presenter: '',
            stage: 1,
            cycle: 1,
            status: 'Tentative',
            reviewerIdStart: '',
            maxProposalId: this.props.maxProposalId,
        }
    }

    createdToServer = () => {
        const createdata = {
            title: this.state.title,
            VA_sponsor: this.state.VA_sponsor,
            support: this.state.support,
            project_presenter: this.state.project_presenter,
            stage: this.state.stage,
            cycle: this.state.cycle,
            status: this.state.status,
            reviewerIdStart: this.props.reviewerinfo[1].Id1,
            reviewerIdEnd: this.props.reviewerinfo[1].Id2,
            maxProposalId: this.props.maxProposalId,
        };
        console.log('created data for POST: ', createdata);

        fetch(`${process.env.PUBLIC_URL}/api/proposals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createdata)
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('HTTP error, status = ' + response.status);
                }
                console.log(response);
            });

        fetch(`${process.env.PUBLIC_URL}/api/reviewdata`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createdata)
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('HTTP error - to reviewdata table, status = ' + response.status);
                }
                console.log(response);
            });

        alert('You have successfully created a new Proposal');
    }

    render() {

        return (
            <div>

                <Modal id='modal_create' open={this.props.createClickopen} >

                    <Modal.Header>
                        Create a Proposal: by C-DACS admin only
                    </Modal.Header>
                    <Form className='modal-container'>
                        <Form.Group unstackable widths={2}>
                            <Form.Input label='Title' placeholder='Title' name='title'
                                value={this.state.title}
                                onChange={(e) => this.setState({ title: e.target.value })}
                            />
                            <Form.Input label='Sponsor' placeholder='Sponsor' name='VA_sponsor'
                                value={this.state.VA_sponsor}
                                onChange={(e) => this.setState({ VA_sponsor: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group unstackable widths={2}>
                            <Form.Input label='Support' placeholder='Support' name='support'
                                value={this.state.support}
                                onChange={(e) => this.setState({ support: e.target.value })}
                            />
                            <Form.Input label='Presenter' placeholder='Presenter' name='project_presenter'
                                value={this.state.project_presenter}
                                onChange={(e) => this.setState({ project_presenter: e.target.value })}
                            />
                        </Form.Group><br />

                        <div className="dropdown-selections">
                            <div>
                                <p id="selectstage-title"> Stage  </p>
                                <select name="stage" className="ui dropdown" id="selectStage-create"
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
                                <select name="status" className="ui dropdown" id="selectStatus-create"
                                    onChange={(e) => { this.setState({ status: e.target.value }) }}>
                                    >
                                <option value='tentative'>Tentative</option>
                                    <option value='approved'>Approved</option>
                                    <option value="declined">Declined</option>
                                </select>
                            </div>
                        </div>

                        <br /> <hr />
                        <Button type='button' id='btn-submit'
                            className='ui button' onClick={this.createdToServer}
                        >
                            Submit Created data
                        </Button>
                        <button type='button'
                            onClick={this.props.createClickclose}
                            id='btn-close' className='ui button'>
                            Close this Window
                        </button>
                    </Form>
                </Modal>
            </div >
        )
    }
}

export default ModalCreate
