
import {useState, useEffect, useContext, useRef} from "react";
import { AirlineCard } from "../../components/UserCards";
import AuthContext from "../../context/authentication";
import { Link } from "react-router-dom";
import GetUsers from "../../methods/AdminMethods";
import { DeleteUser } from "../../methods/AdminMethods";
import Select from 'react-select'

const ViewAirlines = () => {
    const [airlines, setAirlines] = useState([]);
    const [searchOptions, setSearchOptions] = useState([]);
    const [searchedItem, setSearchedItem] = useState(null);
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
            setSearchOptions(data.map((account) => ({value:account.id, label:`${account.account}, ${account.name}, from ${account.country}`})))
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

    const searchforaccount = async(e)=>{
        e.preventDefault()
        setSearchedItem(airlines.find(account=> account.id===parseInt(e.target.username.value)))}


    return (<div>
        <h5>Admin: {user.username}</h5>
        <div className="card text-center">
        <Link className="btn btn-primary btn-sm" to="/admin/view_admins" >View All Admins</Link>
        <Link className="btn btn-primary btn-sm" to="/admin" >View All Customers</Link>
        <button className="btn btn-primary btn-sm" onClick={()=>setSearchedItem(false)}>All Airlines</button>
        <Link className="btn btn-primary btn-sm" to="/admin/view_specific" >Search for user</Link>
        </div>
        <div className="card text-center">All Airlines</div>
        {message.current? (<p className="alert alert-secondary">{message.current}</p>):<></>}
        
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
        <AirlineCard airline={searchedItem}/>
        <Link className="btn btn-primary btn-sm" to={`/admin/make_customer/${searchedItem.account}`} >Add as Customer</Link>
        <Link className="btn btn-primary btn-sm" to={`/admin/make_admin/${searchedItem.account}`} >Add as Admin</Link>
        <button onClick={()=>Delete(searchedItem.account)}className="btn btn-danger btn-sm" >Delete</button>
        </div>
        }</>
        :<>

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
            }</>}
    </div>)
}

export default ViewAirlines