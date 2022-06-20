import React from 'react'
import { Link } from 'react-router-dom';
import {ReactComponent as AddCountryicon } from '../assets/countries.svg';



const CountriesPageButton = () => {
  return (
    <Link to="/Countries/" className="floating-all-button">
        <AddCountryicon />
    </Link>
  )
}

export default CountriesPageButton