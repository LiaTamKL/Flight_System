import React, { useState , useEffect, useCallback } from 'react'
import { format , parseISO} from "date-fns";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import './Form.css'
import Select from 'react-select'
import { CreateFlight} from '../methods/FlightMethods'
import FormHeader from '../components/FormHeader'
// import {ReactComponent as Addflighticon } from '../assets/flight.svg';



const CreateFlightForm = () => {
  let  flight = useLocation();
  if (flight.state) {flight = flight.state.flightobj}
//  flight.state? {console.log("hey");} 

  // console.log(flight);

  let [airlineOptions, setAirlineOptions] = useState()
  let [countryOptions, setCountryOptions] = useState()


  let navigate = useNavigate();
  // let  [counter, setCounter] = useState(0)
  // let [inopt, setIncopt] = useState(airlineOptions.find(e => e.label === flight.airline)) 
  let [airline, setAirline] = useState()
  let [originCountry, setOriginCountry] = useState('')
  let [destinationCountry, setDestinationCountry] = useState('')
  let [tickets, setTickets] = useState(1)
 

  let [departureTime, setDepartureTime] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm")) ;
  let [arrivalTime, setArrivalTime] = useState(departureTime) 
  let [departureMinTime, setDepartureMinTime] = useState() ;


  
  // console.log(airline);
  // console.log(airlineOptions.find(e => e.label === flight.airline))

  // console.log(countryOptions.find(e => e.label === flight.destination_country))

  // let [isPending, setisPending] = useState(false)
  // let [errorMessage, setErrorMessage] = useState('')


  const handleSubmit = (e) => {
    // e.preventDefault();
    let data = {airline, originCountry , destinationCountry , departureTime , arrivalTime, tickets}
    console.log(data)
    // CreateFlight(data)
    // navigate("/flights")

}


// const test = useCallback(() => {
//   getAirlines()
//   getContries()
// }, []);


useEffect(() => {
  // pul data from the backend only once
  // if (counter < 1){
    // getAirlines()
    getAirlines()
    getContries()
    setDepartureMinTime(departureTime)
    // navigate(`\=${airlineOptions}`)
    
  // }
  // setCounter(counter + 1)
  }, [departureTime])


  useEffect(() => {
    
    window.sessionStorage.setItem("airlineOptions", airlineOptions)

  },[airlineOptions])

let getAirlines = async () => {
  let response = await fetch(`/backend/airlines`)
  let data = await response.json()
  console.log(data);
  setAirlineOptions(data.map((airline) => ({value:airline.id, label:airline.name})))

  
  }

let getContries = async () => {
  let response = await fetch(`/backend/countries`)
  let data = await response.json()
  setCountryOptions(data.map((country) => ({value:country.id, label:country.country_name})))
    
  }


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
     let validation_mes =  `Please select a value that is no earlier than ${format(parseISO(departureTime),  "dd/MM/yyyy HH:mm")}.`
      document.getElementById(error_id).innerHTML = validation_mes;
    }
    else
    {document.getElementById(error_id).innerHTML = "";}
  }




  return (
    <div className='create'>
      <FormHeader headercheck = {flight} />
    {/* <h2>Create New Flight</h2> */}

        {/* <form id='app_form'  onSubmit={(e) => handleSubmit(e)} > */}
            <label>Airline</label>
            {/* <div className='fancy-select'> */}
              
              <Select 
                required
                id='airline'
                // onKeyDown={(e) => e.preventDefault()}
                isClearable = {true}
                // defautValue = {}
                // defaultInputValue = {airlineOptions.find(e => e.label === airline)} 
                options ={airlineOptions}
                // value = {airlineOptions.filter(option => option.value === 1)}
                // defaultValue = {{
                //   "value": 1,
                //   "label": "CheapSkate Airlines"
                // }}
                className='fancy-select'
                isSearchable = {true}
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
                onSubmit ={(e) => {
                  if(e) setAirline(e.value)
                }}
                
                  // More props
                //https://react-selecet.com/props#select-props
              />
        

            <label>Origin Country</label>
            <Select 
                required
                id='origin_country'
                className='fancy-select'
                // placeholder = {flight.origin_country}
                options ={countryOptions}
                isSearchable = {true}
                defaultValue = {originCountry}
                isClearable = {true} 

                // isMulti  = {true}
                onChange={(e) => {
                  if (e) setOriginCountry(e.value)
                }}


              />

            <label>Destination Country</label>
            <Select 
                required
                id='dest_country'
                className='fancy-select'
                options ={countryOptions}
                // value = {destinationCountry}
                isSearchable = {true}
                isClearable = {true} 
                defaultValue = {destinationCountry}
                // isMulti  = {true}
                onChange ={(e) => {
                  if(e) setDestinationCountry(e.value)
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
                onInvalid ={() => {
                  setDepartureMinTime(departureMinTime)
                
                }}
                onChange = {(e) => {    
                  // time_validation('arrival_time', 'errormes_dep')
                  setDepartureTime(e.target.value)
                  setArrivalTime(e.target.value)
                }}
                >
                  
                </input>
                <span id='errormes_dep' style={{
            fontWeight: 'bold',
              color: 'red',
                }}></span>


            <label>Arrival Time</label>
            <input 
                type='datetime-local'
                id='arrival_time'
                required
                onInvalid={() => {setArrivalTime(departureTime)}}
                // onInvalid={() => {time_validation('arrival_time')}}
                
                className='fancy-select'
                min={departureTime}
                value = {arrivalTime}
                onChange ={(e) => {
                  time_validation('arrival_time', 'errormes_arr')
                  setArrivalTime(e.target.value)
                }
            }
                >

            </input>
            
          <span id='errormes_arr' style={{
            fontWeight: 'bold',
              color: 'red',
                }}></span>
                
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


        {/* </form> */}
        
    </div>
   
   
  
  )

}

export default CreateFlightForm