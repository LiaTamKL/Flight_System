import React, {useState, useEffect, useContext}  from 'react'
import { useParams , useNavigate,useLocation, renderMatches  } from "react-router-dom";
import { ReactComponent as Arrow } from '../assets/arrow-left.svg'
// import CreateFlightForm from '../forms/CreateFlightForm'
import { GetFlightMethod } from '../methods/FlightMethods'
// import { DeleteFlight} from '../methods/FlightMethods'
import { format , parseISO} from "date-fns";
import { CreateTicket, RemoveTicket } from '../methods/TicketMethods';
import AuthContext from "../context/authentication";



const FlightPage = () => {
  let  navigate = useNavigate();
  let {user, authToken} = useContext(AuthContext);
  let { state } = useLocation();
  let flight = state.flight

  let formatTime = (flight) => {return format(parseISO(flight),  "dd/MM/yyyy HH:mm")}
  
   
  useEffect(() => {
     // eslint-disable-next-line
     }, [flight])
  

  let handleAddTicket = () => {
    CreateTicket(flight.id, authToken)
    navigate("/customer/tickets")
  }

 let handleRemoveTicket = () => {

    RemoveTicket(flight.id, authToken)
    navigate("/customer/tickets")

 }


  return (
    <div className='all' >
        <div className='all-header'>
          <h3> 
              <Arrow onClick={() =>{navigate(-1)} }/>
              {/* <Arrow onClick={() =>{navigate('/flights/search/')} }/> */}


          </h3> 
          {/* 
            <button onClick={deleteFlight}>Delete</button> ) 
             button onClick={updateflight}>Update</button> */}
        
        </div>

        <p><span>Flight number {flight?.id} from {flight?.origin_country}  to {flight?.destination_country} by {flight?.airline} leaves at {formatTime(flight?.departure_time)} and arrives at {formatTime(flight?.landing_time)}</span></p>
        <p>Hurry up because only {flight?.remaining_tickets} tickets left </p>

        <button 
          type="button" 
          className="btn btn-outline-primary"
          onClick={handleAddTicket}>
            Add Ticket</button>

        <button 
        type="button" 
        className="btn btn-outline-danger"
        onClick={handleRemoveTicket}>
          Remove Ticket
        </button>



  </div>
      
  )
}


export default FlightPage 




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
   
     // let [flight , setFlight] = useState(null);

    
    // useEffect(() => {
    //     // getFlight()
    //  // eslint-disable-next-line
    //  }, [flight])
  

//   let getFlight = async() => {
//     setFlight(await GetFlightMethod(flightid)
//     )
// }

