import React from 'react'
import FlightsPageButton from '../components/FlightsPageButton';
import CountriesPageButton from '../components/CountriesPageButton';
import FlightSearch from '../forms/FlightSearch';


const MainPage = (message) => {

    return (
    
    <div>

        <h1>Where You Want To Go?</h1>
        <br></br>
        <FlightSearch />
    
    
     {!message ==={}? (<h2>{message}</h2>):<></>}</div>)
}

export default MainPage

