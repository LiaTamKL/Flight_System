import {useState, useEffect, useContext, useRef} from "react";
import AuthContext from "../../context/authentication";
import { Link } from "react-router-dom";
import GetUsers from "../../methods/AdminMethods";
import { DeleteUser} from "../../methods/AdminMethods";
import Select from 'react-select'
import "../PagesCss/Pages.css"
import { AccountCard } from "../../components/UserCards";

const SearchForUser = ()=>{
    const [accounts, setAccounts] = useState([]);
    const [allAccounts, setAllAccounts] = useState([]);
    const [searchedItem, setSearchedItem] = useState(null);
    let {user, authToken} = useContext(AuthContext)
    const message = useRef()

    useEffect(()=>{
        GetAccounts()
    },[])

    /**
    * sets all accounts along with search options
    */  
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

    /**
    * sets the searched item to the searched account
    * @param  {Dictionary} e The information (username)
    */  
    const searchforaccount = async(e)=>{
        e.preventDefault()
        setSearchedItem(allAccounts.find(account=> account.id===parseInt(e.target.username.value)))
    }

    /**
    * deletes an account. gets accounts and resets search item after usage to show update
    * @param  {Dictionary} e The information
    */  
    let Delete= async(e) =>{
        let result = await DeleteUser(e, authToken)
        message.current =result.data
        GetAccounts()
        setSearchedItem(null)

    }

    /**
    * returns all buttons to be displayed in cards
    */  
    let Buttons = (user)=>{
        return <div>
        {user.is_superuser===true?<p>Superuser may not be altered</p>:<>
        {user.account_role!=="Admin"? <Link className="btn btn-primary btn-sm" to={`/admin/make_admin/${user.username}`} >Add as Admin</Link>:<></>}
        {user.account_role!=="Customer"? <Link className="btn btn-primary btn-sm" to={`/admin/make_customer/${user.username}`} >Add as Customer</Link>:<></>}
        {user.account_role!=="Airline"? <Link className="btn btn-primary btn-sm" to={`/admin/make_airline/${user.username}`} >Add as Airline</Link>:<></>}
        <button onClick={()=>Delete(user.username)}className="btn btn-danger btn-sm" >Delete</button></>
    
    }</div>
    }


    return(
        <>

        <div className="admin-label-center"><label className="admin-label-display" >Admin: {user.username}</label></div>
        

        <div id="user-view-container">
        {message.current? (<p className="alert alert-secondary">{message.current}</p>):<></>}
        <form onSubmit={(e)=>searchforaccount(e)}>
                <Select 
                        required
                        name='username'
                        id='username'
                        className='user-select'
                        placeholder = 'Search for a user'
                        options ={accounts}
                        isSearchable = {true}
                        isClearable = {true}  />

                <input id="user-search-btn" className="btn btn-primary btn-sm" type="submit" value='Search'/>
        </form>
        {searchedItem?
             (<>
                <AccountCard account={searchedItem} buttons={Buttons(searchedItem)}/>

                </>
                ) : (
                        <div id="label-positioning"><label id="after-search-label" >Search for a user</label></div>
                )
            }
        </div></>)
}

export default SearchForUser