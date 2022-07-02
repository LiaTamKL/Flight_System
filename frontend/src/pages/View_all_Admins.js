
import {useState, useEffect, useContext, useRef} from "react";
import { AdminCard} from "../components/UserCards";
import AuthContext from "../context/authentication";
import { Link } from "react-router-dom";
import GetUsers from "../methods/AdminMethods";
import { DeleteUser, UpdateToAdminFromCus } from "../methods/AdminMethods";

const ViewAdmins= () => {
    const [admins, setAdmins] = useState([]);
    let {user, authToken} = useContext(AuthContext)
    const message = useRef()
    useEffect(()=>{
        GetAdmins()
    },[])


    let GetAdmins = async() =>{
        
        let result = await GetUsers("Admins", authToken)
        let data =  result.data
        let status = result.status
        if (status ===200){
            setAdmins(data)
        }
        else{
            alert(status, data)
        }
    }

    let Delete= async(e) =>{

        let result = await DeleteUser(e, authToken)

        message.current =result.data
        GetAdmins()

    }



    return (<div>
        <h5>Admin: {user.username}</h5>
        <div className="card text-center">
        <Link className="btn btn-primary btn-sm" to="/admin" >View All Customers</Link>
        <Link className="btn btn-primary btn-sm" to="/admin/view_airlines" >View All Airlines</Link>
        <Link className="btn btn-primary btn-sm" to="/admin/view_specific" >Search for user</Link>
        </div>
        <div className="card text-center">All Admins</div>
        {message.current? (<p className="alert alert-secondary">{message.current}</p>):<></>}
        
        {
                admins?.length > 0
                ? (<>
                        {admins.map((admin)=>(
                        <div key={admin.account} className="list-group-item list-group-item-action flex-column align-items-start">
                            <AdminCard admin={admin}/>
                            <Link className="btn btn-primary btn-sm" to={`/admin/make_customer/${admin.account}`} >Add as Customer</Link>
                            <Link className="btn btn-primary btn-sm" to={`/admin/make_airline/${admin.account}`} >Add as Airline</Link>
                            <button onClick={()=>Delete(admin.account)}className="btn btn-danger btn-sm" >Delete</button>
                        </div>
                        ))}</>
                ) : (
                        <h2>No Admins found</h2>
                )
            }
    </div>)
}

export default ViewAdmins