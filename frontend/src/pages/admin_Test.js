
import {useState, useEffect, useContext} from "react";
import CustomerCard from "../components/UserCards";
import AuthContext from "../context/authentication";
import { Link } from "react-router-dom";
import GetUsers from "../methods/AdminMethods";

const AdminDashboard= () => {
    const [customers, setCustomers] = useState([]);
    let {user, authToken} = useContext(AuthContext)
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


    console.log('WELCOME ADMIN')
    return (<div>
        <h5>YOU'VE ARRIVED AT THE ADMIN PAGE {user.username}</h5>
        <div className="card text-center">
        <Link className="btn btn-primary btn-sm" to="/admin/view_admins" >View All Admins</Link>
        <Link className="btn btn-primary btn-sm" to="/admin/view_airlines" >View All Airlines</Link>
        <Link className="btn btn-primary btn-sm" to="/admin/view_specific" >Search for user</Link>
        </div>
        <div className="card text-center">All Customers</div>
        {
                customers?.length > 0
                ? (<>
                        {customers.map((customer)=>(
                            <CustomerCard key={customer.account} customer={customer}/>
                        ))}</>
                ) : (
                        <h2>No Customers found</h2>
                )
            }
    </div>)
}

export default AdminDashboard