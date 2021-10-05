import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap'
import { MemberCreate } from "./MemberCreate"
import { MemberEdit } from './MemberEdit'
import {MemberDisplay} from './MemberDisplay'
import './Member.css'

type MemberProps = {
    token: string | null
}

type MemberState = {
    profileData: Profile[]
    updateMember: any
    updateActive: boolean
    open: boolean

}

export type Profile = {
    name: string
    destination: string
    date: string
    journal: string
    id?: string
}

export class MemberView extends React.Component<MemberProps, MemberState>{
    constructor(props: MemberProps) {
        super(props)
        this.state = {
            profileData: [],
            open: true,
            updateActive: false,
            updateMember: null
        }
    }

    fetchProfile = async () => {
        if (this.props.token)
        try {
        const res = await fetch('http://localhost:3000/profile/mine', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            },
            })
            const data = await res.json()
            console.log(data)
            this.setState({
                profileData: data
            })
            return data 
        } catch (err) {
            console.log(err)
        }
    }

componentDidMount() {
    this.fetchProfile()
}

editProfile = (profile: Profile) => {
    this.setState({
        updateMember: profile
    })
}

updateOn = () => {
    this.setState({
        updateActive: true
    })
}

updateOff = () => {
    this.setState({
        updateActive: false
    })
}

    render() {
        if (!this.props.token) return <Redirect to="/" />
        return (
            <Container>
                        <MemberCreate fetchProfile={this.fetchProfile} token={this.props.token} />
                        <MemberDisplay
                        token={this.props.token}
                        profileData={this.state.profileData}
                        fetchProfile={this.fetchProfile}
                        editProfile={this.editProfile}
                        updateOn={this.updateOn} />
                        {this.state.updateActive
                        ? (
                            <MemberEdit
                            token= {this.props.token}
                            fetchProfile={this.fetchProfile}
                            updateMember={this.state.updateMember}
                            updateOff={this.updateOff}
                            open={this.state.open} />
                        ) : (
                            <> </>
                        )}
            </Container>
        )
    }
}
