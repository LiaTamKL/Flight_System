
import {useState, useEffect, useContext, useRef} from "react";
import { AdminCard} from "../components/UserCards";
import AuthContext from "../context/authentication";
import { Link } from "react-router-dom";
import { ViewMyFlights } from "../methods/AirlineMethods";
import { DeleteUser, UpdateToAdminFromCus } from "../methods/AdminMethods";

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
        console.log(data)
        if (status ===200){
            console.log('success!')
        }
        else{
            alert(status, data)
        }
    }

    let Delete= async(e) =>{
        console.log(e)
        // let result = await DeleteUser(e, authToken)
        // console.log(result.data)
        // message.current =result.data
        // GetAdmins()

    }


    console.log('WELCOME ADMIN')
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
                            <button onClick={()=>Delete(flight.id)}className="btn btn-danger btn-sm" >Delete</button>
                        </div>
                        ))}</>
                ) : (
                        <h2>No Flights found</h2>
                )
            }
    </div>)
}

export default ViewAirlineFlights