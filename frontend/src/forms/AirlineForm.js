import Select from 'react-select'
import React, {useEffect, useState} from 'react'


const AirlineForm = (userInfo)=>{
    let [countryOptions, setCountryOptions] = useState()
    let userInfomation = null
    let [countrydefault, setCountryDefault] = useState()

    console.log('IM IN THE AIR FORM')
    console.log(userInfo['userInfo']=== undefined)
    console.log(userInfo['userInfo']!== undefined)

    if (userInfo['userInfo']!== undefined){
        console.log(userInfomation)
        userInfomation = userInfo['userInfo']
        console.log('userInfomation at start:', userInfomation)

    }

    let getContries = async () => {

        let response = await fetch(`/backend/countries`)
        let data = await response.json()
        if (response.status===200){
            setCountryOptions(data.map((country) => ({value:country.id, label:country.country_name})))
    }
        }

    if ( countryOptions && userInfomation){
            let g = userInfomation.country
            console.log('what is g?', g)
            setCountryDefault(g)
            setCountryDefault(countryOptions.find(element => element['label']===g))
            console.log('whats country default?', countrydefault)
    
        }
        
    
    useEffect(() => {getContries()},[])

    // if ( countryOptions && userInfomation){
    //     let g = userInfomation.country
    //     setCountryDefault(countryOptions.find(element => element['label']===g))
    //     console.log(countrydefault)

    // }
    return(
        <>
        <input type="text" name="name" placeholder="Airline Name" defaultValue = {userInfomation?(userInfomation.name):null} required />
            <Select 
                required
                name='country'
                id='country'
                className='fancy-select'
                placeholder = {countrydefault?(countrydefault):'Country'}
                options ={countryOptions}
                isSearchable = {true}
                defaultValue ={countrydefault?(countrydefault):null}
                //defaultValue = {countrydefault?({label:countrydefault['label']}):null}
                isClearable = {true}  />
                
                
                </>
    )
}


export default AirlineForm