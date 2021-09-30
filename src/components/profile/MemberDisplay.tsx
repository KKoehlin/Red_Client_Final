import React from 'react'
import { profile } from './types'
import {Button} from 'reactstrap'

type DisplayProps = {
    member: profile[],
    token: string,
    fetchProfile: () => void,
    updateOn: () => void,
    setProfile: (p: profile) => void
}

export class MemberDisplay extends React.Component <DisplayProps, {}> {
    constructor(props:DisplayProps) {
        super(props) 
    }

    deleteMember(member: profile) {
        fetch(`http://localhost:3000/profile/${member.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(() => this.props.fetchProfile())
    }

    memberProfile(): JSX.Element[] {
        return this.props.member.map((member: profile) => {
            return(
                <tr key={member.id}>
                    <td>{member.fname}</td>
                    <td>{member.age}</td>
                    <td>{member.hometown}</td>
                    <td>{member.favbev}</td>
                    <td>{member.wishlist}</td>
                    <td>
                        <Button color="warning" onClick={() => { this.props.setProfile(member)
                        this.props.updateOn()}}>Update</Button>
                    </td>
                    <td>
                        <Button color="danger" onClick={() => {this.deleteMember(member)}}>Delete</Button>
                    </td>
                </tr>
            )
        })}
        render(){
        return(
            <div>
            </div>
        )
    }
}