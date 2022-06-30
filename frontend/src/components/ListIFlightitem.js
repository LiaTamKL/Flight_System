import React from 'react'
import { Link } from 'react-router-dom'

const ListIFlightitem = ({ flight }) => {
    return (
  
        <Link to={`/flights/${flight.id}`}>
            <div className="all-list-item" >
                <p> {flight.airline}</p>
            </div>
        </Link>

  )
}

export default ListIFlightitem