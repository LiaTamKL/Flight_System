import React from 'react'
import FlightSearchForm from '../forms/FlightSearchForm';
// import FlightPage from '../components/FlightPage//Flight_page_new/FlightPage'

// import { FlightPage1 } from '../components/FlightPage/FlightPage1'


const MainPage = (message) => {

    return (
    
    <div>

        <h1>Where Do You Want To Go?</h1>
        <br></br>
        <FlightSearchForm />

    
    
     {!message ==={}? (<h2>{message}</h2>):<></>}</div>)
}

export default MainPage

