import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import './App.css';
import App from './App';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            authentication: '',
            redirect: null
        }
    }

    sendLoginData = (e) => {
        const loginData = {
            username: this.state.username,
            password: this.state.password,
        }
      //  console.log("Login data before Submit ", loginData);

        fetch(`${process.env.PUBLIC_URL}/api/loginData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('HTTP error, status = ' + response.status);
                }
                console.log(response);
            });
        // alert('Successfully sent login data to Node-Express Server');
    }

    getAuthenGoToWebpage = (e) => {

        fetch(`${process.env.PUBLIC_URL}/api/loginData`)
            .then(response => response.json())
            .then(authenResults => {
                this.setState({
                    authentication: authenResults
                });
             //   console.log('Inside Login.js GET, returned username: ', this.state.authentication.username);

                if (this.state.authentication.username && (!this.state.authentication.passLDAP)) { 
                    alert('Your username and/or password can not go through LDAP');
                } else if(this.state.authentication.username && !this.state.authentication.passSQL) { 
                    alert('You can not access this web portal as a reviewer/admin');
                } else if (this.state.authentication.username && this.state.authentication.passLDAP && this.state.authentication.passSQL) {
                    this.setState({ redirect: true });
                } else {
                    alert('Authentication failed, please Login again!')
                }
            });
    }

    render() {
        if (this.state.redirect) {
         //   console.log("webpage: re-Directed");
            return (
                <div>
                    <App DATA={this.props.DATA} />
                </div>

            )
        };
        return (
            <div className="App" >
                <header className="App-header">
                    <h2> Login Interface __ created for LDAP authentication test only</h2>
                </header>
                <main className="main-login">
                    <Form >
                        <Form.Field>
                            <label htmlFor='uname'><b>User Name</b></label>
                            <input type='text' placeholder='User Name in LDAP'
                                name='uname' required
                                value={this.state.username}
                                onChange={(e) => this.setState({ username: e.target.value })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor='password'><b>Password</b></label>
                            <input type='password' placeholder='Pasword in LDAP'
                                name='password' required
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </Form.Field>
                        <button type='submit' id='btn-login' onClick={this.sendLoginData}>Sign In - to LDAP db</button>
                        <button type='submit' id='btn-to-ldap' onClick={this.getAuthenGoToWebpage}>Proposal Manager</button>
                    </Form>
                </main>
                <h2> Login ==> React / Node / OpenLDAP / MySQL ==> Proposal Manager</h2>
                <p> (1) If login succeeded, it will redirect to "Proposal Manager" webpage by a click;</p>
                <p> ___ NOTE: this login interface will be gone except the "Proposal Manager" button.</p>
                <p> (2) The "reviewers" table in MySQL db MUST have usernames (LDAP) stored previously;</p>
                <p> ___ NOTE: the LDAP username is used to track each individual reviewing/scoring.</p>
                
            </div>
        );
    }
}

export default Login;
