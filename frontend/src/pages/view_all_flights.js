
import {useState, useEffect, useContext, useRef} from "react";
import AuthContext from "../context/authentication";
import { Link } from "react-router-dom";
import { DeleteFlightAsAirline, ViewMyFlights, CheckIfFlightFormIsValid, UpdateMyFlight } from "../methods/AirlineMethods";
import FlightCard from "../components/FlightCard";
import Select from 'react-select'
import NewFlightForm from "../forms/NewFlightForm";

const ViewAirlineFlights= () => {
    const [searched, setSearched] = useState(false);
    const [flightOptions, setFlightOptions] = useState([]);
    const [flights, setFlights] = useState([]);
    const [update, setUpdate] = useState(false)
    let {user, authToken} = useContext(AuthContext)
    let [message, setMessage] = useState()
    useEffect(()=>{
        getflights()
    },[])


    let getflights = async() =>{
        
        let result = await ViewMyFlights(authToken)
        let data =  result.data
        let status = result.status
        if (status ===200){
            setFlights(data)
            setFlightOptions(data.map((flight) => ({value:flight.id, label:`Flight #${flight.id}, from ${flight.origin_country} to ${flight.destination_country}. Departing at ${(new Date(flight.departure_time)).toUTCString()}`})))

        }
        else{
            alert(status, data)
        }
    }
    

    let Delete= async(e) =>{
        let result = await DeleteFlightAsAirline(e, authToken)
        setMessage(result.data)
        getflights()

    }
    let setsearchresults = (e)=>{
        e.preventDefault()
        for(var i=0; i<flights.length; i++) {
            if (flights[i].id===parseInt(e.target.flight.value)){
            setSearched(flights[i])
            break 
            }
          }
    }

    let setBack = ()=>{
        setSearched(false)
        setUpdate(false)
    }

    let handleUpdate=async(e)=>{
        e.preventDefault()
         let is_form_valid = CheckIfFlightFormIsValid(e)
         if (is_form_valid!==true){
             setMessage(is_form_valid)
         }
         else{
             let result = await UpdateMyFlight(e,update.id, authToken)
             setMessage(result.data)
             setBack()
             getflights()
         }
    }

    return (<div>
        <h5>Airline: {user.username}</h5>
        <div className="card text-center">
        <Link className="btn btn-primary btn-sm" to="/airline/add_fli" >Add a flight</Link>
        <button className="btn btn-primary btn-sm" onClick={()=>setBack()}>All Flights</button>

        </div>
        {message? (<p className="alert alert-secondary">{message}</p>):<></>}
        {update? (
        
        <form onSubmit={(e)=>handleUpdate(e)}>
        <NewFlightForm flightData={update}/>
        <input type="submit" className="btn btn-primary btn-sm" value={'Update Flight #'+update.id}/>
        </form>
        
        
        )
        :<>





        <form onSubmit={(e)=>setsearchresults(e)}>
        <Select 
                required
                name='flight'
                id='flight'
                className='fancy-select'
                placeholder = 'Search for a flight'
                options ={flightOptions}
                isSearchable = {true}
                isClearable = {true}  />
            <div className="col-md-12 text-center">
        <input type="submit" className="btn btn-primary btn-sm" value='search'/></div>
        </form>



        {searched?<>
        {
        <div key={searched.id} className="list-group-item list-group-item-action flex-column align-items-start">
        <p>Searched for:</p>
        <FlightCard flight={searched}/>
        <button onClick={()=>Delete(searched.id)}className="btn btn-danger btn-sm" >Delete</button>
        <button onClick={()=>setUpdate(searched)}className="btn btn-primary btn-sm" >Update</button>
        </div>
        }</>
        :<>
        
        
        
        
        <div className="card text-center">My Flights</div>
        <div className="card p3" >
        {
                flights?.length > 0
                ? (<>
                        {flights.map((flight)=>(
                        <div key={flight.id} className="list-group-item list-group-item-action flex-column align-items-start">
                            <FlightCard flight={flight}/>
                            <button onClick={()=>Delete(flight.id)}className="btn btn-danger btn-sm" >Delete</button>
                            <button onClick={()=>setUpdate(flight)}className="btn btn-primary btn-sm" >Update</button>
                        </div>
                        ))}</>
                ) : (
                        <h2>No Flights found</h2>
                )
            }
    </div></>}</>}

</div>)
}

export default ViewAirlineFlights