import React from 'react'
import { Link } from 'react-router-dom'


const ListTicketitem = ({ ticket }) => {
    return (
        <Link to={`/tickets/${ticket.id}`}>
            <div className="all-list-item" >
                <p> {ticket.flight}</p>
            </div>
        </Link>

    )
}




const ListIFlightitem = ({ flight , userrole }) => {
    let linkto
    if (userrole === "Customer"){
        linkto = `/Customer/tickets/${flight.id}`
    }
    else{
        linkto = `/flights/${flight.id}`
    }


    return (
        //pass variable thru link state={{ flight:flight,  "hello" }}
        <Link to={linkto} >
            <div className="all-list-item" >
                <p> {flight.airline}</p>
            </div>
        </Link>

  )
}

export  { ListIFlightitem, ListTicketitem }