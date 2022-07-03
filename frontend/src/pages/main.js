import React from 'react'
import FlightsPageButton from '../components/FlightsPageButton';
import CountriesPageButton from '../components/CountriesPageButton';
import FlightSearch from '../forms/FlightSearch';


const MainPage = (message) => {

    return (
    
    <div>
        <h3>Give Your Life A Rest,   </h3>
        <h3>Plan a vacation Today</h3>
        <br></br>
        <h5>Where You Want To Go?</h5>
        <FlightSearch />
    
    
     {!message ==={}? (<h2>{message}</h2>):<></>}</div>)
}

export default MainPage

