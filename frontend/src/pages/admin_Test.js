
import {useState, useEffect, useContext, useRef} from "react";
import CustomerCard from "../components/UserCards";
import AuthContext from "../context/authentication";
import { Link } from "react-router-dom";
import GetUsers from "../methods/AdminMethods";
import { DeleteUser, UpdateToAdminFromCus } from "../methods/AdminMethods";

const AdminDashboard= () => {
    const [customers, setCustomers] = useState([]);
    let {user, authToken} = useContext(AuthContext)
    const message = useRef()
    useEffect(()=>{
        GetCustomers()
    },[])


    let GetCustomers = async() =>{
        
        let result = await GetUsers("Customers", authToken)
        let data =  result.data
        let status = result.status
        if (status ===200){
            setCustomers(data)
        }
        else{
            alert(status, data)
        }
    }

    let Delete= async(e) =>{

        let result = await DeleteUser(e, authToken)
        message.current =result.data
        GetCustomers()

    }

    let UpdateToAdmin= async(e) =>{

        let result = await UpdateToAdminFromCus(e, authToken)

        message.current =result.data
        GetCustomers()

    }


    return (<div>
        <h5>YOU'VE ARRIVED AT THE ADMIN PAGE {user.username}</h5>
        <div className="card text-center">
        <Link className="btn btn-primary btn-sm" to="/admin/view_admins" >View All Admins</Link>
        <Link className="btn btn-primary btn-sm" to="/admin/view_airlines" >View All Airlines</Link>
        <Link className="btn btn-primary btn-sm" to="/admin/view_specific" >Search for user</Link>
        </div>
        <div className="card text-center">All Customers</div>
        {message.current? (<p className="alert alert-secondary">{message.current}</p>):<></>}
        
        {
                customers?.length > 0
                ? (<>
                        {customers.map((customer)=>(
                        <div key={customer.account} className="list-group-item list-group-item-action flex-column align-items-start">
                            <CustomerCard customer={customer}/>
                            <Link className="btn btn-primary btn-sm" to={`/admin/make_airline/${customer.account}`} >Add as Airline</Link>
                            <button onClick={()=>UpdateToAdmin(customer)}className="btn btn-primary btn-sm" >Add as Admin</button>
                            <button onClick={()=>Delete(customer.account)}className="btn btn-danger btn-sm" >Delete</button>
                        </div>
                        ))}</>
                ) : (
                        <h2>No Customers found</h2>
                )
            }
    </div>)
}

export default AdminDashboard