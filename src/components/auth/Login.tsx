import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom'
import { truncateSync } from 'fs';

type LoginProps = {
    updateToken: (t: string) => void
    togglePortal: () => void
    setloggedin: () => void
}

type LoginState = {
    username: string,
    password: string,
    login: boolean

}

export class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            username: '',
            password: '',
            login: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        fetch("http://localhost:3000/user/login", {
            method: 'POST',
            body: JSON.stringify({
                user:
                {
                    username: this.state.username,
                    password: this.state.password
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken)
            this.setState({ login: true })
            this.props.setloggedin()
        })
            .catch(err => console.log(err))
    }

    render() {
        // if (this.state.login) <Redirect to="/member" />
        return (
            <div className='loginForm'>
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            onChange={(e) => this.setState({ username: e.target.value })}
                            name="username"
                            value={this.state.username} />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            onChange={(e) => this.setState({ password: e.target.value })}
                            name="password"
                            value={this.state.password} />
                    </FormGroup>
                    <br />
                    <Button type="submit">Login</Button>
                    <br />
                    <Link to="login" className="authLink" onClick={this.props.togglePortal}>Don't have an account?</Link>
                </Form>
                {this.state.login ?
                    <>
                        {/* <Redirect push to='/member'/> */}
                    </>
                    : <></>}
            </div>
        )
    }
}
