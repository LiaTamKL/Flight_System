import React, {useState, useEffect}  from 'react'
import { useParams , useNavigate, useLocation} from "react-router-dom";
import { ReactComponent as Arrow } from '../assets/arrow-left.svg'
// import CreateFlightForm from '../forms/CreateFlightForm'
// import { GetFlightMethod } from '../methods/FlightMethods'
// import { DeleteFlight} from '../methods/FlightMethods'
import { format , parseISO} from "date-fns";


const TicketPage = () => {
    let navigate = useNavigate();

    // let flightid  = useParams().id;
    let test  = useLocation().state.test1;
    let [flight , setFlight] = useState(null);

    // console.log(test)

    // useEffect(() => {
    //     getFlight()
    //  // eslint-disable-next-line
    //  }, [flightid])
  

//   let getFlight = async() => {
//     setFlight(await GetFlightMethod(flightid)
//     )
// }

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
              <Arrow onClick={() =>{navigate(-1)} }/>

          </h3> 
          {/* {flightid !=='new' ? (
            <button onClick={deleteFlight}>Delete</button> ) 
            : (
              <button onClick={createflight}>create</button>
              
            )}
         <button onClick={updateflight}>Update</button> */}
        
        </div>

        {/* <textarea onChange={(e) => { handleChange(e.target.value) }} value={flight?.body}></textarea> */}

        <p>Ticket for: </p>
        <p><span>Flight number{flight?.id} from {flight?.origin_country}  to {flight?.destination_country} by {flight?.airline} leaves at {formatTime(flight?.departure_time)} and arrives at {formatTime(flight?.landing_time)}</span></p>
  </div>
  )
}


export default TicketPage 