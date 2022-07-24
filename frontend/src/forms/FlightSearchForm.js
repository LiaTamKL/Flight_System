
import {
    DateRange,
  } from "react-date-range";
import './Form.css'
import React, {useEffect} from 'react'
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useNavigate } from "react-router-dom"

import { FilteredCountryMethod } from "../methods/FilterMethods"
import { BsCalendar2Date } from 'react-icons/bs';


const FlightSearchForm = () => {

    let navigate = useNavigate();    
    let[fromSearchOption, setFromSearchOption] = useState(0);
    let[toSearchOption, settoSearchOption] = useState(0);
    let [departureTime, setDepartureTime] = useState("");
    let [arrivalTime, setArrivalTime] = useState("")



let handleClick = () => {
    let flightSearchParams = {'fromSearchOption':fromSearchOption, 'toSearchOption':toSearchOption ,departureTime:departureTime, arrivalTime:arrivalTime}
    navigate("/flights/",  { state: {  flightSearchParams: flightSearchParams }} )
                       
}


    useEffect(() => { 

    }, [departureTime, arrivalTime, fromSearchOption , toSearchOption])

    let getCountries = async (searchTerm) => {
        let filtered = await FilteredCountryMethod(searchTerm) 
        return filtered?.map((country) => ({value:country.id, label:country.country_name}))
    }

    return ( 
        <div className="search-container">

                <AsyncSelect 
                    className='country-input'
                    placeholder="&#x1F6EA; From?" 
                    cacheOptions
                    loadOptions = {getCountries}
                    isSearchable
                    isClearable
                    maxMenuHeight = {300}
                    onInputChange = {(e) => {getCountries(e)}} 
                    onChange = {
                    (e)=> e? (
                        setFromSearchOption(e.value)
                        )
                        : setFromSearchOption(0)
                    }/>


                <AsyncSelect

                    className='country-input'
                    placeholder = "&#x1F6EA; To?"
                    cacheOptions
                    loadOptions = {getCountries}
                    maxMenuHeight = {300}
                    onInputChange = {(e) => {getCountries(e)}} 
                    isSearchable
                    isClearable
                    onChange = {
                    (e)=>  e? (
                        settoSearchOption(e.value))
                        : settoSearchOption(0)
                    }
                    />
                
                <input

                    className='date-input'
                    placeholder="Landing"
                    label="Departure Time" 
                    type='date'                    
                    defaultValue={departureTime}
                    onChange = {(e) => {    
                    setDepartureTime(e.target.value)
                    }}
                    >
                </input>

                <input
                className='date-input'
                    label="Arrival Time"  
                    type='date'
                    placeholder="Departure"
                    min={departureTime}
                    defaultValue = {arrivalTime}
                    onChange ={(e) => {
                    setArrivalTime(e.target.value)
                    }
                }
                    >
                </input> 

          <button
                className="search-button" 
                onClick={handleClick}
                >
            <i className="search-icon"><FaSearch /></i></button> 
    </div>
        
    )
}

export default FlightSearchForm