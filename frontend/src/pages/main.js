import React from 'react'
import FlightsPageButton from '../components/FlightsPageButton';
import CountriesPageButton from '../components/CountriesPageButton';


const MainPage = (message) => {

    return (
    
    <div><h1>WHAT A WONDERFUL MAIN PAGE</h1>
    <FlightsPageButton />
    <CountriesPageButton />
    
    
     {!message ==={}? (<h2>{message}</h2>):<></>}</div>)
}

export default MainPage

