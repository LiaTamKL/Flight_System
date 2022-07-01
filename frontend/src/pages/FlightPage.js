import React, {useState, useEffect}  from 'react'
import { useParams , useNavigate} from "react-router-dom";
import { ReactComponent as Arrow } from '../assets/arrow-left.svg'
// import CreateFlightForm from '../forms/CreateFlightForm'
import {GetFlightMethod} from '../methods/FlightMethods'
// import { DeleteFlight} from '../methods/FlightMethods'
import { format , parseISO} from "date-fns";


const FlightPage = () => {
    let navigate = useNavigate();
    let flightid  = useParams().id;
    let [flight , setFlight] = useState(null);

    useEffect(() => {
        getFlight()
     // eslint-disable-next-line
     }, [flightid])
  

  let getFlight = async() => {
    setFlight(await GetFlightMethod(flightid)
    )
}

  //   let createflight = async () => {
  //      <CreateFlightForm />
  // }


  // let updateflight = async () => {
  // // <CreateFlightForm flight/>
  //   navigate(`/flights/${flightid}/update` , {state :{flightobj: flight}})
  //   // navigate(`/flights/${flightid}/update`)


  
  // }

  //   let deleteFlight = async() => {
  //     DeleteFlight(flightid)
  //     navigate('/flights')

  //  }
   
   let formatTime = (flight) => {

    let datastring
    if(flight) {datastring =  format(parseISO(flight),  "dd/MM/yyyy HH:mm")}

    // let datastring = (`${date.getDate()}/${(date.getMonth()+1)}/${ date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`)
    return datastring
}

    return (
    <div className='all' >
        <div className='all-header'>
          <h3> 
              <Arrow onClick={() =>{navigate('/flights/search')} }/>

          </h3> 
          {/* {flightid !=='new' ? (
            <button onClick={deleteFlight}>Delete</button> ) 
            : (
              <button onClick={createflight}>create</button>
              
            )}
         <button onClick={updateflight}>Update</button> */}
        
        </div>

        {/* <textarea onChange={(e) => { handleChange(e.target.value) }} value={flight?.body}></textarea> */}

        <p><span>Flight number {flight?.id} from {flight?.origin_country}  to {flight?.destination_country} by {flight?.airline} leaves at {formatTime(flight?.departure_time)} and arrives at {formatTime(flight?.landing_time)}</span></p>
        <p>Hurry up because only {flight?.remaining_tickets} tickets left </p>
  </div>
  )
}


export default FlightPage 