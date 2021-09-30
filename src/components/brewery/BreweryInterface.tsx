export interface Result {
    id: number
    name: string
    brewery_type: string
    city: string
    country: string
    state: string
    street: string
    postal_code: string
    website_url: string
    phone: string
}

export interface BreweryResponse {
    results: Result[]
}