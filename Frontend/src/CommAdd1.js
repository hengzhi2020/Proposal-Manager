import React from 'react';
import './Scoring_all.css';
import { Form, Message } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

class CommAdd1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    componentDidMount() {
        this.setState({ value: this.props.comm1 });
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    render() {

        this.props.getComm1(this.state.value);

        return (
            <div className='Scoring_Comm_right' >
                <Form success onSubmit={this.handleSubmit}>
                    <Message success
                        content="Business Need --> Is the proposal concise/well defined and well thought out in terms of tangible deliverables? Does this proposal solve a concrete and acute business need?"
                    />
                    <h3 id='textlabel'>Based on the score (left), type in your "Comments & Considerations" here </h3>
                    <TextareaAutosize placeholder='Write Comments' value={this.state.value} onChange={this.handleChange} />
                </Form>
            </div>
        );
    }
}

export default CommAdd1
