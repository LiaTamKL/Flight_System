import React, { useState , useEffect, useContext } from 'react'
import { format , parseISO, set} from "date-fns";
import {useNavigate, useLocation} from "react-router-dom";
import './Form.css'
import Select from 'react-select'
import { CreateMyFlight, UpdateMyFlight } from '../methods/AirlineMethods';
import FormHeader from '../components/FormHeader'
import { useRef } from 'react';
import AuthContext from '../context/authentication';



const CreateFlightFormAirline = () => {
  let nav = useNavigate()
  let flight = useLocation()
  let {user, authToken} = useContext(AuthContext)

  //Checks if it comes from update page , sets true if it does
  let update = true
  let flightstate = flight.state? flight.state.flightobj : update = false

  let [originCountry, setOriginCountry] = useState('')
  let [destinationCountry, setDestinationCountry] = useState('')
  let [tickets, setTickets] = useState(update? flightstate.remaining_tickets: 1)

  let [departureTime, setDepartureTime] = useState( 
    update? 
    format(new Date(flightstate.departure_time), "yyyy-MM-dd'T'HH:mm") :
    format(new Date(), "yyyy-MM-dd'T'HH:mm")
    );


  let [arrivalTime, setArrivalTime] = useState(
    update? 
    format(new Date(flightstate.landing_time), "yyyy-MM-dd'T'HH:mm") :
    departureTime
  ) 

  let [departureMinTime, setDepartureMinTime] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm")) ;


  const incflight = useRef(flightstate)

  const countryOptions = useRef("")
  const defaultCountryOriginOption = useRef("")
  const defaultCountryDestOption = useRef("")

  const CheckCountryValidation = ()=>{
    if (originCountry===destinationCountry){
        return false
    }
    else{return true}
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (originCountry===undefined || destinationCountry ===undefined){
        alert('Please fill in the origin and destination countries')
    }
    else{
    if (CheckCountryValidation()===false){
        alert('Origin and destination countries cannot be the same!')
    }
    else{
    let airline = user.user_id
    let data = {airline, originCountry , destinationCountry , departureTime , arrivalTime, tickets}
    let result = await UpdateMyFlight(data, authToken)
    console.log(result.data)
    if (result.status===200){
        nav('/airline')
    }
    else{
        alert(result.data)
    }}}
}




useEffect(() => {
  
   getCountries()
  }, [])

  let getCountries = async () => {
    let response = await fetch(`/backend/countries`)
    let data = await response.json()

    countryOptions.current =  data.map((country) => ({value:country.id, label:country.country_name}))

    if (update) { defaultCountryOriginOption.current = countryOptions.current.find(({ label }) => label === incflight.current?.origin_country)}
    else{defaultCountryOriginOption.current = [{value: "", label: ""}]}
    setOriginCountry(defaultCountryOriginOption.current.value)

    if (update) {defaultCountryDestOption.current = countryOptions.current.find(({ label }) => label === incflight.current?.destination_country)}
    else{defaultCountryDestOption.current = [{value: "", label: ""}]}
    setDestinationCountry(defaultCountryDestOption.current.value) 
    
  }




  let time_validation = (type, error_id) =>{
    let valid = document.getElementById(type);
    if (!valid.checkValidity()) {
     let validation_mes =  `Please select a value that is no earlier than ${format(parseISO(departureTime),  "dd/MM/yyyy HH:mm")}.`
      document.getElementById(error_id).innerHTML = validation_mes;
    }
    else
    {document.getElementById(error_id).innerHTML = "";}
  }




  return (
    <div className='create'>
      <FormHeader headercheck = {flightstate} />

        <form id='app_form'  onSubmit={(e) => handleSubmit(e)} >
            <label>New Flight by {user.username}</label>
        

            <label>Origin Country</label>
            <Select 
                required
                id='origin_country'
                className='fancy-select'
                isSearchable
                isClearable
                placeholder = {defaultCountryOriginOption.current.label}
                options ={countryOptions.current}               
                onChange={(e) => {
                  e? setOriginCountry(e.value):
                  setOriginCountry(defaultCountryOriginOption.current.value)
                }}


              />

            <label>Destination Country</label>
            <Select 
                required
                id='dest_country'
                className='fancy-select'
                isSearchable
                isClearable 
                placeholder = {defaultCountryDestOption.current.label}
                options ={countryOptions.current}
                onChange ={(e) => {
                   e? setDestinationCountry(e.value):
                   setDestinationCountry(defaultCountryDestOption.current.value)
                }}
                

              />

            <label>Departure Time</label>
            <input 
                type='datetime-local'
                required
                id='departure_time'
                className='fancy-select'
                defaultValue={departureTime}
                min={departureMinTime}
                onChange = {(e) => {    
                  time_validation('departure_time', 'errormes_dep')
                  setDepartureTime(e.target.value)
                  setArrivalTime(e.target.value)
                  console.log(update);
                }}
                >
                  
                </input>
                <span id='errormes_dep'></span>


            <label>Arrival Time</label>
            <input 
                type='datetime-local'
                id='arrival_time'
                required
                className='fancy-select'
                min={departureTime}
                defaultValue = {arrivalTime}
                onChange ={(e) => {
                  time_validation('arrival_time', 'errormes_arr')
                  setArrivalTime(e.target.value)
                }
            }
                >

            </input>
            
          <span id='errormes_arr'></span>
                
            <label>Number Of Tickets</label>
            <input
                required
                id='tickes'
                defaultValue ={tickets}
                type='number'
                step="1"
                min="1"
                onChange={(e) => setTickets(e.target.value)}
                >

                </input>
                <input type='submit'></input>
        </form>
        
    </div>
   
   
  
  )

}

export default CreateFlightFormAirline