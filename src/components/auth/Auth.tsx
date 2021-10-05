import { type } from 'os';
import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Login } from './Login'
import { SignUp } from './SignUp'
import { Redirect } from 'react-router-dom'


type AuthProps = {
    updateToken:(t: string) => void
}

type AuthState = {
    showLogin: boolean
    loggedin: boolean
}


export class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props)
        this.state = {
            showLogin: true,
            loggedin: false
        }

        this.togglePortal = this.togglePortal.bind(this)
    }

    togglePortal = (): void => {
        this.setState({ showLogin: !this.state.showLogin })
    }

    setloggedin = () => {
        this.setState({loggedin: true})
    }

    render() {
        if (this.state.loggedin) {
            return <Redirect to="/member"/>
        
        }
        else {

        
        return (
            <Container>
                {this.state.showLogin
                    ? <SignUp
                        togglePortal={this.togglePortal}
                        updateToken={this.props.updateToken}
                        setloggedin={this.setloggedin}
                    />

                    : <Login
                        togglePortal={this.togglePortal}
                        updateToken={this.props.updateToken}
                        setloggedin={this.setloggedin}
                    />
                }

            </Container>
        )}
    }
}