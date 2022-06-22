
import {useState, useEffect, useContext} from "react";
import CustomerCard from "../components/UserCards";
import AuthContext from "../context/authentication";
import { Link } from "react-router-dom";
import GetUsers from "../methods/AdminMethods";
import { DeleteUser } from "../methods/AdminMethods";

const AdminDashboard= () => {
    const [customers, setCustomers] = useState([]);
    let {user, authToken} = useContext(AuthContext)
    let {message, setMessage} = useState('')
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
        console.log(e)
        let result = await DeleteUser(e, authToken)
        console.log(result.data)
        alert(result.data)
        GetCustomers()

    }


    console.log('WELCOME ADMIN')
    return (<div>
        <h5>YOU'VE ARRIVED AT THE ADMIN PAGE {user.username}</h5>
        <div className="card text-center">
        <Link className="btn btn-primary btn-sm" to="/admin/view_admins" >View All Admins</Link>
        <Link className="btn btn-primary btn-sm" to="/admin/view_airlines" >View All Airlines</Link>
        <Link className="btn btn-primary btn-sm" to="/admin/view_specific" >Search for user</Link>
        </div>
        <div className="card text-center">All Customers</div>
        {message? (<p className="alert alert-secondary">{message}</p>):<></>}
        
        {
                customers?.length > 0
                ? (<>
                        {customers.map((customer)=>(
                        <div key={customer.account} className="list-group-item list-group-item-action flex-column align-items-start">
                            <CustomerCard customer={customer}/>
                            <button className="btn btn-primary btn-sm" >Add as Admin</button>
                            <button className="btn btn-primary btn-sm" >Add as Airline</button>
                            <button onClick={()=>
                                Delete(customer.account)}className="btn btn-danger btn-sm" >Delete</button>
                        </div>
                        ))}</>
                ) : (
                        <h2>No Customers found</h2>
                )
            }
    </div>)
}

export default AdminDashboard