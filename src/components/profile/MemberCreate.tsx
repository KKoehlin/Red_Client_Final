import React from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'
import './Member.css'

type MemberProps = {
    token: string | null
    fetchProfile: () => void
}

export type MemberState = {
    profile: Array<object>
    destination: string,
    date: string,
    journal: string,
}

export class MemberCreate extends React.Component<MemberProps, MemberState> {
    constructor(props: MemberProps) {
        super(props)
        this.state = {
            profile: [],
            destination: '',
            date: '',
            journal: ''
        }
    }

    newMember = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:3000/profile/create", {
                method: 'POST',
                body: JSON.stringify(

                    {
                        destination: this.state.destination,
                        date: this.state.date,
                        journal: this.state.journal,
                    }
                ),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                }),
            })
            await res.json()
            this.setState({
                destination: '',
                date: '',
                journal: ''
            })
            this.props.fetchProfile()
        } catch (err) {
            console.log(err)
        }
    }
    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState(({ [name]: value } as unknown) as Pick<MemberState, keyof MemberState>)
    }

    render() {
        return (
            <>
                <Form className="profileform" onSubmit={this.newMember}>
                    <FormGroup>
                        <h3>Write down your Experiences:</h3>
                        <Input className="memberinput"
                            name="destination"
                            placeholder='Trip'
                            value={this.state.destination}
                            onChange={this.handleChange} />
                        <br />
                        <Input className="memberinput"
                            name="date"
                            placeholder='Date'
                            value={this.state.date}
                            onChange={this.handleChange} />
                        <br />
                        <Input className="memberinputj"
                            name="journal"
                            placeholder='Journal'
                            value={this.state.journal}
                            onChange={this.handleChange} />
                        <br />
                    </FormGroup>
                    <br />
                    <Button className="addButton" type="submit">Click to Add</Button>
                </Form>
            </>

        )
    }
}