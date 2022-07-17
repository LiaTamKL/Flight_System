import Select from 'react-select'
import React, {useEffect, useState} from 'react'
import { AllCountries } from '../methods/CountriesMethods'

const AirlineForm = (userData)=>{
    let [countryOptions, setCountryOptions] = useState()
    userData = userData.userData
    let set = null
    //var v = {label:'UK'}
    if (userData!==undefined){
        set = true
        // var country = userData.country
        // console.log(typeof country)
        // console.log(country)
        // var uk = 'UK'
        // console.log(typeof uk)
        // var v = {label:country}
    }
    //let defaultcountry = useRef(set?userData.country:null)
    //let [defcountry, setDefCountry] = useState(set?userData.country:'UK')
    //defaultcountry.current = userData.country
    let getContries = async () => {

        let data = await AllCountries()
        if (data){
            setCountryOptions(data.map((country) => ({value:country.id, label:country.country_name})))        
        }}    
    useEffect(() => {getContries()},[])


    return(
        <>
        <input className='form-input' type="text" name="name" placeholder="  Airline Name" defaultValue = {set?(userData.name):null} required />
            <Select 
                required
                name='country'
                // id='country'
                className='select-dropdown'
                options ={countryOptions}
                isSearchable
                placeholder={<div className="select-dropdown-placeholder"> {set?`Please pick a country, your original one is ${userData.country}`:`Please pick a country`}</div> }
                isClearable
                 />
                
                
                </>
    )
}


export default AirlineForm