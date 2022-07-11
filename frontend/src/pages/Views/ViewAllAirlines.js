
import React, {useState, useEffect, useContext, useRef} from "react";
import { AirlineCard } from "../../components/UserCards";
import AuthContext from "../../context/authentication";
import { Link } from "react-router-dom";
import GetUsers from "../../methods/AdminMethods";
import { DeleteUser } from "../../methods/AdminMethods";
import Select from 'react-select'
import ReactPaginate from "react-paginate"
import { AllCountries } from "../../methods/CountriesMethods";

const ViewAirlines = () => {
    const [airlines, setAirlines] = useState([]);
    const [searchOptions, setSearchOptions] = useState([]);
    const [searchedItem, setSearchedItem] = useState(null);
    const [countries, setCountries] = useState([]);
    let {user, authToken} = useContext(AuthContext)

    const message = useRef()


    const [pagenumber, setPageNumber] = useState(0)
    const airlinesPerPage = 3
    const pagesSeen = pagenumber * airlinesPerPage

    const displayAirlines = airlines.slice(pagesSeen, pagesSeen + airlinesPerPage).map((airline)=>{
    return (
    <div key={airline.account} className="list-group-item list-group-item-action flex-column align-items-start">
        <AirlineCard airline={airline} countries={countries}/>
        <Link className="btn btn-primary btn-sm" to={`/admin/make_customer/${airline.account}`} >Add as Customer</Link>
        <Link className="btn btn-primary btn-sm" to={`/admin/make_admin/${airline.account}`} >Add as Admin</Link>
        <button onClick={()=>Delete(airline.account)}className="btn btn-danger btn-sm" >Delete</button>
    </div>
    )})
    const pageCount = Math.ceil(airlines.length / airlinesPerPage)
    const changePage = ({selected})=>{
        setPageNumber(selected)
    }



    let GetAirlines = async() =>{
        
        let result = await GetUsers("Airlines", authToken)
        let data =  result.data
        let status = result.status
        if (status ===200){
            setAirlines(data)
            setSearchOptions(data.map((account) => ({value:account.id, label:`${account.account}, ${account.name}, from ${account.country}`})))
            let country_data = await AllCountries()
            if (country_data){
                setCountries(country_data)        
        }}
        else{
            alert(status, data)
        }
    }

    useEffect(()=>{
        GetAirlines()
    },[])

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
        <button className="btn btn-primary btn-sm" onClick={()=>setSearchedItem(false)}>Clear search and view all airlines</button>
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
        <AirlineCard airline={searchedItem} countries={countries}/>
        <Link className="btn btn-primary btn-sm" to={`/admin/make_customer/${searchedItem.account}`} >Add as Customer</Link>
        <Link className="btn btn-primary btn-sm" to={`/admin/make_admin/${searchedItem.account}`} >Add as Admin</Link>
        <button onClick={()=>Delete(searchedItem.account)}className="btn btn-danger btn-sm" >Delete</button>
        </div>
        }</>
        :<>

        {
                airlines?.length > 0
                ? (<>
                    {displayAirlines}
                    <ReactPaginate
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
                        <h2>No Airlines found</h2>
                )
            }</>}
    </div>)
}

export default ViewAirlines