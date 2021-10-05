import React, { Component } from 'react';
import {
    Input, Container, CardColumns
} from 'reactstrap';
import { BreweryCard } from "./BreweryCard"
import { BreweryResponse, Result } from './BreweryInterface'
import "./Brewery.css"
import { Redirect } from "react-router-dom"

type BreweryProps = {
    token: string | null
}
type BreweryState = {
    loaded: boolean
    breweryInformation: any;
    search: []
    city: string
    tempArray: any
}


export class BreweryIndex extends Component<BreweryProps, BreweryState> {
    constructor(props: BreweryProps) {
        super(props)
        this.state = {
            loaded: false,
            breweryInformation: [],
            search: [],
            city: '',
            tempArray: []

        }

    }

    componentDidMount() {
        fetch(`https://api.openbrewerydb.org/breweries?by_city=${this.state.city}&by_type=micro&by_type=brewpub&per_page=50`)
            .then((res) => res.json())
            //   .then is your json
            .then((BreweryResponse) => {
                console.log(BreweryResponse);
                this.setState({ breweryInformation: BreweryResponse,
                                tempArray: BreweryResponse });
            });
        console.info(this.state.breweryInformation)
    }

    searchByCity = () => {
        fetch(`https://api.openbrewerydb.org/breweries?by_city=${this.state.city}&per_page=50`)
        .then((res) => res.json())
        //   .then is your json
        .then((BreweryResponse) => {
            console.log(BreweryResponse);
            this.setState({ breweryInformation: BreweryResponse});
        });
    }

    render() {
        if (!this.props.token) return <Redirect to="/" />
        return (
            <Container>
                <div className="search">
                    <Input
                        onChange={(e) => this.setState({city: e.target.value})}
                        type="text"
                        placeholder='Search by City Here' />
                        <button className="searchbutton" onClick={this.searchByCity}>look it up</button>
                </div>
                <CardColumns>
                    <div className='cardsMap'>
                        {
                            this.state.breweryInformation.map(
                                (result: Result, index: number) => (
                                    <BreweryCard brewery={result} key={index} />
                                )
                            )
                        }
                    </div>
                </CardColumns>
            </Container>

        )
    }

}