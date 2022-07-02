
import {useState, useEffect, useContext, useRef} from "react";
import AuthContext from "../context/authentication";
import { Link } from "react-router-dom";
import { DeleteFlightAsAirline, ViewMyFlights } from "../methods/AirlineMethods";
import FlightCard from "../components/FlightCard";
import Select from 'react-select'

const ViewAirlineFlights= () => {
    const [searched, setSearched] = useState(false);
    const [flightOptions, setFlightOptions] = useState([]);
    const [flights, setFlights] = useState([]);
    let {user, authToken} = useContext(AuthContext)
    const message = useRef()
    useEffect(()=>{
        getflights()
    },[])


    let getflights = async() =>{
        
        let result = await ViewMyFlights(authToken)
        let data =  result.data
        let status = result.status
        if (status ===200){
            setFlights(data)
            setFlightOptions(data.map((flight) => ({value:flight.id, label:`Flight #${flight.id}, from ${flight.origin_country} to ${flight.destination_country}. Departing at ${flight.departure_time}`})))

        }
        else{
            alert(status, data)
        }
    }
    

    let Delete= async(e) =>{
        console.log("i started,", e)
        let result = await DeleteFlightAsAirline(e, authToken)
        console.log(result.data)
        message.current =result.data
        getflights()

    }
    let setsearchresults = (e)=>{
        e.preventDefault()
        //setSearched(e.target.flight.value)
        for(var i=0; i<flights.length; i++) {
            if (flights[i].id===parseInt(e.target.flight.value)){
            setSearched(flights[i])
            break 
            }
          }
    }

    return (<div>
        <h5>Airline: {user.username}</h5>
        <div className="card text-center">
        <Link className="btn btn-primary btn-sm" to="/airline/add_fli" >Add a flight</Link>
        <button className="btn btn-primary btn-sm" onClick={()=>setSearched(false)}>Clear Search</button>
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
        <input type="submit" className="btn btn-primary btn-sm" value='search'/>
        </form>
        </div>
        <div className="card text-center">My Flights</div>
        {message.current? (<p className="alert alert-secondary">{message.current}</p>):<></>}
        
        {searched?<>
        {
        <div key={searched.id} className="list-group-item list-group-item-action flex-column align-items-start">
        <p>Searched for:</p>
        <FlightCard flight={searched}/>
        <button onClick={()=>Delete(searched.id)}className="btn btn-danger btn-sm" >Delete</button>
        <Link className="btn btn-primary btn-sm" to="/airline/add_fli" state={{flightobj: searched}} >Update Flight</Link>
        </div>
        }</>
        :<div className="card p3" >
        {
                flights?.length > 0
                ? (<>
                        {flights.map((flight)=>(
                        <div key={flight.id} className="list-group-item list-group-item-action flex-column align-items-start">
                            <FlightCard flight={flight}/>
                            <button onClick={()=>Delete(flight.id)}className="btn btn-danger btn-sm" >Delete</button>
                            <Link className="btn btn-primary btn-sm" to="/airline/add_fli" state={{flightobj: flight}} >Update Flight</Link>
                        </div>
                        ))}</>
                ) : (
                        <h2>No Flights found</h2>
                )
            }
    </div>}

</div>)
}

export default ViewAirlineFlights