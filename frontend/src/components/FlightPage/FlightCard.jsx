import './FlightCard.css'
import { MdFlight ,   MdFlightTakeoff } from 'react-icons/md';

import React, {useState, useEffect, useContext}  from 'react'
import { format , parseISO} from "date-fns";
import { useNavigate} from "react-router-dom";
import { CreateTicket, RemoveTicket } from '../../methods/TicketMethods';
import AuthContext from "../../context/authentication";
import { ViewMyTickets } from "../../methods/TicketMethods";
import moment from 'moment';


const FlightCard = (props) => {
  let flight = props.flight
  let  navigate = useNavigate();
  let formatTime = (flight) => {return format(parseISO(flight),  "dd/MM/yy HH:mm")}
  const d_country = props.countries?.find(count=> count.country_name===flight.destination_country)
  const o_country = props.countries?.find(count=> count.country_name===flight.origin_country)

  let [isHiddenAdd, setIsHiddenAdd] = useState(false)
  let [isHiddenRemove, setIsHiddenRemove] = useState(true)
  // let [addTicketMsg, setAddTicketMsg] = useState("")
  let [tickets, setTickets] = useState()
  let [currentTicket,  setCurrentTicket] = useState()

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

  if (currentTicket || props.CusPage===true){
    // setAddTicketMsg("This Ticket Is Booked")
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

let showDuration = () => { 
  let duration = moment.duration(moment(flight.landing_time).diff(moment(flight.departure_time)));
  let totalHours = duration.asHours()
  if (totalHours % 1 !== 0) {totalHours = Math.floor(totalHours)}
return `${totalHours}h ${duration.minutes()}m`
}

  return (
   <> 
  <div className="col-lg-4">  
    <div className="mb15">
      <div className="flight-display-card">
        <div id="card-header">
            <label id="airline-name">{ flight?.airline }</label>

            <div id="flight-id-display">
              <small>flight</small>
              <strong>{ flight?.id }</strong>
            </div>
        </div>


      <section id="cities-section">
        <div className="city-display">
          <small id='city-left'>{ flight?.origin_country } <img src={o_country?.flag} height="13px" width="20px" alt={flight?.origin_country + ' flag'}/> </small>
          <strong>{ flight?.origin_country.slice(0, 3) } </strong>
        </div>

        <div id='flight-icon'>
          <MdFlight />
        </div>

        <div className="city-display">
          <small id='city-right'><img src={d_country?.flag} height="13px" width="20px" alt={flight?.destination_country + ' flag'}/>{ flight?.destination_country }  </small>
          <strong>{ flight?.destination_country.slice(0, 3) } </strong>
        </div>
      </section>


      <section id="times-section">
        <div className='time'>
          <small id="date-left">{formatTime(flight?.departure_time).slice(0,9)} </small>
          <strong>{ formatTime(flight?.departure_time).slice(9,) } </strong>
        </div>
            
        <div id='duration-time'>
          <label id="duration" >{ showDuration() }</label>
          <div id='flight-icon' >
            <div id="icon-label"> <MdFlightTakeoff /></div>
          </div>
        </div>
            
        <div className='time'>
          <small id="date-right">{ formatTime(flight?.landing_time).slice(0,9) }</small>
          <strong>{ formatTime(flight?.landing_time).slice(9,) }</strong>  
        </div>
    
      </section>

      <div id='tickets-box'>
          <small id="tickets-num">tickets left:</small>
          <label id='ticket-number' >{ flight?.remaining_tickets }</label>
        </div>


      <section id="btn-select-box">
        {!(user && user?.account_role !== 'Customer') ? (<>

          <input 
          type="button" 
          id='book-btn' 
          value = "Book"
          onClick={handleAddTicket}
          hidden = {isHiddenAdd}
          // onMouseEnter={() => console.log(flight?.id)}
          // onMouseLeave={() => console.log("leave")}
          />
          <input 
          type="button" 
          id='remove-btn' 
          value = "Remove"
          onClick={handleRemoveTicket}
          hidden = {isHiddenRemove}
          />


            </>):<></>}
      </section>
    </div>
  </div>
  </div>

</>

  )
}


export default FlightCard