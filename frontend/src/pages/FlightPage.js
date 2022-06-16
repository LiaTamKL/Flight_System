import React, {useState, useEffect}  from 'react'
import { useParams , useNavigate} from "react-router-dom";
import { ReactComponent as Arrow } from '../assets/arrow-left.svg'
import CreateFlight from '../forms/CreateFlight'
import { format } from "date-fns";


const FlightPage = () => {
    let history = useNavigate();
    let flightid  = useParams().id;
    let [flight , setFlight] = useState(null);

    useEffect(() => {
        getFlight()
     // eslint-disable-next-line
     }, [flightid])
  
  
     let getFlight = async () => {
        let response = await fetch(`/backend/flights/${flightid}/`)
        let data = await response.json()
        setFlight(data)
     }

     
     let createflight = async () => {
      <CreateFlight />
      
      // // if (flightid === 'new') return
      // fetch(`/backend/flights/create`, {
      //     method: "POST",
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(flight)
      // })
  }

      let updateFlight = async() => {
        fetch(`/backend/flights/${flightid}/update` , {
          method: "PUT",
          headers: {
                    'content-Type': 'application/json'
          },
          remaining_tickets: JSON.stringify(flight)
        })

     }

    let handleSubmit = () => {
      if (flightid !== 'new' && !flight.remaining_tickets){
          deleteFlight()
      }else if (flightid !== 'new'){
        // updateFlight()
      }else if (flightid ==='new' && flight !== null){
        createflight()
      }
        history('/')

    }

    let deleteFlight = async() => {
      fetch(`/backend/flights/${flightid}/delete` , {
        method: "DELETE",
        headers: {
                  'content-Type': 'application/json'
        }
      })
      history('/')

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
              
              <Arrow onClick={handleSubmit}/>   
          </h3> 
          {flightid !=='new' ? (
            <button onClick={deleteFlight}>Delete</button> ) 
            : (
              <button onClick={createflight}>Done</button>

            )}
         
        </div>

        {/* <textarea onChange={(e) => { handleChange(e.target.value) }} value={flight?.body}></textarea> */}

        <p><span>Flight number {flight?.id} from {flight?.origin_country}  to {flight?.destination_country} by {flight?.airline} leaves at {formatTime(flight?.departure_time)} and arrives at {formatTime(flight?.landing_time)}</span></p>
        <p>Hurry up because only {flight?.remaining_tickets} tickets left </p>
  </div>
  )
}

export default FlightPage 