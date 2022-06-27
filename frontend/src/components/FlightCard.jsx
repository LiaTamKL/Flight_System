

const FlightCard = ({flight}) => {
    const d = new Date(flight.departure_time)
    const l = new Date(flight.landing_time)
    return (
            <div className="d-flex w-100 justify-content-between">
                <div>
                <h5 className="mb-1">Flight #{flight.id} by {flight.airline}</h5>
                <small className="text-muted">{flight.remaining_tickets} tickets left</small>
                </div>
                <h6 className="p-2 bg-light border">From {flight.destination_country} to {flight.origin_country}</h6>
                <h6 className="p-2 bg-light border">Departing at {d.toLocaleString()}</h6>
                <h6 className="p-2 bg-light border">Landing at {l.toLocaleString()}</h6>
                <br/><br/>

            </div>
    )
}

export default FlightCard