import Select from 'react-select'
import React, {useEffect, useState, useRef} from 'react'


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

        let response = await fetch(`/backend/countries`)
        let data = await response.json()
        if (response.status===200){
            setCountryOptions(data.map((country) => ({value:country.id, label:country.country_name})))
        }}    
    useEffect(() => {getContries()},[])


    return(
        <>
        <input type="text" name="name" placeholder="Airline Name" defaultValue = {set?(userData.name):null} required />
            <Select 
                required
                name='country'
                id='country'
                className='fancy-select'
                options ={countryOptions}
                isSearchable = {true}
                placeholder={set?`Please pick a country, your original one is ${userData.country}`:`Please pick a country`}
                isClearable = {true}  />
                
                
                </>
    )
}


export default AirlineForm