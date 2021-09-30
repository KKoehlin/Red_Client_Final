import React from 'react'
import { PostState } from './PostCreate'
import { Button } from 'reactstrap'

type DisplayProps = {
    token: string
    postData: Array<object>
    fetchPost: () => Promise<any>
    editPost: (post: string) => void
    updateOn: () => void
}

interface DisplayState extends PostState {
    id: number
}

export class PostDisplay extends React.Component<DisplayProps, DisplayState> {
    constructor(props: DisplayProps) {
        super(props)
        this.state = {
            id: Infinity,
            post: [],
            tripName: '',
            location: '',
            date: '',
            travelPartner: '',
            tripPlan: ''

        }
    }

    deletePost = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault()
        await fetch(`http://localhost:3000/post/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`,
            }),
        })
        return this.props.fetchPost()
    }
    render() {
        return (
            <div>
                {this.props.postData.length > 0 ? (
                    <>
                        {this.props.postData.map((post: any, index: number) => {
                            return (
                                <div key={index}>
                                    <p>{post.tripName}</p>
                                    <p>{post.location}</p>
                                    <p>{post.date}</p>
                                    <p>{post.travelPartner}</p>
                                    <p>{post.tripPlan}</p>
                                    <div>
                                        <Button onClic={() => {
                                            this.props.editPost(post)
                                            this.props.updateOn()
                                        }}>
                                            Update
                                        </Button>
                                        <Button onClick={e => this.deletePost(e, post.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                ) : (
                    <>
                        <h3>Create Travel Post</h3>
                    </>
                )}
            </div>

        )
    }

}