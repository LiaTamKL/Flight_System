// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file

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
import { FilteredFlightsMethod, FilteredCountryMethod} from "../methods/FilterMethods"



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
    // let[countryOptions, setCountryOptions] = useState();
    let [departureTime, setDepartureTime] = useState();
    // let [arrivalTime, setArrivalTime] = useState(format(new Date(), "yyyy-MM-dd"))
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

                {/* <div className="switch-fields" onClick={() =>{switchFileds()}}>
                    <HiOutlineSwitchHorizontal />  
                </div> */}

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