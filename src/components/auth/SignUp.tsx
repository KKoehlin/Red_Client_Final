import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import APIURL from '../../helpers/environment'

type SignUpProps = {
    updateToken(t: string): void
    togglePortal: () => void
    setloggedin:() => void
}

type SignUpState = {
    username: string
    password: string
    signup: boolean
}

export class SignUp extends Component<SignUpProps, SignUpState> {
    constructor(props: SignUpProps) {
        super(props)
        this.state = {
            username: '',
            password: '',
            signup: true,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
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
            this.props.setloggedin()
        })
    }

    render() {
        return (
            <div className='signUp'>
                <h1>Sign Up</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input onChange={(e) => this.setState({ username: e.target.value })} name="username" value={this.state.username} />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input onChange={(e) => this.setState({ password: e.target.value })} 
                        name="password" 
                        type="password"
                        value={this.state.password}
                        minLength={8} />
                    </FormGroup>
                    <br />
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" id="checkbox2" />{' '}
                     I am 21 years old.
                        </Label>
                    </FormGroup>
<br />
                    <Button type="submit">Sign Up</Button>
                    <br />
                    <Link to="login" className="authLink" onClick={this.props.togglePortal}>Already have an account?</Link>
                </Form>
            </div>
        )
    }
}