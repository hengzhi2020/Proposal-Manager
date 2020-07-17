import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import './Modal.css';
import './Scoring_all.css';
import ReactToPrint from "react-to-print";
import SearchedToPrint from './SearchedToPrint';

class ModalSearch extends React.Component {

    render() {

        return (
            <Modal className='modal-container' id='modal_report' size='fullscreen' open={this.props.searchClickopen} >
                <h2 id='report_title'>_____ List of Search Results _____
                    <button type='button' id='btn-close-report' className='ui button' onClick={this.props.searchClickclose} >
                        Close this Window
                    </button>
                    <ReactToPrint
                        trigger={() => <Button
                            id='btn-print-report' >
                            Print Searched Proposals
                            </Button>}
                        content={() => this.componentRef} />
                </h2>
                <SearchedToPrint
                    searched_pls={this.props.searched_pls}
                    ref={el => (this.componentRef = el)}
                />
            </Modal>
        )
    }
}

export default ModalSearch