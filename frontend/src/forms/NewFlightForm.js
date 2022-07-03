
import Select from 'react-select'
import React, {useEffect, useState} from 'react'
import { format , parseISO} from "date-fns";


const NewFlightForm = (flightData)=>{

    let l = null
    let d = null
    let [countryOptions, setCountryOptions] = useState()
    flightData = flightData.flightData
    let set = null
    if (flightData!==undefined){
        set = true
        d = new Date(flightData.departure_time)
        //console.log('d at start', d)
        // var now_utc = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(),
        // d.getUTCDate(), d.getUTCHours(),
        // d.getUTCMinutes(), d.getUTCSeconds());
        //console.log('trying utc', new Date(now_utc));
        // console.log('trying d as ISOString', d.toISOString());
        // console.log('trying utc', d.toISOString().replace('T', ' ').slice(0, 16));

        //d = d.toISOString().replace('T', ' ')
        //console.log('trying utc', d.slice(0, 14));
        //d = new Date (flightData.departure_time)
        //d.setHours(d.getHours()-3)
        l = new Date (flightData.landing_time)
        // l.setHours(l.getHours()-3)
        // console.log('this if format type:', typeof format(l, "yyyy-MM-dd' 'HH:mm"))
        // console.log('this if format:', format(l, "yyyy-MM-dd' 'HH:mm"))
        //console.log((format(d.toUTCString(), "yyyy-MM-dd' 'HH:mm")))
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
                defaultValue ={set?flightData.remaining_tickets:1}
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
                defaultValue={set?(d.toISOString().replace('T', ' ').slice(0, 16)):(format(new Date(), "yyyy-MM-dd' 'HH:mm"))}
                min={(format(new Date(), "yyyy-MM-dd' 'HH:mm"))}
                />
            <h5>Arrival</h5>
            
            <input 
                type='datetime-local'
                id='landing_time'
                required
                className='fancy-select'
                min={(format(new Date(), "yyyy-MM-dd' 'HH:mm"))}
                defaultValue = {set?(l.toISOString().replace('T', ' ').slice(0, 16)):(format(new Date(), "yyyy-MM-dd' 'HH:mm"))}
                />
            

                </>
    )
}


export default NewFlightForm