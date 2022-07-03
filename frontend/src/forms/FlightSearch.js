import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import {
    DateRange,
  } from "react-date-range";

import React, {useEffect} from 'react'

import { HiOutlineSwitchHorizontal } from 'react-icons/hi'
import { useState } from 'react';
import { format , addDays} from "date-fns";
import Select  from 'react-select';
import AsyncSelect from 'react-select/async';
import FlightsListPage from "../pages/FlightsListPage";
import { useNavigate , useLocation } from "react-router-dom"
import './Form.css'




const FlightSearch = () => {
    let navigate = useNavigate();
    let[filteredFlights, setFilteredFlights] = useState();

    // console.log(menuIsOpen);

    const [range, setRange] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
      ])
    
    
    let[display,setDisplayOption] = useState();
    let[fromSearchOption, setFromSearchOption] = useState(0);
    let[toSearchOption, settoSearchOption] = useState(0);
    
    let[countryOptions, setCountryOptions] = useState();

    let [departureTime, setDepartureTime] = useState();


    // let [arrivalTime, setArrivalTime] = useState(format(new Date(), "yyyy-MM-dd"))
    let [arrivalTime, setArrivalTime] = useState()



    useEffect(() => { 
        // getCountries()
        getfilteredflights()

        // }, [fromSearchOption, toSearchOption, departureTime, arrivalTime, range[0].startDate, range[0].endDate])
    }, [departureTime, arrivalTime, fromSearchOption , toSearchOption])



    let getCountries = async (searchTerm) => {

        // console.log(searchTerm);

        let response = await fetch(`/backend/api/country/?search=${searchTerm}`)

        // let response = await fetch(`/backend/countries`)
        let data = await response.json()
        // countryOptions.current =  data.map((country) => ({value:country.id, label:country.country_name}))
        return data?.map((country) => ({value:country.id, label:country.country_name}))


        // setCountryOptions (data?.map((country) => ({value:country.id, label:country.country_name})))

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



        if (departureTime){searchurl += `&from_departure_time=${format(new Date(departureTime), "yyyy-MM-dd'T'HH:mm")}`}
        if (arrivalTime){searchurl += `&to_arrival_time=${format(new Date(arrivalTime), "yyyy-MM-dd'T'HH:mm")}`}        
        if (fromSearchOption) {searchurl +=`&origin_country=${fromSearchOption}`;}
        if (toSearchOption) {searchurl +=`&destination_country=${toSearchOption}`;}

        let response = await fetch(searchurl)
        let data = await response.json()
        // console.log(data)
        // return(data)
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
            <AsyncSelect
                 
                className='countryinputfrom'
                placeholder='From Everywhere'
                cacheOptions
                // options = {getCountries}
                loadOptions = {getCountries}
                isSearchable
                isClearable
                maxMenuHeight = {300}
                // value={display}
                onInputChange = {(e) => {getCountries(e)}} 
                onChange = {
                (e)=> e? (
                    setFromSearchOption(e.value)
                    )
                    : setFromSearchOption(0)
                }

                // onChange = {
                // (e)=> e? (
                //     setFromSearchOption(e.value),
                //     setDisplayOption(e)
                //     )
                //     : setFromSearchOption(0)
                // }
                />

                <div className="switch-fields" onClick={() =>{switchFileds()}}>
                    <HiOutlineSwitchHorizontal />  
                </div>

            <AsyncSelect

                className='countryinputto'
                placeholder = "To Everywhere"
                cacheOptions
                // value={toSearchOption}
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

                {/* <div> */}
            {/* {open && 
            // <DateRange
            //     onChange={
            //         item => setRange([item.selection])
            //     }
            //     editableDateInputs={false}
            //     moveRangeOnFirstSelection={false}
            //     ranges={range}
            //     months={2}
            //     direction="horizontal"
            //     className="calendarElement"
            //     showDateDisplay = {false}
            //     />
            } */}
      {/* </div> */}
        <button 
            label="Search Flight" 
            onClick={() => {
                // let filtered = getfilteredflights()
                navigate("/flights/", { state: {filteredFlights: filteredFlights 
                }})}}
        >"Search Flight"</button>



        {/* <FlightsListPage filteredFlights={filteredFlights} /> */}
    </div>
        
    )
}

export default FlightSearch