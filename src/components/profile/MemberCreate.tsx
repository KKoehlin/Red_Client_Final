import React from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'

type MemberProps = {
    token: string
    fetchProfile:() => void
}

export type MemberState = {
    fname: string,
    age: number | string,
    hometown: string,
    favbev: string,
    wishlist: string
}

export class MemberCreate extends React.Component<MemberProps, MemberState> {
    constructor(props: MemberProps) {
        super(props)
        this.state = {
            fname: '',
            age: '',
            hometown: '',
            favbev: '',
            wishlist: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        fetch("http://localhost:3000/profile/create", {
            method: 'POST',
            body: JSON.stringify({
                user:
                {
                    fname: this.state.fname,
                    age: this.state.age,
                    hometown: this.state.hometown,
                    favbev: this.state.favbev,
                    wishlist: this.state.wishlist
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((profileData) => {
                console.log(profileData);
                this.props.fetchProfile();
            })
    }

    render() {
        return (
            <>
                <Form className="profileform" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <h3>About:</h3>
                        <Input className="memberinput" name=" first name" placeholder='Name' value={this.state.fname} onChange={(e) => this.setState({fname: e.target.value})}>
                        </Input>
                        <br />
                        <Input className="memberinput" placeholder='Age'  value={this.state.age} onChange={(e) => this.setState({age: e.target.value})}>
                        </Input>
                        <br />
                        <Input className="memberinput" name="hometown" placeholder='Hometown' value={this.state.hometown} onChange={(e) => this.setState({hometown: e.target.value})}>
                        </Input>
                        <br />
                        <Input className="memberinput" name="favbev" placeholder='Favorite Drink'  value={this.state.favbev} onChange={(e) => this.setState({favbev: e.target.value})}>
                        </Input>
                        <br />
                        <Input className="memberinput" name="Travel Wish List" placeholder='Travel Wish List'  value={this.state.wishlist} onChange={(e) => this.setState({wishlist: e.target.value})}>
                        </Input>
                    </FormGroup>
                    <br />
                    <Button type="submit">Click to Add</Button>
                </Form>
            </>

        )
    }
}