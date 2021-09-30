import React from 'react'
import { Result } from './BreweryInterface'
import {
    Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap';

type CardProps = {
    brewery: Result
    //result: Result
}

export class BreweryCard extends React.Component<CardProps, {}> {
    constructor(props: CardProps) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="grid-container">
                <Card className='apiCard'>
                    <CardHeader>{this.props.brewery.name}</CardHeader>
                    <CardBody>
                        {/* <CardTitle tag="h5">{this.props.brewery.brewery_type}</CardTitle> */}
                        <CardText>
                            {this.props.brewery.street}
                            <br />
                            {this.props.brewery.city}, {this.props.brewery.state}
                            <br />
                            {this.props.brewery.postal_code}, {this.props.brewery.country}
                            <br />
                            {this.props.brewery.phone}
                        </CardText>
                    </CardBody>
                    <CardFooter><a href={this.props.brewery.website_url}target="_blank">Check out their website!</a></CardFooter>
                </Card>
            </div>
        )
    }
}
