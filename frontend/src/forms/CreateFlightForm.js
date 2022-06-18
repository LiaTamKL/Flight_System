import React, { useState , useEffect } from 'react'
import { format} from "date-fns";
import {useNavigate} from "react-router-dom";
import './Form.css'
import Select from 'react-select'
import { CreateFlight } from '../methods/FlightMethods'


const CreateFlightForm = () => {
  let navigate = useNavigate();
  let  [counter, setCounter] = useState(0)

  let [airline, setAirline] = useState('')
  let [originCountry, setOriginCountry] = useState('')
  let [destinationCountry, setDestinationCountry] = useState('')
  let [tickets, setTickets] = useState(1)
  let [airlineOptions, setAirlineOptions] = useState()
  let [countryOptions, setCountryOptions] = useState()

  let [departureTime, setDepartureTime] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm")) ;
  let [arrivalTime, setArrivalTime] = useState(departureTime) 
  let [departureMinTime, setDepartureMinTime] = useState() ;


  // let [isPending, setisPending] = useState(false)
  // let [errorMessage, setErrorMessage] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {airline, originCountry , destinationCountry , departureTime , arrivalTime, tickets}
    console.log(data);
    CreateFlight(data)
    navigate("/flights")

}

useEffect(() => {
  // pul data from the backend only once
  if (counter < 1){
    getAirlines()
    getContries()
    setDepartureMinTime(departureTime)
  }
  setCounter(counter + 1)
  // eslint-disable-next-line
  }, [airline])


let getAirlines = async () => {
  let response = await fetch(`/backend/airlines`)
  let data = await response.json()
  setAirlineOptions(data.map((airline) => ({value:airline.id, label:airline.name})))

  
  }

let getContries = async () => {
  let response = await fetch(`/backend/countries`)
  let data = await response.json()
  setCountryOptions(data.map((country) => ({value:country.id, label:country.country_name})))
    
  }
  

  // let time_validation = () =>{

  //   let dep = new Date(arrivalTime).getTime()
  //   let arr = new Date(departureTime).getTime()
  //   if (arr < dep) {
  //     setErrorMessage()
  //   }
    
  // }


  return (
    <div className='create'>
    <h2>Create New Flight</h2>

        <form onSubmit={handleSubmit} >
            <label>Airline</label>
            {/* <div className='fancy-select'> */}
              
              <Select 
                required
                // onKeyDown={(e) => e.preventDefault()}
                isClearable = {true}
                defaultValue = {airline}
                className='fancy-select'
                options ={airlineOptions}
                isSearchable = {true}
                // defaultValue = {null}
                // isMulti  = {true}
                onChange ={(e) => {setAirline(e.value)}}
                // onSubmit={(e) => {setAirline(e.value)}}
                
                
                // More props
                //https://react-selecet.com/props#select-props
              />
        

            <label>Origin Country</label>
            <Select 
                required
                className='fancy-select'
                // value={originCountry}
                options ={countryOptions}
                isSearchable = {true}
                defaultValue = {originCountry}
                isClearable = {true} 

                // isMulti  = {true}
                onChange ={(e) => {setOriginCountry(e.value)}}


              />

            <label>Destination Country</label>
            <Select 
                required
                className='fancy-select'
                options ={countryOptions}
                // value = {destinationCountry}
                isSearchable = {true}
                isClearable = {true} 
                defaultValue = {destinationCountry}
                // isMulti  = {true}
                onChange ={(e) => {setDestinationCountry(e.value)}}
                
              />

            <label>Departure Time</label>
            <input 
                type='datetime-local'
                required
                className='fancy-select'
                defaultValue={departureTime}
                min={departureMinTime}
                onInvalid ={() => {
                  setDepartureMinTime(departureMinTime)
                }}
                onChange = {(e) => {
                  setDepartureTime(e.target.value)
                  setArrivalTime(e.target.value)
                }}
                >
                </input>
                


            <label>Arrival Time</label>
            <input 
                type='datetime-local'
                required
                onInvalid={() => {setArrivalTime(departureTime)}}
                className='fancy-select'
                min={departureTime}
                value = {arrivalTime}
                onChange ={(e) => {

                  // time_validation(e.target.value)
                  setArrivalTime(e.target.value)
                }
            }
                >

                </input>
          {/* <span style={{
            fontWeight: 'bold',
              color: 'red',
                }}>{errorMessage}</span> */}
                
            <label>Number Of Tickets</label>
            <input
                required
                defaultValue ={tickets}
                type='number'
                step="1"
                min="1"
                onChange={(e) => setTickets(e.target.value)}
                >

                </input>

                <button type='submit' >Add Flight</button>
            {/* {!isPending &&  */}
            {/* {isPending && <button type='submit' disabled>Adding Flight....</button>} */}


        </form>
    </div>
   
   
  
  )

}

export default CreateFlightForm