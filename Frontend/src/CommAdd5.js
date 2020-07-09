import React from 'react';
import './Scoring_all.css';
import { Form, Message } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

class CommAdd5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    componentDidMount() {
        this.setState({ value: this.props.comm5 });
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    render() {

        this.props.getComm5(this.state.value);

        return (
            <div className='Scoring_Comm_right' >
                <Form success onSubmit={this.handleSubmit}>
                    <Message color='orange'
                        content="Constraints --> How debilitating are any constraints to the completion of this project?"
                    />
                    <h3 id='textlabel'>Based on the score (left), type in your "Comments & Considerations" here </h3>
                    <TextareaAutosize id='Comm_textarea5' placeholder='Write Comments' value={this.state.value} onChange={this.handleChange} />
                </Form>
            </div>
        );
    }
}

export default CommAdd5




