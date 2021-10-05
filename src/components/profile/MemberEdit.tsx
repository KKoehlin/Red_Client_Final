import React from 'react'
import { MemberState } from './MemberCreate'
import { Profile } from './MemberView'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap'
import './Member.css'

type MEProps = {
    updateMember: Profile
    // profileData: []
    token: string | null
    updateOff: () => void
    fetchProfile: () => void
    open: boolean
}

interface MEState extends MemberState {
    modalHere: boolean

}

export class MemberEdit extends React.Component<MEProps, MEState> {
    constructor(props: MEProps) {
        super(props)
        this.state = {
            modalHere: true,
            profile: [],
            destination: this.props.updateMember.destination,
            date: this.props.updateMember.date,
            journal: this.props.updateMember.journal
        }
    }

    editMember = async () => {
        console.info(this.props.updateMember.id)
        try {
            const res = await fetch(`http://localhost:3000/profile/update/${this.props.updateMember.id}`,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        destination: this.state.destination,
                        date: this.state.date,
                        journal: this.state.journal
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.props.token}`
                    }),
                }
            )
            await res.json()
            this.props.fetchProfile();
        } catch (err) {
            console.log(err)
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState(({ [name]: value} as unknown) as Pick<MEState, keyof MEState>)
    }

    modalToggle = () => {
        this.setState({ modalHere: false })
        this.props.updateOff()

    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modalHere}
                toggle={this.modalToggle}>
                    <ModalHeader toggle={this.modalToggle}>Edit Journal</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label htmlFor="destination">Edit Destination:</Label>
                                <Input name="destination" 
                                id="destination"
                                value={this.state.destination} 
                                onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="date">Edit Date:</Label>
                                <Input 
                                id="date"
                                name="date" 
                                value={this.state.date} 
                                onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="journal">Edit journal:</Label>
                                <Input 
                                id='journal' 
                                name="journal" 
                                value={this.state.journal} 
                                onChange={this.handleChange} />
                            </FormGroup>
            
                            <Button type="submit"
                            onClick={() => {
                             this.editMember()
                            this.modalToggle()}}>
                                    Update Journal!</Button>
                            <Button
                            onClick={() => {
                                this.modalToggle()}}>
                                Cancel
                            </Button>
                            
                        </Form>
                    </ModalBody>
                </Modal>
        )
            </div>
        )
    }
}