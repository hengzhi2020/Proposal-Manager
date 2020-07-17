import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'
import './Scoring_all.css'

export default class ScoringNegative extends Component {
    state = {
        value: ''
    }
    handleChange = (e, { value }) => this.setState({ value })

    render() {

        if (this.props.tabName === 'Constrains --> ') { !!this.state.value && this.props.getScore5(this.state.value) };

        return (

            <div className='Scoring_temp_neg'>
                <h3> __Directions__ Please select a score to this proposal (scale is -5 - 0)</h3>
                <Form.Field className='radiotitle'>
                    {this.props.tabName} The Score you gave is: <b>{this.state.value}</b>
                </Form.Field>
                <Form.Field className='radioitems'>
                    <Radio
                        label='-5 -- Project has many sizeable constraints.'
                        name='radioGroup'
                        value='-5'
                        checked={this.state.value === '-5'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field className='radioitems'>
                    <Radio
                        label='-4 -- Project has a couple of sizeable constraints.'
                        name='radioGroup'
                        value='-4'
                        checked={this.state.value === '-4'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field className='radioitems'>
                    <Radio
                        label='-3 - Project has a sizeable constraint which needs to be considered carefully in the next stage.'
                        name='radioGroup'
                        value='-3'
                        checked={this.state.value === '-3'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field className='radioitems'>
                    <Radio
                        label='-2 - Project has a few small constraints.'
                        name='radioGroup'
                        value='-2'
                        checked={this.state.value === '-2'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field className='radioitems'>
                    <Radio
                        label='-1 - Project has almost no constraints.'
                        name='radioGroup'
                        value='-1'
                        checked={this.state.value === '-1'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field className='radioitems'>
                    <Radio
                        label="0 - Project has no constraints."
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