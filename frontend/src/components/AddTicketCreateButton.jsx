import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../assets/add.svg'


const AddTicketCreateButton = (userData) => {
    return (

        <Link to="/customer/flight/search" className="floating-button"  state={{userData: userData }}>
          <AddIcon />
        </Link>
    )
}

export default AddTicketCreateButton
