

const FlightCard = ({flight}) => {
    const d = new Date(flight.departure_time)
    const l = new Date(flight.landing_time)
    return (<>
        <h5>Flight #{flight.id} by {flight.airline}</h5>
            <div className="d-flex w-100 justify-content-between">
                <small className="text-muted">{flight.remaining_tickets} tickets left</small>
                <h6 className="p-2 bg-light border">To {flight.destination_country} from {flight.origin_country}</h6>
            </div>
            <div className="d-flex w-100 justify-content-between">
                <h6 className="p-2 bg-light border">Departing at {d.toLocaleString()}</h6>
                <h6 className="p-2 bg-light border">Landing at {l.toLocaleString()}</h6>
                <br/><br/>

            </div></>
    )
}

export default FlightCard