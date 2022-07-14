import React, {useState, useEffect, useContext, useRef}  from 'react'
import { BiTime } from 'react-icons/bi';
import { format , parseISO } from "date-fns";
import { useNavigate,useLocation } from "react-router-dom";
import { CreateTicket, RemoveTicket } from '../../../methods/TicketMethods';
import AuthContext from "../../../context/authentication";
import { ViewMyTickets } from "../../../methods/TicketMethods";
import { MdFlightLand } from 'react-icons/md';
import { MdFlightTakeoff } from 'react-icons/md';



const FlightItem = (props) => {
  let  navigate = useNavigate();
 
  let flight = props.flight
  let formatTime = (flight) => {return format(parseISO(flight),  "dd MMM yyyy hh:mm")}

  let [isHiddenAdd, setIsHiddenAdd] = useState(false)
  let [isHiddenRemove, setIsHiddenRemove] = useState(true)


  let [addTicketMsg, setAddTicketMsg] = useState("")
  let [tickets, setTickets] = useState()
  let [currentTicket,  setCurrentTicket] = useState()


  // const tickets = useRef()
  let {user, authToken} = useContext(AuthContext);

    // using 2 useEffects to set tickets before checking validity.
  // it forces rerender after setting the tickets
  useEffect(() => {
  if(user?.account_role === 'Customer') {getMyTickets()}
  }, [])

  
  useEffect(() => {
    checkIfBooked()
    getCurrentTicket()
   // eslint-disable-next-line
     }, [flight, isHiddenRemove,isHiddenAdd, tickets])


    
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

  if (currentTicket || props.CusPage==true){
    setAddTicketMsg("This Ticket Is Booked")
    setIsHiddenAdd(true)
    setIsHiddenRemove(false)
    return
   }
    
  if (flight?.remaining_tickets === 0 ){
    setIsHiddenAdd(true)
  }

}
  

  let handleAddTicket = () => {
    if (authToken){CreateTicket(flight.id, authToken)}
    navigate("/customer/tickets")
    
  }


 let handleRemoveTicket = () => {
    RemoveTicket(currentTicket, authToken)
    navigate("/customer/tickets")
    window.location.reload(false);

 }


  return (
    <>

    <div className="card__ticketlist">
        <div className="airline-wrap">{flight?.airline}</div>
      

        <div className="icon-wrap" >
          
          <i><MdFlightTakeoff /></i>
          <small >{formatTime(flight?.departure_time).slice(0,11)} </small> 
          {/* <i><BiTime /></i> */}
          <small >{formatTime(flight?.departure_time).slice(11,)} </small> 
      </div> 
{/* 
      <div className="icon-wrap-landing" >
          <i><MdFlightLand /></i> 
          <small >{formatTime(flight?.landing_time).slice(0,11)} </small> 
          <i><BiTime /></i>
          <small >{formatTime(flight?.landing_time).slice(11,)} </small> 
          
      </div>  */}




      {/* <div className="icon-wrap-date" >
          <small >{formatTime(flight?.landing_time).slice(0,11)} </small> 
      </div> */}


        <div className="ticket-wrap"><var className="ticket"><span className="ticket-left">Tikets left</span> {flight?.remaining_tickets} </var> 

          {!(user && user?.account_role !== 'Customer') ? (<>

          <input 
          type="button" 
          className='book-btn' 
          value = "Book"
          onClick={handleAddTicket}
          hidden = {isHiddenAdd}
          // onMouseEnter={() => console.log(flight?.id)}
          // onMouseLeave={() => console.log("leave")}
          />
          <input 
          type="button" 
          className='remove-btn' 
          value = "Remove"
          onClick={handleRemoveTicket}
          hidden = {isHiddenRemove}
          />


            </>):<></>}


            </div>
    </div>
</> 
  )
}

export default FlightItem