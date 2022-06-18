import React, {useState, useEffect}  from 'react'
import { useParams , useNavigate, Navigate} from "react-router-dom";
import { ReactComponent as Arrow } from '../assets/arrow-left.svg'
import CreateFlightForm from '../forms/CreateFlightForm'


const FlightPage = () => {
    let navigate = useNavigate();
    let flightid  = useParams().id;
    let [flight , setFlight] = useState(null);



    useEffect(() => {
        getFlight()
     // eslint-disable-next-line
     }, [flightid])
  
     
     let getFlight = async () => {
      if (flightid === 'new') return

      let response = await fetch(`/backend/flights/${flightid}/`)
      let data = await response.json()
      setFlight(data)
  }


    let createflight = async () => {
       <CreateFlightForm />
  }


    let updateflight = async () => {
      console.log(flight)
        // <CreateFlightForm forupdate ={flight} />
     }


    let deleteFlight = async() => {
      fetch(`/backend/flights/${flightid}/delete` , {
        method: "DELETE",
        headers: {
                  'content-Type': 'application/json'
        }
      })
      navigate('/flights')

   }


   
   let formatTime = (flight) => {
    let date = new Date(flight)
    let datastring = (`${date.getDate()}/${(date.getMonth()+1)}/${ date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`)
    return datastring
}

    return (
    <div className='flight' >
        <div className='flight-header'>
          <h3> 
              <Arrow onClick={() =>{navigate('/flights')} }/>

          </h3> 
          {flightid !=='new' ? (
            <button onClick={deleteFlight}>Delete</button> ) 
            : (
              <button onClick={createflight}>create</button>
              
            )}
         <button onClick={updateflight}>Update</button>
        
        </div>

        {/* <textarea onChange={(e) => { handleChange(e.target.value) }} value={flight?.body}></textarea> */}

        <p><span>Flight number {flight?.id} from {flight?.origin_country}  to {flight?.destination_country} by {flight?.airline} leaves at {formatTime(flight?.departure_time)} and arrives at {formatTime(flight?.landing_time)}</span></p>
        <p>Hurry up because only {flight?.remaining_tickets} tickets left </p>
  </div>
  )
}


export default FlightPage 