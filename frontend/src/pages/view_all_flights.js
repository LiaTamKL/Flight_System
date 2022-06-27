
import {useState, useEffect, useContext, useRef} from "react";
import AuthContext from "../context/authentication";
import { Link } from "react-router-dom";
import { DeleteFlightAsAirline, ViewMyFlights } from "../methods/AirlineMethods";
import FlightCard from "../components/FlightCard";

const ViewAirlineFlights= () => {
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


    return (<div>
        <h5>Airline: {user.username}</h5>
        <div className="card text-center">
        <Link className="btn btn-primary btn-sm" to="/airline/search" >Search for specific flight</Link>
        <Link className="btn btn-primary btn-sm" to="/airline/add_fli" >Add a flight</Link>
        </div>
        <div className="card text-center">My Flights</div>
        {message.current? (<p className="alert alert-secondary">{message.current}</p>):<></>}
        
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
    </div>)
}

export default ViewAirlineFlights