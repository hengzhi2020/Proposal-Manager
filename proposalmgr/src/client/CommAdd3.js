import React from 'react';
import './Scoring_all.css';
import { Form, Message } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

class CommAdd3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    componentDidMount() {
        this.setState({ value: this.props.comm3 });
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    render() {

        this.props.getComm3(this.state.value);

        return (
            <div className='Scoring_Comm_right' >
                <Form success onSubmit={this.handleSubmit}>
                    <Message success
                        content="Resources --> Are the resources requested realistic and available to complete the study?"
                    />
                    <h3 id='textlabel'>Based on the score (left), type in your "Comments & Considerations" here </h3>
                    <TextareaAutosize placeholder='Write Comments' id='Comm_textarea3' value={this.state.value} onChange={this.handleChange} />
                </Form>
            </div>
        );
    }

}

export default CommAdd3
