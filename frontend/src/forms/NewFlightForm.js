
import Select from 'react-select'
import React, {useEffect, useState, useRef} from 'react'
import { format , parseISO, set} from "date-fns";


const NewFlightForm = (flightData)=>{


    let [countryOptions, setCountryOptions] = useState()
    flightData = flightData.flightData
    let set = null
    if (flightData!==undefined){
        set = true
    }


    let getContries = async () => {

        let response = await fetch(`/backend/countries`)
        let data = await response.json()
        if (response.status===200){
            //CHANGE THIS IN THE FINAL VERSION
            setCountryOptions(data.map((country) => ({value:country.id, label:(<><span>{country.country_name}  </span><img src={window.location.origin +country.flag} height="15px" width="20px"/></>)})))        
        
        
        }}    
    useEffect(() => {getContries()},[])


    return(
        <>
            <Select 
                required
                name='origin_country'
                id='origin_country'
                className='fancy-select'
                options ={countryOptions}
                isSearchable = {true}
                placeholder={set?`Please pick an origin country, your original one is ${flightData.origin_country}`:`Please pick an origin country`}
                isClearable = {true}  />
            <Select 
                required
                name='destination_country'
                id='destination_country'
                className='fancy-select'
                options ={countryOptions}
                isSearchable = {true}
                placeholder={set?`Please pick an destination country, your original one is ${flightData.destination_country}`:`Please pick an destination country`}
                isClearable = {true}  />        

            <h5>Number of Tickets: </h5>
            <input
                required
                id='tickets'
                defaultValue ={set?flightData.tickets:1}
                type='number'
                step="1"
                min="0"
                />
            
            <h5>Departure</h5>
            <input 
                type='datetime-local'
                required
                id='departure_time'
                className='fancy-select'
                defaultValue={set?(format(flightData.departure_time, "yyyy-MM-dd' 'HH:mm")):(format(new Date(), "yyyy-MM-dd' 'HH:mm"))}
                min={(format(new Date(), "yyyy-MM-dd' 'HH:mm"))}
                />
            <h5>Arrival</h5>
            
            <input 
                type='datetime-local'
                id='landing_time'
                required
                className='fancy-select'
                min={(format(new Date(), "yyyy-MM-dd' 'HH:mm"))}
                defaultValue = {set?(format(flightData.landing_time, "yyyy-MM-dd' 'HH:mm")):(format(new Date(), "yyyy-MM-dd' 'HH:mm"))}
                />
            

                </>
    )
}


export default NewFlightForm