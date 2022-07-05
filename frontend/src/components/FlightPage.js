import React, {useState, useEffect, useContext, useRef}  from 'react'
import { useNavigate,useLocation } from "react-router-dom";
import { ReactComponent as Arrow } from '../assets/arrow-left.svg'
import { format , parseISO, set} from "date-fns";
import { CreateTicket, RemoveTicket } from '../methods/TicketMethods';
import AuthContext from "../context/authentication";
import { ViewMyTickets } from "../methods/TicketMethods";




const FlightPage = () => {
  let  navigate = useNavigate();
  let [isDisabledAdd, setIsDisabledAdd] = useState(false)
  let [isDisabledRemove, setIsDisabledRemove] = useState(!isDisabledAdd)


  let [addTicketMsg, setAddTicketMsg] = useState("Add a Ticket")
  let [tickets, setTickets] = useState()
  let [currentTicket,  setCurrentTicket] = useState()

  // const tickets = useRef()
  let {user, authToken} = useContext(AuthContext);
  let { state } = useLocation();
  let flight = state.flight
  let formatTime = (flight) => {return format(parseISO(flight),  "dd/MM/yyyy HH:mm")}
  
  // using 2 useEffects to set tickets before checking validity.
  // it forces rerender after setting the tickets
  useEffect(() => { if(authToken) {getMyTickets()}}, [])

  useEffect(() => {
    checkIfBooked()
    getCurrentTicket()
   // eslint-disable-next-line
     }, [flight, isDisabledRemove,isDisabledAdd, tickets])


  let getMyTickets = async () => {

  let result = await ViewMyTickets(authToken)
  let data =  result.data
  let status = result.status
  if (status ===200){setTickets(data)}
  else{alert(status, data)}

}


let getCurrentTicket = () => {
   setCurrentTicket (tickets?.find((ticket) => ticket.flight === flight.id))
}

let checkIfBooked = () => {

  if (currentTicket ){
    setAddTicketMsg("Ticket Is Booked")
    setIsDisabledAdd(true)
    setIsDisabledRemove(false)
    return
   }
    
  if (flight?.remaining_tickets === 0 ){
    setAddTicketMsg("No Tickets left")
    setIsDisabledAdd(true)
  }
  

}
  



  let handleAddTicket = () => {
    if (authToken){CreateTicket(flight.id, authToken)}
    navigate("/customer/tickets")
  }


 let handleRemoveTicket = () => {
    RemoveTicket(currentTicket, authToken)
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
          onClick={handleAddTicket}
          disabled = {isDisabledAdd}>
          

           { addTicketMsg }
           </button>


        <button 
        type="button" 
        className="btn btn-outline-danger"
        onClick={handleRemoveTicket}
        disabled = {isDisabledRemove}>
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

