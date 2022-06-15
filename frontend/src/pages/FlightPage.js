import React, {useState, useEffect}  from 'react'
import { useParams , Link} from "react-router-dom";
import { ReactComponent as Arrow } from '../assets/arrow-left.svg'


const FlightPage = () => {
    let flightid  = useParams().id;
    // console.log(flightid)
    let [flight , setFlight] = useState(null)

    useEffect(() => {
        getFlight()
     // eslint-disable-next-line
     }, [flightid])
  
  
     let getFlight = async () => {
        let response = await fetch(`/backend/getflights/${flightid}/`)
        let data = await response.json()
        setFlight(data)
     }

     

    return (
    <div className='flight' >
        <div className='flight-header'>
          <h3>
            <Link to="/">
              <Arrow />        
            </Link>
          </h3>
        </div>
        
        <p>Flight number {flight?.id} from {flight?.origin_country}  to {flight?.destination_country} by {flight?.airline} leaves at {flight?.departure_time} and arrives at {flight?.landing_time} </p>
        <p>Hurry up because only {flight?.remaining_tickets} tickets left </p>
  </div>
  )
}

export default FlightPage 