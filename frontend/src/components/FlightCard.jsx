

const FlightCard = ({flight}) => {
    const d = new Date(flight.departure_time)
    const l = new Date(flight.landing_time)
    return (
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Flight #{flight.id} by {flight.airline}</h5>
                <small className="text-muted">{flight.remaining_tickets} tickets left</small>
                <h7 className="mb-1">From {flight.destination_country} to {flight.origin_country}</h7>
                <h7 className="mb-1">Departing at {d.toLocaleString()}</h7>
                <h7 className="mb-1">Landing at {l.toLocaleString()}</h7>
                <br/><br/>

            </div>
    )
}

export default FlightCard