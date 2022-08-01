
import Select from 'react-select'
import React, {useEffect, useState} from 'react'
import { format} from "date-fns";
import { AllCountries } from '../methods/CountriesMethods';

const NewFlightForm = (flightData)=>{
    let l = null
    let d = null
    flightData = flightData.flightData
    let [countryOptions, setCountryOptions] = useState()
    let set = null
    if (flightData!==undefined){
        set = true
        d = new Date(flightData.departure_time)

        l = new Date (flightData.landing_time)

    }

    /**
    * Gets all countries and sets them up for react select
    */
    let getContries = async () => {
        let country_data = await AllCountries()
        if (country_data){

            setCountryOptions(country_data.map((country) => ({value:country.id, label:country.country_name})))        
        
        
        }}    
    useEffect(() => {getContries()},[])

    return(
        <>
            <Select
                required
                name='origin_country'
                id='origin_country'
                className='select-dropdown'
                options ={countryOptions}
                isSearchable
                placeholder={<div className="select-dropdown-placeholder">{set?`Please pick an origin country, your original one is ${flightData?.origin_country}`:`Origin country`}</div>}
                isClearable 
                />
            <Select
                required
                name='destination_country'
                id='destination_country'
                className='select-dropdown'
                options ={countryOptions}
                isSearchable
                placeholder={<div className="select-dropdown-placeholder">{set?`Please pick an destination country, your original one is ${flightData.destination_country}`:`Destination country`}</div>}
                isClearable />

            <h5 className='new-flight-label'>Departure</h5>
            <input
                type='datetime-local'
                required
                id='departure_time'
                className='form-input-datetime'
                defaultValue={set?(d.toISOString().replace('T', ' ').slice(0, 16)):(format(new Date(), "yyyy-MM-dd' 'HH:mm"))}
                min={(format(new Date(), "yyyy-MM-dd' 'HH:mm"))}
                />
            <h5 className='new-flight-label' >Arrival</h5>

            <input
                type='datetime-local'
                id='landing_time'
                required
                className='form-input-datetime'
                min={(format(new Date(), "yyyy-MM-dd' 'HH:mm"))}
                defaultValue = {set?(l.toISOString().replace('T', ' ').slice(0, 16)):(format(new Date(), "yyyy-MM-dd' 'HH:mm"))}
                />
            <h5 className='new-flight-label'>Ticket Number</h5>
            <input
                className='form-input-number'
                required
                id='tickets'
                defaultValue ={set?flightData.remaining_tickets:1}
                type='number'
                step="1"
                min="0"
                />


                </>
    )
}


export default NewFlightForm