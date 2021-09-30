import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap'
import { MemberCreate } from "./MemberCreate"
import { MemberEdit } from './MemberEdit'
import {MemberDisplay} from './MemberDisplay'

type MemberProps = {
    token: string 
   // fetchMember: () => void
  //  updateOff: () => void
    // updateMember:  {[key: string]: any}
}

type MemberState = {

}

export class MemberView extends React.Component<MemberProps, MemberState>{
    constructor(props: MemberProps) {
        super(props)
    }

    componentDidMount() {
        console.info(this.props.token)
    }

    fetchProfile = () => {
        console.info(this.props.token)
        fetch('http://localhost:3000/profile', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })

        }).then((res) => res.json())
            .then((profileData) => {
                this.setState(profileData)
            })
    }

    render() {
        if (!this.props.token) return <Redirect to="/" />
        {console.info(this.props.token)}
        return (
            <Container>
                <h3>Hi There!</h3>
                <Row>
                <Col md="3">
                        <MemberCreate fetchProfile={this.fetchProfile} token={this.props.token} />
                </Col>
                </Row>
            </Container>
        )
    }
}
