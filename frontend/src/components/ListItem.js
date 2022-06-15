import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({ flight }) => {
    return (

       
        <Link to={`flight/${flight.id}`}>
            <div className="flights-list-item" >
                <p> {flight.airline}</p>
            </div>
        </Link>

  )
}

export default ListItem