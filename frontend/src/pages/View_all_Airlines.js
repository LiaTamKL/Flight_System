
import {useState, useEffect, useContext, useRef} from "react";
import { AirlineCard } from "../components/UserCards";
import AuthContext from "../context/authentication";
import { Link } from "react-router-dom";
import GetUsers from "../methods/AdminMethods";
import { DeleteUser, UpdateToAdminFromCus } from "../methods/AdminMethods";

const ViewAirlines= () => {
    const [airlines, setAirlines] = useState([]);
    let {user, authToken} = useContext(AuthContext)
    const message = useRef()
    useEffect(()=>{
        GetAirlines()
    },[])


    let GetAirlines = async() =>{
        
        let result = await GetUsers("Airlines", authToken)
        let data =  result.data
        let status = result.status
        if (status ===200){
            setAirlines(data)
        }
        else{
            alert(status, data)
        }
    }

    
    let Delete= async(e) =>{

        let result = await DeleteUser(e, authToken)
        message.current =result.data
        GetAirlines()

    }



    return (<div>
        <h5>Admin: {user.username}</h5>
        <div className="card text-center">
        <Link className="btn btn-primary btn-sm" to="/admin/view_admins" >View All Admins</Link>
        <Link className="btn btn-primary btn-sm" to="/admin" >View All Customers</Link>
        <Link className="btn btn-primary btn-sm" to="/admin/view_specific" >Search for user</Link>
        </div>
        <div className="card text-center">All Airlines</div>
        {message.current? (<p className="alert alert-secondary">{message.current}</p>):<></>}
        
        {
                airlines?.length > 0
                ? (<>
                        {airlines.map((airline)=>(
                        <div key={airline.account} className="list-group-item list-group-item-action flex-column align-items-start">
                            <AirlineCard airline={airline}/>
                            <Link className="btn btn-primary btn-sm" to={`/admin/make_customer/${airline.account}`} >Add as Customer</Link>
                            <Link className="btn btn-primary btn-sm" to={`/admin/make_admin/${airline.account}`} >Add as Admin</Link>
                            <button onClick={()=>Delete(airline.account)}className="btn btn-danger btn-sm" >Delete</button>
                        </div>
                        ))}</>
                ) : (
                        <h2>No Airlines found</h2>
                )
            }
    </div>)
}

export default ViewAirlines