import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

type PostProps = {
    token: string
    fetchPost:() => void
}

export type PostState = {
    post: Array<object>,
    tripName: string,
    location: string,
    date: string,
    travelPartner: string,
    tripPlan: string
}

export class PostCreate extends React.Component<PostProps, PostState> {
    constructor(props: PostProps) {
        super(props)
        this.state = {
            post: [],
            tripName: '',
            location: '',
            date: '',
            travelPartner: '',
            tripPlan: ''
        }
    }

    newPost = async(e: React.FormEvent<HTMLFormElement>): Promise<void> => {e.preventDefault()
    try {
        const response = await fetch("http://localhost:3000/post/create", {
            method: 'POST',
            body: JSON.stringify({
                user:
                {
                    tripName: this.state.tripName,
                    location: this.state.location,
                    date: this.state.date,
                    travelPartner: this.state.travelPartner,
                    tripPlan: this.state.tripPlan
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }),
        })
        await response.json()
        this.setState({
            tripName: '',
            location: '',
            date: '',
            travelPartner: '',
            tripPlan: ''  
        })
        this.props.fetchPost()
    } catch (err) {
        console.log(err)
    }
}

handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState(({ [name]: value } as unknown) as Pick<PostState, keyof PostState>)
}
    render() {
        return (
            <>
                <h3>Create Trip</h3>
                <Form className="tripform" onSubmit={this.newPost}>
                    <FormGroup>
                        <Label htmlFor="tripName">Trip Name:</Label>
                        <Input name="age" value={this.state.tripName} onChange={this.handleChange}
                        />
                        <br />
                        <Label htmlFor="location">Location:</Label>
                        <Input name="location" value={this.state.location} onChange={this.handleChange}
                        />
                        <br />
                        <Label htmlFor="date">Date:</Label>
                        <Input name="date" value={this.state.date} onChange={this.handleChange}
                        />
                        <br />
                        <Label htmlFor="travelPartner">Travel Partner:</Label>
                        <Input name="travelPartner" value={this.state.travelPartner} onChange={this.handleChange}
                        />
                        <br />
                        <Label htmlFor="tripPlan">Plan:</Label>
                        <Input name="tripPlan" value={this.state.tripPlan} onChange={this.handleChange}
                        />
                    </FormGroup>
                    <br />
                    <Button type="submit">Click to Add</Button>
                </Form>
            </>

        )
    }
}