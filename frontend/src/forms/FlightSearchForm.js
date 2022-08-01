
import './Form.css'
import React, {useEffect ,useCallback, useRef} from 'react'
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useNavigate } from "react-router-dom"
import { FilteredCountryMethod } from "../methods/FilterMethods"
import { format } from "date-fns";
import DateRangePicker from '../components/SearchComponents/DatePicker/DateRangePicker';
import CountrySelectAsync from '../components/SearchComponents/CountrySelectAsync';


const FlightSearchForm = () => {

    let navigate = useNavigate();    
    let[fromSearchOption, setFromSearchOption] = useState(0);
    let[toSearchOption, settoSearchOption] = useState(0);
    // let [departureTime, setDepartureTime] = useState("");
    // let [arrivalTime, setArrivalTime] = useState("")
    let departureTime = useRef("")   
    let arrivalTime = useRef("")  


    //Prevents child refresh on date entery , 
    //fix for calendar flicker on data entery    
    let updateDates = useCallback((dates) => {
    dates[0]? departureTime.current = format(new Date(dates[0]), "yyyy-MM-dd") :departureTime.current = ""
    dates[1]? arrivalTime.current = format(new Date(dates[1]), "yyyy-MM-dd")  : arrivalTime.current = ""
      }, []);


    let handleClick = () => {
        let flightSearchParams = 
        {
            'fromSearchOption':fromSearchOption, 
            'toSearchOption':toSearchOption,
            departureTime:departureTime.current, 
            arrivalTime:arrivalTime.current
        }

        navigate("/flights/",  { state: {  flightSearchParams: flightSearchParams }} )                     
    }


    let getCountries = async (searchTerm) => {
        let filtered = await FilteredCountryMethod(searchTerm) 
        return filtered?.map((country) => ({value:country.id, label:country.country_name}))
    }

    return ( 
        <form className="search-container">

            <CountrySelectAsync 
                placeHolderLabel="&#x1F6EA; From?" 
                getCountries = {getCountries}
                setSearchOption = {setFromSearchOption}
             />

            <CountrySelectAsync 
                placeHolderLabel="&#x1F6EA; To?" 
                getCountries = {getCountries}
                setSearchOption = {settoSearchOption}
             />
             
            <DateRangePicker  updateDates= { updateDates }/>

          <button
                className="search-button" 
                onClick={handleClick}
                >
            <i className="search-icon"><FaSearch /></i></button> 
    </form>
        
    )
}

export default FlightSearchForm

              
// <input

// className='date-input'
// placeholder="Departure Time"
// label="Departure Time" 
// type='date'                    
// min={today}
// onKeyDown={(e) => e.preventDefault()} /* prevents user keyboard input */
// onChange = {(e) => {
// e.target.value?
// setDepartureTime(e.target.value):
// (setDepartureTime(today))
// }}           
// >
// </input>

// <input
// className='date-input'
// label="Arrival Time"  
// type='date'
// placeholder="Departure"
// min={departureTime? departureTime : today}
// onKeyDown={(e) => e.preventDefault()}  /* prevents user keyboard input */
// onChange ={(e) => {
// setArrivalTime(e.target.value)
// }
// }
// >
// </input> 




// <AsyncSelect 
//     className='country-input'
//     classNamePrefix='country-input'
//     components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
//     noOptionsMessage={() => null}
//     placeholder="&#x1F6EA; From?" 
//     cacheOptions
//     loadOptions = {getCountries}
//     isSearchable
//     isClearable
//     maxMenuHeight = {300}
//     onInputChange = {(e) => {getCountries(e)}} 
//     onChange = {
//     (e)=> e? 
//         setFromSearchOption(e.value)
//         : setFromSearchOption(0)
//     }/>


// <AsyncSelect

//     className='country-input'
//     classNamePrefix='country-input'
//     components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
//     noOptionsMessage={() => null}
//     placeholder = "&#x1F6EA; To?"
//     cacheOptions
//     loadOptions = {getCountries}
//     maxMenuHeight = {300}
//     onInputChange = {(e) => {getCountries(e)}} 
//     isSearchable
//     isClearable
//     onChange = {
//     (e)=>  e? (
//         settoSearchOption(e.value))
//         : settoSearchOption(0)
//     }
//     />
