import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import './Modal.css';
import './Scoring_all.css';
import ReactToPrint from "react-to-print";
import ReportToPrint from './ReportToPrint';

class ModalReport extends React.Component {

    render() {

        return (
            <Modal className='modal-container' id='modal_report' size='fullscreen' open={this.props.reportClickopen} >
                <h2 id='report_title'>_____ List of all Reviewers' Reports (Scores & Comments) submitted on this Proposal _____
                    <button type='button' id='btn-close-report' className='ui button' onClick={this.props.reportClickclose} >
                        Close this Window
                    </button>
                    <ReactToPrint
                        trigger={() => <Button
                            id='btn-print-report' >
                            Print out Reports
                            </Button>}
                        content={() => this.componentRef} />
                </h2>
                <ReportToPrint
                    reviewdata={this.props.reviewdata}
                    reportProposal={this.props.reportProposal}
                    ref={el => (this.componentRef = el)}
                />
            </Modal>
        )
    }
}

export default ModalReport