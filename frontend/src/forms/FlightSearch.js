// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file

import {
    DateRange,
  } from "react-date-range";
import './Form.css'
import React, {useEffect} from 'react'

import { HiOutlineSwitchHorizontal } from 'react-icons/hi'
import { FaSearch } from "react-icons/fa";


import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useNavigate , useLocation } from "react-router-dom"

import { FilteredFlightsMethod, FilteredCountryMethod} from "../methods/FilterMethods"
import { ReactComponent as flightIcon } from "../assets/flight.svg"





const FlightSearch = () => {

    let navigate = useNavigate();
    let[filteredFlights, setFilteredFlights] = useState();

    // const [range, setRange] = useState([
    //     {
    //       startDate: new Date(),
    //       endDate: addDays(new Date(), 7),
    //       key: 'selection'
    //     }
    //   ])
    
    let[fromSearchOption, setFromSearchOption] = useState(0);
    let[toSearchOption, settoSearchOption] = useState(0);
    let [departureTime, setDepartureTime] = useState();
    let [arrivalTime, setArrivalTime] = useState()



    useEffect(() => { 
        getfilteredflights()

    }, [departureTime, arrivalTime, fromSearchOption , toSearchOption])

    let getfilteredflights = async () => {
        let filtered = await FilteredFlightsMethod(
            {departureTime: departureTime,
            arrivalTime: arrivalTime,
            fromSearchOption:fromSearchOption,
            toSearchOption:toSearchOption}
            );

        // console.log(filtered);
        setFilteredFlights(filtered);
    }


    let getCountries = async (searchTerm) => {
        let filtered = await FilteredCountryMethod(searchTerm) 
        return filtered?.map((country) => ({value:country.id, label:country.country_name}))
    }


    // let switchFileds= () => {
    //     let temp =   fromSearchOption
    //     setFromSearchOption(toSearchOption)
    //     settoSearchOption(temp)
    //     temp = countryOptions.find(({ value }) => value === fromSearchOption)
    //     console.log(temp);
    //     setDisplayOption(temp)
    // }



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
{/* <input placeholder="Date" class="textbox-n" type= {inpType} onfocus= {setInpType}  onblur= {setInpType('text')} id="date" /> */}
                <input
                    className='date-input'
                    placeholder="Landing"
                    label="Departure Time" 
                    type='date'
                    // id='departure_time'
                    
                    defaultValue={departureTime}
                    onChange = {(e) => {    
                    setDepartureTime(e.target.value)
                    }}
                    >

                </input>

                <input
                    label="Arrival Time"  
                    type='date'
                    placeholder="Departure"
                    // id='arrival_time'
                    className='date-input'
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
                onClick={() => {
                    navigate("/flights/", { state: {filteredFlights: filteredFlights 
                    }})}}
            ><i className="search-icon"><FaSearch /></i></button> 
    </div>
        
    )
}

export default FlightSearch