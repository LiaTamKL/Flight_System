
import {useState, useEffect, useContext, useRef} from "react";
import { AdminCard} from "../../components/UserCards";
import AuthContext from "../../context/authentication";
import { Link } from "react-router-dom";
import GetUsers from "../../methods/AdminMethods";
import { DeleteUser } from "../../methods/AdminMethods";
import Select from 'react-select'

const ViewAdmins= () => {
    const [admins, setAdmins] = useState([]);
    const [searchedItem, setSearchedItem] = useState(null);
    const [searchOptions, setSearchOptions] = useState([]);
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
            setSearchOptions(data.map((account) => ({value:account.id, label:`${account.account}, ${account.first_name} ${account.last_name}`})))
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

    const searchforaccount = async(e)=>{
        e.preventDefault()
        setSearchedItem(admins.find(account=> account.id===parseInt(e.target.username.value)))}


    return (<div>
        <h5>Admin: {user.username}</h5>
        <div className="card text-center">
        <button className="btn btn-primary btn-sm" onClick={()=>setSearchedItem(false)}>All Admins</button>
        <Link className="btn btn-primary btn-sm" to="/admin" >View All Customers</Link>
        <Link className="btn btn-primary btn-sm" to="/admin/view_airlines" >View All Airlines</Link>
        <Link className="btn btn-primary btn-sm" to="/admin/view_specific" >Search for user</Link>
        </div>
        <div className="card text-center">All Admins</div>

        <form onSubmit={(e)=>searchforaccount(e)}>
        <Select 
                required
                name='username'
                id='username'
                className='fancy-select'
                placeholder = 'Search for a user'
                options ={searchOptions}
                isSearchable = {true}
                isClearable = {true}  />
            <div className="col-md-12 text-center">
        <input type="submit" className="btn btn-primary btn-sm" value='search'/></div>
        </form>


        {searchedItem?<>
        {
        <div key={searchedItem.id} className="list-group-item list-group-item-action flex-column align-items-start">
        <p>Searched for:</p>
        <AdminCard admin={searchedItem}/>
        <Link className="btn btn-primary btn-sm" to={`/admin/make_customer/${searchedItem.account}`} >Add as Customer</Link>
        <Link className="btn btn-primary btn-sm" to={`/admin/make_airline/${searchedItem.account}`} >Add as Airline</Link>
        <button onClick={()=>Delete(searchedItem.account)}className="btn btn-danger btn-sm" >Delete</button>
        </div>
        }</>
        :<>


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
            }</>}
    </div>)
}

export default ViewAdmins