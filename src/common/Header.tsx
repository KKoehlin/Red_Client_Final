import React from 'react'
import { Link } from 'react-router-dom'
import {Jumbotron} from 'reactstrap'


export class Header extends React.Component <{}, {}> {
    render() {
        
        return (

<div className='headerDiv'>
<Jumbotron>
  <h1 className="header">What's on Tap</h1>
  <p className="lead">Who doesn't love good beer and traveling? Prepare your trips and support local breweries.</p>
  <p className="headerNav">
    <Link to="/login">Join the community!</Link>
  </p>
</Jumbotron>
</div>
);
}
}