import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Redirect } from "react-router-dom"
import { PostEdit } from './PostEdit'
import { PostDisplay } from './PostDisplay'
import { PostCreate } from './PostCreate'
import './Post.css'


type ViewProps = {
    token: string | null
}

type ViewState = {
    postData: Array<object>
    updatePost: { [key: string]: string }
    updateActive: boolean
    open: boolean
}

export class PostView extends React.Component<ViewProps, ViewState> {
    constructor(props: ViewProps) {
        super(props)
        this.state = {
            postData: [],
            open: true,
            updateActive: false,
            updatePost: {}
        }
    }

    fetchPost = async () => {
        // if (this.props.token) {
            try {
                const res = await fetch(`http://localhost:3000/post/mine`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.props.token}`,
                    },
                })
                const data = await res.json()
                this.setState({ postData: data })
              //  return data
            } catch (err) {
                console.log(err)
            }
        }
    

    componentDidMount = () => {
         this.fetchPost()
     }

//     componentDidUpdate(prev: ViewProps) {
//     if (prev.token! == this.props.token){
//             this.fetchPost()
//          }
//  }

        editPost =(post: any) => {
            this.setState({ updatePost: post})
        }

        updateOn = () => {
            this.setState({ updateActive: true })
        }

        updateOff = () => {
            this.setState({ updateActive: false })
        }

    render() {
        if (!this.props.token) return <Redirect to="/" />
        return (
            <Container className="displaywrapper">
                        <PostCreate fetchPost={this.fetchPost} token={this.props.token} />
                        <PostDisplay
                            token={this.props.token}
                            postData={this.state.postData}
                            fetchPost={this.fetchPost}
                            editPost={this.editPost}
                            updateOn={this.updateOn} />
                            {this.state.updateActive ? (
                        <PostEdit
                        token={this.props.token}
                        fetchPost={this.fetchPost}
                        updatePost={this.state.updatePost}
                        updateOff={this.updateOff}
                        open={this.state.open}
                     />
                            ) : (
                                <></>
                            )}
                 
            </Container>
        )
    }
}
