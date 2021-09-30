import React from 'react'
import { MemberState } from './MemberCreate'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap'

type MEProps = {
    updateMember: { [key: string]: any }
    token: string 
    updateOff: () => void
    fetchMember: () => void
    open: boolean
}

interface MEState extends MemberState {
    isModalVisible: boolean

}

export class MemberEdit extends React.Component<MEProps, MEState> {
    constructor(props: MEProps) {
        super(props)
        this.state = {
            isModalVisible: true,
            fname: this.props.updateMember.fname,
            age: this.props.updateMember.age,
            hometown: this.props.updateMember.hometown,
            favbev: this.props.updateMember.favbev,
            wishlist: this.props.updateMember.wishlist
        }
        this.editMember = this.editMember.bind(this);
    }

    editMember = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:3000/profile/update/${this.props.updateMember.id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        fname: this.state.fname,
                        age: this.state.age,
                        hometown: this.state.hometown,
                        favbev: this.state.favbev,
                        wishlist: this.state.wishlist
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.props.token}`
                    }),
                }
            )
            await res.json()
            this.props.fetchMember();
            this.props.updateOff();
        } catch (err) {
            console.log(err)
        }
    }
    render() {
        return (
            <div>
                <Modal isOpen={true}>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.editMember}>
                            <FormGroup>
                                <Label htmlFor="fname">Edit First Name:</Label>
                                <Input name="fname" value={this.state.fname} onChange={(e) => this.setState({ fname: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="age">Edit Age:</Label>
                                <Input name="age" value={this.state.age} onChange={(e) => this.setState({age: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Edit Hometown:</Label>
                                <Input  name="hometown" value={this.state.hometown} onChange={(e) => this.setState({hometown: e.target.value})}>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Edit Favorite Drink:</Label>
                                <Input  name="favbev" value={this.state.favbev} onChange={(e) => this.setState({favbev: e.target.value})}>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="plans">Edit Travel Wishlist:</Label>
                                <Input  name="plans" value={this.state.wishlist} onChange={(e) => this.setState({wishlist: e.target.value})}>
                                </Input>
                            </FormGroup>
                            <Button type="submit">Update Profile!</Button>
                        </Form>
                    </ModalBody>
                </Modal>
        )
            </div>
        )
    }
}