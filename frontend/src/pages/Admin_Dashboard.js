
import {useState, useEffect, useContext, useRef} from "react";
import CustomerCard from "../components/UserCards";
import AuthContext from "../context/authentication";
import { Link } from "react-router-dom";
import GetUsers from "../methods/AdminMethods";
import { DeleteUser, UpdateToAdminFromCus } from "../methods/AdminMethods";
import Select from 'react-select'
import ReactPaginate from "react-paginate"
import "./Pages.css"


const AdminDashboard= () => {
    const [customers, setCustomers] = useState([]);
    const [searchedItem, setSearchedItem] = useState(null);
    const [searchOptions, setSearchOptions] = useState([]);
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
            setSearchOptions(data.map((account) => ({value:account.id, label:`${account.account}, ${account.first_name} ${account.last_name}. Number is ${account.phone_number}`})))
        }
        else{
            alert(status, data)
        }
    }

    let Delete= async(e) =>{

        let result = await DeleteUser(e, authToken)
        message.current =result.data
        GetCustomers()
        setSearchedItem(false)

    }

    let UpdateToAdmin= async(e) =>{

        let result = await UpdateToAdminFromCus(e, authToken)

        message.current =result.data
        GetCustomers()

    }


    const searchforaccount = async(e)=>{
        e.preventDefault()
        setSearchedItem(customers.find(account=> account.id===parseInt(e.target.username.value)))}


    const [pagenumber, setPageNumber] = useState(0)
    const cusPerPage = 3
    const pagesSeen = pagenumber * cusPerPage

    const displayCustomers = customers.slice(pagesSeen, pagesSeen + cusPerPage).map((customer)=>{
    return (
        <div key={customer.account} className="list-group-item list-group-item-action flex-column align-items-start">
        <CustomerCard customer={customer}/>
        <Link className="btn btn-primary btn-sm" to={`/admin/make_airline/${customer.account}`} >Add as Airline</Link>
        <button onClick={()=>UpdateToAdmin(customer)}className="btn btn-primary btn-sm" >Add as Admin</button>
        <button onClick={()=>Delete(customer.account)}className="btn btn-danger btn-sm" >Delete</button>
    </div>
    )})
    const pageCount = Math.ceil(customers.length / cusPerPage)
    const changePage = ({selected})=>{
        setPageNumber(selected)
    }


    return (<div>
        <h5>Welcome Admin {user.username}</h5>
        <div className="card text-center">
        <button className="btn btn-primary btn-sm" onClick={()=>setSearchedItem(false)}>Clear search and view all customers</button>
        </div>
        <div className="card text-center">All Customers</div>
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
        <CustomerCard customer={searchedItem}/>
        <Link className="btn btn-primary btn-sm" to={`/admin/make_airline/${searchedItem.account}`} >Add as Airline</Link>
        <button onClick={()=>UpdateToAdmin(searchedItem)}className="btn btn-primary btn-sm" >Add as Admin</button>
        <button onClick={()=>Delete(searchedItem.account)}className="btn btn-danger btn-sm" >Delete</button>
        </div>
        }</>
        :<>
        
        {
                customers?.length > 0
                ? (
                     <>
                    {displayCustomers}
                    <ReactPaginate
                    className= {"pagination"}
                    previousLabel = {'Back'}
                    nextLabel = {'Next'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    siblingCount = {0}
                    containerClassName={""}
                    previousLinkClassName={"btn btn-outline-info"}
                    nextLinkClassName={"btn btn-outline-info"}
                    />
                    </>
                ) : (
                        <h2>No Customers found</h2>
                )
            }</>}
    </div>)
}

export default AdminDashboard