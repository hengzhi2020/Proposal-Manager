import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'
import './Scoring_all.css'

export default class ScoringPositive extends Component {
    state = {
        value: ''
    }
    handleChange = (e, { value }) => {
        this.setState({ value });
    }

    render() {

        if (this.props.tabName === 'Business-Need --> ') { !!this.state.value && this.props.getScore1(this.state.value) }
        else if (this.props.tabName === 'Feasibility-and-SMART-Goals --> ') { !!this.state.value && this.props.getScore2(this.state.value) }
        else if (this.props.tabName === 'Resources --> ') { !!this.state.value && this.props.getScore3(this.state.value) }
        else if (this.props.tabName === 'Commitment --> ') { !!this.state.value && this.props.getScore4(this.state.value) }

        return (
            <div className='Scoring_temp_pos'>
                <h3> __Directions__ Please select a score to this proposal (scale is 0 - 5)</h3>
                <Form.Field className='radiotitle'>
                    {this.props.tabName} The Score you gave is:  <b>{this.state.value}</b>
                </Form.Field>
                <Form.Field className='radioitems'>
                    <Radio
                        label='5 -- Proposal greatly exceeds expectations in this area.'
                        name='radioGroup'
                        value='5'
                        checked={this.state.value === '5'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field className='radioitems'>
                    <Radio
                        label='4 -- Proposal goes above expectations in this area.'
                        name='radioGroup'
                        value='4'
                        checked={this.state.value === '4'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field className='radioitems'>
                    <Radio
                        label='3 -- Proposal is acceptable in this area but needs to be considered more carefully in next stage.'
                        name='radioGroup'
                        value='3'
                        checked={this.state.value === '3'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field className='radioitems'>
                    <Radio
                        label='2 -- Proposal is lacking in this area.'
                        name='radioGroup'
                        value='2'
                        checked={this.state.value === '2'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field className='radioitems'>
                    <Radio
                        label='1 -- Proposal is severely lacking in this area.'
                        name='radioGroup'
                        value='1'
                        checked={this.state.value === '1'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field className='radioitems'>
                    <Radio
                        label="0 - Proposal is unable to be scored in this area. A selection of zero should have comments reflected to explain reviewer's choice."
                        name='radioGroup'
                        value='0'
                        checked={this.state.value === '0'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
            </div>
        )
    }
}