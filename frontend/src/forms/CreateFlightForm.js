import React, { useState , useEffect, useCallback ,useMemo } from 'react'
import { format , parseISO, set} from "date-fns";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import './Form.css'
import Select from 'react-select'
import { CreateFlight, UpdateFlight} from '../methods/FlightMethods'
import FormHeader from '../components/FormHeader'
import { useRef } from 'react';


// import {ReactComponent as Addflighticon } from '../assets/flight.svg';


const CreateFlightForm = () => {
  let navigate = useNavigate()
  let flight = useLocation()

  //Checks if it comes from update page , sets true if it does
  let update = true
  let flightstate = flight.state? flight.state.flightobj : update = false

  // console.log("before" + flightstate.departure_time);

  let [airline, setAirline] = useState("")
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


  const airlineOptions = useRef("");
  // const incflight = useRef(flight.state? flight.state.flightobj : null)
  const incflight = useRef(flightstate)

  const defaultAirlineOption = useRef("")
  const countryOptions = useRef("")
  const defaultCountryOriginOption = useRef("")
  const defaultCountryDestOption = useRef("")
  // console.log(incflight.current.destination_country)



  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {airline, originCountry , destinationCountry , departureTime , arrivalTime, tickets}
    console.log(data)
    // flightstate ? CreateFlight(data) : UpdateFlight(flightstate.id , data)
    navigate("/flights")
}


// const test = useCallback(() => {
//   getAirlines()
//   getContries()
// }, []);


useEffect(() => {
  
  // console.log(airlineOptions.current);
  // getFlight()
   getAirlines()
   getCountries()
  //  defaultval()
  //  setDepartureMinTime(departureTime)
  }, [])

  let getAirlines = async () => {
    let response = await fetch(`/backend/airlines`)
    let data = await response.json() 
    // airlineOptions.current = data

    airlineOptions.current =  data.map((airline) => ({value:airline.id, label:airline.name}))

    if (update) {defaultAirlineOption.current = airlineOptions.current.find(({ label }) => label === incflight.current?.airline)}
    else{defaultAirlineOption.current = [{value: "", label: ""}]}

    // console.log(defaultAirlineOption.current);
    setAirline(defaultAirlineOption.current.value)
        
    }

 


  let getCountries = async () => {
    let response = await fetch(`/backend/countries`)
    let data = await response.json()

    countryOptions.current =  data.map((country) => ({value:country.id, label:country.country_name}))
    // console.log(defaultCountryOriginOption);


    if (update) { defaultCountryOriginOption.current = countryOptions.current.find(({ label }) => label === incflight.current?.origin_country)}
    else{defaultCountryOriginOption.current = [{value: "", label: ""}]}
    setOriginCountry(defaultCountryOriginOption.current.value)

    if (update) {defaultCountryDestOption.current = countryOptions.current.find(({ label }) => label === incflight.current?.destination_country)}
    else{defaultCountryDestOption.current = [{value: "", label: ""}]}
    setDestinationCountry(defaultCountryDestOption.current.value) 

    // setCountryOptions(data.map((country) => ({value:country.id, label:country.country_name})))
    
  }

// let getContries = async () => {
//   let response = await fetch(`/backend/countries`)
//   let data = await response.json()


//   setCountryOptions(data.map((country) => ({value:country.id, label:country.country_name})))
    
//   }


  // let validate_empty = (field_type, e) =>{
  //   let element1 = document.getElementById(field_type);
  //   console.log(element1);
  //   if (!e) {element1.target.setCustomValidity("This Field Cannot Be Empty")
  //   }else {element1.target.setCustomValidity("")}
    

  // }



// let error_msg = () => {
// console.log("errror");
// return (
//   <span  style={{
//     fontWeight: 'bold',
//       color: 'red',
//         }}>This Field cannot be empty</span>
// )
// }



  let time_validation = (type, error_id) =>{
    let valid = document.getElementById(type);
    if (!valid.checkValidity()) {
      // valid.setCustomValidity(`Please select a value that is no earlier than ${format(parseISO(departureTime),  "dd/MM/yyyy HH:mm")}.`)
     let validation_mes =  `Please select a value that is no earlier than ${format(parseISO(departureTime),  "dd/MM/yyyy HH:mm")}.`
      document.getElementById(error_id).innerHTML = validation_mes;
    }
    else
    // console.log("im here");
    // valid.setCustomValidity('')
    {document.getElementById(error_id).innerHTML = "";}
  }


// const optionstemp=
//   [ {
//     "value": test.current.value,
//     "label": test.current.label
//   }]



  return (
    <div className='create'>
      <FormHeader headercheck = {flightstate} />
    {/* <h2>Create New Flight</h2> */}

        <form id='app_form'  onSubmit={(e) => handleSubmit(e)} >
            <label>Airline</label>
            {/* <div className='fancy-select'> */}
              
              <Select 
                required
                id='airline'
                isClearable
                placeholder = {defaultAirlineOption.current.label}
                options = {airlineOptions.current}
                className='fancy-select'
                isSearchable
                // getOptionLabel={e => (
                //   <div style={{ display: 'flex', alignItems: 'center' }}>
                //     {<Addflighticon />}
                //     <span style={
                //       { marginLeft: 1}
                      
                //       }>{e.name}</span>
                //   </div>
                // )}or_msg()}
                // onlaod = {validate_empty('airline', null)}
                // isMulti  = {true}

                // onChange ={(e) => {
                //   if(e) setAirline(e.value)
                // }}                
                onChange ={(e) => {
                  e? setAirline(e.value): 
                  setAirline(defaultAirlineOption.current.value)
                }}
                
                  // More props
                //https://react-selecet.com/props#select-props
              />
        

            <label>Origin Country</label>
            <Select 
                required
                id='origin_country'
                className='fancy-select'
                isSearchable
                isClearable
                placeholder = {defaultCountryOriginOption.current.label}
                options ={countryOptions.current}               
                // defaultValue = {originCountry}
                

                // isMulti  = {true}
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
                // defaultValue = {destinationCountry}
                // isMulti  = {true}
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
                // onInvalid ={() => {
                //   setDepartureMinTime(departureMinTime)
                
                // }}

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
                // onInvalid={() => {setArrivalTime(departureTime)}}
                // onInvalid={() => {time_validation('arrival_time')}}
                
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
          {/* <button type='submit'>Add Flight</button> */}
            {/* {!isPending &&  */}
            {/* {isPending && <button type='submit' disabled>Adding Flight....</button>} */}


        </form>
        
    </div>
   
   
  
  )

}

export default CreateFlightForm