import React from 'react'
import { PostState } from './PostCreate'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap'
import './Post.css'
import APIURL from '../../helpers/environment'

type PEProps = {
    updatePost: { [key: string]: any }
    token: string | null
    updateOff: () => void
    fetchPost: () => void
    open: boolean
}

interface PEState extends PostState {
    isModalVisible: boolean
}

export class PostEdit extends React.Component<PEProps, PEState> {
    constructor(props: PEProps) {
        super(props)
        this.state = {
            isModalVisible: true,
            tripName: this.props.updatePost.tripName,
            location: this.props.updatePost.location,
            date: this.props.updatePost.date,
            travelPartner: this.props.updatePost.travelPartner,
            tripPlan: this.props.updatePost.tripPlan
        }
    }

    editPost = async (e: any) => {
        e.preventDefault()
        try {
            const res = await fetch(`${APIURL}/post/update/${this.props.updatePost.id}`,
                {
                    method: 'PUT',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.props.token}`
                    }),
                    body: JSON.stringify({
                        tripName: this.state.tripName,
                        location: this.state.location,
                        date: this.state.date,
                        travelPartner: this.state.travelPartner,
                        tripPlan: this.state.tripPlan
                    }),
                })
            await res.json()
            this.props.updateOff()
            this.props.fetchPost();
        } catch (err) {
            console.log(err)
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState(({ [name]: value} as unknown) as Pick<PEState, keyof PEState>)
    }

    modalToggle = () => {
        this.setState({ isModalVisible: false })
        this.props.updateOff()
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.isModalVisible} toggle={this.modalToggle}>
                    <ModalHeader toggle={this.modalToggle}>Edit Post</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label htmlFor="tripName">Edit Trip Name:</Label>
                                <Input name="tripName" value={this.state.tripName} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="location">Edit Location:</Label>
                                <Input name="location" value={this.state.location} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label >Edit Date:</Label>
                                <Input  name="date" value={this.state.date} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Edit Travel Partner:</Label>
                                <Input  name="travelPartner" value={this.state.travelPartner} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="tripPlan">Edit Trip Schedule:</Label>
                                <Input  name="tripPlans" value={this.state.tripPlan} onChange={this.handleChange} />
                            </FormGroup>
                            <Button type="submit"
                            onClick={(e) => {
                                this.editPost(e)
                                this.modalToggle()
                            }}>Update Trip!</Button>
                            <Button onClick={() => {
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
