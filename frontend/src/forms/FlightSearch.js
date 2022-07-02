import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import {
    DateRange,
  } from "react-date-range";

import React, {useEffect} from 'react'


import { HiOutlineSwitchHorizontal } from 'react-icons/hi'
import { useState } from 'react';
import { format , addDays} from "date-fns";
import Select from 'react-select';
import FlightsListPage from "../pages/FlightsListPage";
import './Form.css'




const FlightSearch = () => {
    let[updatedcountryOptions, setupdatedCountryOptions] = useState();
    let[filteredFlights, setFilteredFlights] = useState();


    const [range, setRange] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
      ])
    

      // open close
      const [open, setOpen] = useState(false)    
    
    
    let[display,setDisplayOption] = useState();

    let[fromSearchOption, setFromSearchOption] = useState(0);
    let[toSearchOption, settoSearchOption] = useState(0);
    
    let[countryOptions, setCountryOptions] = useState();


    // let [departureTime, setDepartureTime] = useState( 
    //     format(new Date(), "yyyy-MM-dd")
    //     );

    let [departureTime, setDepartureTime] = useState();


    // let [arrivalTime, setArrivalTime] = useState(format(new Date(), "yyyy-MM-dd"))
    let [arrivalTime, setArrivalTime] = useState()



    useEffect(() => { 
        getCountries()
        getfilteredflights()

        }, [fromSearchOption, toSearchOption, departureTime, arrivalTime, range[0].startDate, range[0].endDate])


    let getCountries = async () => {

        let response = await fetch(`/backend/countries`)
        let data = await response.json()
        // countryOptions.current =  data.map((country) => ({value:country.id, label:country.country_name}))
        setCountryOptions (data.map((country) => ({value:country.id, label:country.country_name})))

        // console.log(countryOptions.current);

    }

    let getfilteredflights = async () => {
        let searchurl = '/backend/flights/?'
        // consosle.log(departureTime.toUTCString());
        // console.log(range[0].startDate);
        // let formatteddeptime =  format(new Date(range[0].startDate), "yyyy-MM-dd'T'HH:mm")
        // let formattedlandtime =  format(new Date(range[0].endDate), "yyyy-MM-dd'T'HH:mm")
        // if (departureTime){ searchurl += `&from_departure_time=${formatteddeptime}`}
        // if (arrivalTime){searchurl += `&to_arrival_time=${formattedlandtime}`}

        if (departureTime){searchurl += `&to_arrival_time=${format(new Date(departureTime), "yyyy-MM-dd'T'HH:mm")}`}
        if (arrivalTime){searchurl += `&to_arrival_time=${format(new Date(arrivalTime), "yyyy-MM-dd'T'HH:mm")}`}        
        if (fromSearchOption) {searchurl +=`&origin_country=${fromSearchOption}`;}
        if (toSearchOption) {searchurl +=`&destination_country=${toSearchOption}`;}

        console.log(searchurl);
        let response = await fetch(searchurl)
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
                className='countryinputfrom'
                placeholder='From Everywhere'
                options = {countryOptions}
                isSearchable
                isClearable
                maxMenuHeight = {300}
                value={display} 
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
                className='countryinputto'
                placeholder = "To Everywhere"
                // cacheOptions
                // value={toSearchOption}
                options = {countryOptions}
                maxMenuHeight = {300}
                hideSelectedOptions
                isSearchable
                isClearable
                onChange = {
                (e)=>  e? (
                    settoSearchOption(e.value))
                    : settoSearchOption(0)
                }
                
                />
            <h3>Departure Time</h3>
            <input
                label="Departure Time" 
                type='date'
                required
                id='departure_time'
                className='fancy-select'
                defaultValue={departureTime}
                onChange = {(e) => {    
                  setDepartureTime(e.target.value)
                }}
                >
            </input>
            <h3>Arrival Time</h3>
            <input
                label="Arrival Time"  
                type='date'
                id='arrival_time'
                required
                
                className='fancy-select'
                min={departureTime}
                defaultValue = {arrivalTime}
                onChange ={(e) => {
                  setArrivalTime(e.target.value)
                }
            }
                >
            </input> 
            {/* <h3>Flight Dates</h3>
            <input 
                className = "dateinput"
                value={`${format(range[0].startDate, "dd/MM/yyyy")}  -  ${format(range[0].endDate, "dd/MM/yyyy")}`}
                readOnly
                onClick={ () => setOpen(open => !open) }
             /> */}

                <div>
            {open && 
            <DateRange
                onChange={
                    item => setRange([item.selection])
                }
                editableDateInputs={false}
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={2}
                direction="horizontal"
                className="calendarElement"
                showDateDisplay = {false}
                />
            }
      </div>

        <FlightsListPage filteredFlights={filteredFlights} />
        </div>
        
    )
}

export default FlightSearch