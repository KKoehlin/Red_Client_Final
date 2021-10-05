import React from 'react'
import { PostState } from './PostCreate'
import { Button } from 'reactstrap'
import './Post.css'

type DisplayProps = {
    token: string | null
    postData: Array<object>
    fetchPost: (e: any) => Promise<any>
    editPost: (post: string) => void
    updateOn: () => void
}

interface DisplayState extends PostState {
    id: number | string
}

export class PostDisplay extends React.Component<DisplayProps, DisplayState> {
    constructor(props: DisplayProps) {
        super(props)
        this.state = {
            id: '',
            tripName: '',
            location: '',
            date: '',
            travelPartner: '',
            tripPlan: '',

        }
    }

    deletePost = async (e: any, id: number) => {
        e.preventDefault()
        await fetch(`http://localhost:3000/post/delete/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.props.token}`,
            }),
        })
        return this.props.fetchPost(e)
    }

    render() {
        return (
            <div className="displaywrapper">
                {this.props.postData.length > 0 ? (
                    <>
                        {this.props.postData.map((post: any, index: number) => {
                            return (
                                <div className="displayform" key={index}>
                                    <p className="tripName">{post.tripName}</p>
                                    <p className="location">{post.location}</p>
                                    <p className="date">{post.date}</p>
                                    <p className="travelPartner">{post.travelPartner}</p>
                                    <p className="tripPlan">{post.tripPlan}</p>
                                    <div>
                                        <Button className="updatebutton" onClick={() => {
                                            this.props.editPost(post)
                                            this.props.updateOn()
                                        }}>
                                            Update
                                        </Button>
                                        <Button className="deletebutton" onClick={e => this.deletePost(e, post.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                ) : (
                    <>
                      
                    </>
                )}
            </div>

        )
    }

}