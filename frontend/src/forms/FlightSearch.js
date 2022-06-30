import React, {useEffect} from 'react'
import { HiOutlineSwitchHorizontal } from 'react-icons/hi'
import { useState } from 'react';
import { format , parseISO, set} from "date-fns";
import Select from 'react-select';
import FlightsListPage from "../pages/FlightsListPage";



const FlightSearch = () => {
    let[updatedcountryOptions, setupdatedCountryOptions] = useState();
    let[filteredFlights, setFilteredFlights] = useState();

    let[display,setDisplayOption] = useState();


    let[fromSearchOption, setFromSearchOption] = useState(0);
    let[toSearchOption, settoSearchOption] = useState(0);
    let[countryOptions, setCountryOptions] = useState();


    let [departureTime, setDepartureTime] = useState( 
        format(new Date(), "yyyy-MM-dd'T'HH:mm")
        );
    let [arrivalTime, setArrivalTime] = useState(departureTime)


    useEffect(() => { 
        getCountries()
        getfilteredflights()

        }, [fromSearchOption, toSearchOption])


    let getCountries = async () => {

        let response = await fetch(`/backend/countries`)
        let data = await response.json()
        // countryOptions.current =  data.map((country) => ({value:country.id, label:country.country_name}))
        setCountryOptions (data.map((country) => ({value:country.id, label:country.country_name})))

        // console.log(countryOptions.current);

    }

    let getfilteredflights = async () => {
        let searchurl = '/backend/flights/?'
        // console.log(toSearchOption)
        // console.log(fromSearchOption)

       if (fromSearchOption) {searchurl +=`&origin_country=${fromSearchOption}`;}
       if (toSearchOption) {searchurl +=`&destination_country=${toSearchOption}`;}
    
        // console.log(searchurl)
        let response = await fetch(searchurl)
        // let response = await fetch(`/backend/flights/?origin_country=${fromSearchOption}&destination_country=${toSearchOption}`)

        
        // let response = await fetch(`/backend/flights/?origin_country=${fromSearchOption}&destination_country=${toSearchOption}`)
        let data = await response.json()
        // console.log(data)
        setFilteredFlights(data)


    }

    let switchFileds= () => {
        let temp =   fromSearchOption
        setFromSearchOption(toSearchOption)
        settoSearchOption(temp)
        temp = countryOptions.find(({ value }) => value === fromSearchOption)
        console.log(temp);
        setDisplayOption(temp)
    }


    return (
    
        <div className='flightselect'>
            
           <h1>Search For a Flight</h1>

            <Select
                placeholder='From'
                // value={fromSearchOption}
                options = {updatedcountryOptions? updatedcountryOptions : countryOptions}
                isSearchable
                isClearable
                maxMenuHeight = {5}
                Value={display} 
                onChange = {
                (e)=> e? (
                    setFromSearchOption(e.value),
                    setDisplayOption(e)
                    )
                    : setFromSearchOption(0)
                }
                />

                <div className="switch-fields" onClick={() =>{switchFileds()}}>
                    <HiOutlineSwitchHorizontal />  
                </div>

            <Select
                placeholder = "To"
                // cacheOptions
                // value={toSearchOption}
                options = {updatedcountryOptions? updatedcountryOptions : countryOptions}
                maxMenuHeight = {5}
                hideSelectedOptions
                isSearchable
                isClearable
                onChange = {
                (e)=>  e? (
                    settoSearchOption(e.value))
                    : settoSearchOption(0)
                }
                
                />

            <input 
                type='datetime-local'
                required
                id='departure_time'
                className='fancy-select'
                defaultValue={departureTime}
                // onInvalid ={() => {
                //   setDepartureMinTime(departureMinTime)
                
                // }}

                onChange = {(e) => {    
                  setDepartureTime(e.target.value)
                  setArrivalTime(e.target.value)
                }}
                >
                    </input>
                  
            <input 
                type='datetime-local'
                id='arrival_time'
                required
                // onInvalid={() => {setArrivalTime(departureTime)}}
                // onInvalid={() => {time_validation('arrival_time')}}
                
                className='fancy-select'
                min={departureTime}
                defaultValue = {arrivalTime}
                onChange ={(e) => {
                  setArrivalTime(e.target.value)
                }
            }
                >
            </input>

        <FlightsListPage filteredFlights={filteredFlights} />
        </div>
        
    )
}

export default FlightSearch