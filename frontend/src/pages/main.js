import React from 'react'
import FlightsPageButton from '../components/FlightsPageButton';
import CountriesPageButton from '../components/CountriesPageButton';
import FlightSearch from '../forms/FlightSearch';
// import FlightPage from '../components/FlightPage//Flight_page_new/FlightPage'

// import { FlightPage1 } from '../components/FlightPage/FlightPage1'


const MainPage = (message) => {

    return (
    
    <div>

        <h1>Where You Want To Go?</h1>
        <br></br>
        <FlightSearch />
        {/* <FlightPage /> */}
        {/* <FlightPage1 /> */}

    
    
     {!message ==={}? (<h2>{message}</h2>):<></>}</div>)
}

export default MainPage

