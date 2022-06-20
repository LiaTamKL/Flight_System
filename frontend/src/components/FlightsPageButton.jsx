import React from 'react'
import { Link } from 'react-router-dom';
import {ReactComponent as Addflighticon } from '../assets/flight.svg';



const FlightsPageButton = () => {
  return (
    <Link to="/flights/" className="floating-all-button">
        <Addflighticon />
    </Link>
  )
}

export default FlightsPageButton