import Select from 'react-select'
import React, {useEffect, useState} from 'react'


const AirlineForm = (e)=>{
    let [countryOptions, setCountryOptions] = useState()

    let getContries = async () => {
        let response = await fetch(`/backend/countries`)
        let data = await response.json()
        setCountryOptions(data.map((country) => ({value:country.id, label:country.country_name})))
        }

    
    useEffect(() => {getContries()},[])

    return(
        <>
        <input type="text" name="name" placeholder="Airline Name" defaultValue = {e?(e.name):null} required />
            <Select 
                required
                id='origin_country'
                className='fancy-select'
                placeholder = 'Country'
                options ={countryOptions}
                isSearchable = {true}
                defaultValue = {e?(e.country):null}
                isClearable = {true}  />
                
                
                </>
    )
}


export default AirlineForm