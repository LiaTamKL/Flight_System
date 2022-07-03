import {useState, useEffect, useContext, useRef} from "react";
import AccountCard from "../components/UserCards";
import AuthContext from "../context/authentication";
import { Link } from "react-router-dom";
import GetUsers from "../methods/AdminMethods";
import { DeleteUser} from "../methods/AdminMethods";
import Select from 'react-select'

const SearchForUser = ()=>{
    const [accounts, setAccounts] = useState([]);
    const [allAccounts, setAllAccounts] = useState([]);
    const [searchedItem, setSearchedItem] = useState(null);
    let {user, authToken} = useContext(AuthContext)
    const message = useRef()

    useEffect(()=>{
        GetAccounts()
    },[])


    let GetAccounts = async() =>{
        
        let result = await GetUsers("Accounts", authToken)
        let data =  result.data
        let status = result.status
        if (status ===200){
            setAccounts(data.map((account) => ({value:account.id, label:`${account.username}, Account type: ${account.account_role}`})))
            setAllAccounts(data)
        }
        else{
            alert(status, data)
        }
    }


    const searchforaccount = async(e)=>{
        e.preventDefault()
        setSearchedItem(allAccounts.find(account=> account.id===parseInt(e.target.username.value)))
    }
    let Delete= async(e) =>{
        let result = await DeleteUser(e, authToken)
        message.current =result.data
        GetAccounts()
        setSearchedItem(null)

    }




    return(<div>
        <h5>Admin: {user.username}</h5>
        <div className="card text-center">
        <Link className="btn btn-primary btn-sm" to="/admin" >View All Customers</Link>
        <Link className="btn btn-primary btn-sm" to="/admin/view_airlines" >View All Airlines</Link>
        <Link className="btn btn-primary btn-sm" to="/admin/view_admins" >View All Admins</Link>
        </div>
        {message.current? (<p className="alert alert-secondary">{message.current}</p>):<></>}
        <form onSubmit={(e)=>searchforaccount(e)}>
        <Select 
                required
                name='username'
                id='username'
                className='fancy-select'
                placeholder = 'Search for a user'
                options ={accounts}
                isSearchable = {true}
                isClearable = {true}  />

            <input type="submit" value='search'/>
        </form>
        {searchedItem?
             (<>
                        <div className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{searchedItem.username} {searchedItem.email}</h5>
                            <small className="text-muted">Role: {searchedItem.account_role}</small><br/><br/>

                            </div>
                            {searchedItem.is_superuser===true?<p>Superuser may not be altered</p>:<>
                                {searchedItem.account_role!=="Admin"? <Link className="btn btn-primary btn-sm" to={`/admin/make_admin/${searchedItem.username}`} >Add as Admin</Link>:<></>}
                                {searchedItem.account_role!=="Customer"? <Link className="btn btn-primary btn-sm" to={`/admin/make_customer/${searchedItem.username}`} >Add as Customer</Link>:<></>}
                                {searchedItem.account_role!=="Airline"? <Link className="btn btn-primary btn-sm" to={`/admin/make_airline/${searchedItem.username}`} >Add as Airline</Link>:<></>}
                                <button onClick={()=>Delete(searchedItem.username)}className="btn btn-danger btn-sm" >Delete</button></>
                            
                            }
                        </div>
                        </>
                ) : (
                        <h2>Search for a user</h2>
                )
            }
        </div>)
}

export default SearchForUser