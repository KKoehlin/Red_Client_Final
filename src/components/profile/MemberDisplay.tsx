import React from 'react'
import { profile } from '../../types'
import { Button } from 'reactstrap'
import { MemberState } from './MemberCreate'
import './Member.css'

type DisplayProps = {
    token: string | null
    profileData: Array<object>
    fetchProfile: (e: any) => Promise<any>
    updateOn: () => void,
    editProfile: (profile: any) => void
}

interface MDState extends MemberState {
    id: number
}

export class MemberDisplay extends React.Component<DisplayProps, MDState> {
    constructor(props: DisplayProps) {
        super(props)
        this.state = {
            id: Infinity,
            profile: [],
            destination: '',
            date: '',
            journal: ''
        }
    }

    deleteMember = async (e: any, id: number) => {
        e.preventDefault()
        fetch(`http://localhost:3000/profile/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`,
            }),
        })
        return this.props.fetchProfile(e)
    }

    render() {
        return (
            <div className="displaywrapper">
                {this.props.profileData.length > 0 ? (
                    <>
                        {this.props.profileData.map(
                            (profile: any,
                                index: number) => {
                                return (
                                    <div className="displayform" key={index}>
                                        <p className="displaydes">{profile.destination}</p>
                                        <p className="displaydate">{profile.date}</p>
                                        <p>{profile.journal}</p>
                                        <div>
                                            <Button className="updatebutton" onClick={() => {
                                                this.props.editProfile(profile)
                                                this.props.updateOn()
                                            }}>Update</Button>

                                            <Button className="deletebutton" onClick={e => this.deleteMember(e, profile.id)}>
                                                Delete
                                        </Button>
                                        </div>
                                    </div >
                                )
                            }
                        )
                        }
                    </>
                ) : (
                    <>
                    </>
                )}
            </div >
        )
    }

}