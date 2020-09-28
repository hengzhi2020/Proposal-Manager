import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import './Modal.css';
import './Scoring_all.css';
import ReactToPrint from 'react-to-print';
import ReportScoreToPrint from './ReportScoreToPrint';

class ModalReportScore extends React.Component {
  render() {
    return (
      <Modal
        className="modal-container"
        id="modal_report"
        size="fullscreen"
        open={this.props.reportClickopen}
      >
        <h2 id="report_title">
          _____ List of Reviewers' Scores only _____
          <button
            type="button"
            id="btn-close-report"
            className="ui button"
            onClick={this.props.reportClickclose}
          >
            Close this Window
          </button>
          <ReactToPrint
            trigger={() => (
              <Button id="btn-print-report">Print out Reports</Button>
            )}
            content={() => this.componentRef}
          />
        </h2>
        <ReportScoreToPrint
          reviewdata={this.props.reviewdata}
          reportProposal={this.props.reportProposal}
          ref={(el) => (this.componentRef = el)}
        />
      </Modal>
    );
  }
}

export default ModalReportScore;
