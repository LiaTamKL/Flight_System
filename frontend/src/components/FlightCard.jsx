

const FlightCard = ({flight, countries}) => {
    const d = new Date(flight.departure_time)
    const l = new Date(flight.landing_time)
    const d_country = countries?.find(count=> count.country_name===flight.destination_country)
    const o_country = countries?.find(count=> count.country_name===flight.origin_country)

    return (<>
        <h5>Flight #{flight.id} by {flight.airline}</h5>
            <div className="d-flex w-100 justify-content-between">
                <h6 className="p-2 bg-light border">To {flight.destination_country} <img src={d_country?.flag} height="15px" width="20px"/> from {flight.origin_country} <img src={o_country?.flag} height="15px" width="20px"/></h6>
                <small className="text-muted">{flight.remaining_tickets} tickets left</small>
            </div>
            <div className="d-flex w-100 justify-content-between">
            <h6 className="p-2 bg-light border">Departing at {d.toUTCString()}</h6>
                <h6 className="p-2 bg-light border">Landing at {l.toUTCString()}</h6>
                <br/><br/>

            </div></>
    )
}

export default FlightCard