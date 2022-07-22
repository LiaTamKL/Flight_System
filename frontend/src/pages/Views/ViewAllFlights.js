
import {useState, useEffect, useContext} from "react";
import AuthContext from "../../context/authentication";
import { DeleteFlightAsAirline, ViewMyFlights, CheckIfFlightFormIsValid, UpdateMyFlight } from "../../methods/AirlineMethods";
// import FlightCard from "../../components/FlightCard";
import FlightCard from "../../components/FlightPage/FlightCard";
import Select from 'react-select'
import NewFlightForm from "../../forms/NewFlightForm";
import ReactPaginate from "react-paginate"
import { AllCountries } from "../../methods/CountriesMethods";

const ViewAirlineFlights= () => {
    const [searched, setSearched] = useState(false);
    const [flightOptions, setFlightOptions] = useState([]);
    const [flights, setFlights] = useState([]);
    const [countries, setCountries] = useState([]);
    const [update, setUpdate] = useState(false)
    let {user, authToken} = useContext(AuthContext)
    let [message, setMessage] = useState()
    useEffect(()=>{
        getflights()
    },[])

    /**
    * sets all flights along with search options. also gets and sets all countries
    */  
    let getflights = async() =>{
        
        let result = await ViewMyFlights(authToken)
        let data =  result.data
        let status = result.status
        if (status ===200){
            setFlights(data)
            setFlightOptions(data.map((flight) => ({value:flight.id, label:`Flight #${flight.id}, from ${flight.origin_country} to ${flight.destination_country}. Departing at ${(new Date(flight.departure_time)).toUTCString()}. Tickets left: ${flight.remaining_tickets}.`})))
            let country_data = await AllCountries()
            if (country_data){
                setCountries(country_data)       
    
        }

        }
        else{
            alert(status, data)
        }
    }
    
    /**
    * deletes a flight. gets flights and resets search item after usage to show update
    * @param  {Dictionary} e The information (flight_id)
    */  
    let Delete= async(e) =>{
        let result = await DeleteFlightAsAirline(e, authToken)
        setMessage(result.data)
        getflights()
        setBack()

    }

    
    /**
    * sets the searched item to the searched flight
    * @param  {Dictionary} e The information (flight)
    */  
    let setsearchresults = (e)=>{
        e.preventDefault()
        setSearched(flights.find(flight=> flight.id===parseInt(e.target.flight.value)))
    }

    /**
    * resets searched item, resets to not show flight update page
    */
    let setBack = ()=>{
        setSearched(false)
        setUpdate(false)
    }

    /**
    * checks if flight update is valid, if so updates it and sets a message. if not, sets errors as message. then resets search, gets flights and goes back to main page
    * @param  {Dictionary} e The information (flight)
    */  
    let handleUpdate=async(e)=>{
        e.preventDefault()
         let is_form_valid = CheckIfFlightFormIsValid(e)
         if (is_form_valid!==true){
             setMessage(is_form_valid)
         }
         else{
             let result = await UpdateMyFlight(e,update.id, authToken)
             setMessage(result.data)
             setBack()
             getflights()
         }
    }

    const [pagenumber, setPageNumber] = useState(0)
    const flightsPerPage = 2
    const pagesSeen = pagenumber * flightsPerPage


    /**
    * shows card for each flight, sets it up for the pagination
    */
    const displayFlights = flights.slice(pagesSeen, pagesSeen + flightsPerPage).map((flight)=>{
    return (
        <div key={flight.id} className="col-lg-4" style={{width:60+'em'}}>

        <FlightCard flight={flight} countries={countries} custPage = {false}/>
        <div className='card' style={{width: 11 + 'rem'}}>
        <div className="btn-group">
        <button onClick={()=>Delete(flight.id)} className="btn btn-danger btn-sm"  style={{width:100 + '%' }}>Delete</button>
        <button onClick={()=>setUpdate(flight)}className="btn btn-primary btn-sm" style={{width:100 + '%' }}>Update</button></div>
        </div>

        <br/>
    </div>
    )})
    const pageCount = Math.ceil(flights.length / flightsPerPage)
    const changePage = ({selected})=>{
        setPageNumber(selected)
    }
 
    return (<div>
        <div className="admin-label-center"><label className="admin-label-display" >Airline: {user.username}</label></div>
        <div className="card text-center">
        <button className="btn btn-primary btn-sm" onClick={()=>setBack()}>Clear search and view all flights</button>

        </div>
        {message? (<p className="alert alert-secondary">{message}</p>):<></>}
        {update? (
        
        <form onSubmit={(e)=>handleUpdate(e)}>
        <NewFlightForm flightData={update}/>
        <input type="submit" className="btn btn-primary btn-sm" value={'Update Flight #'+update.id}/>
        </form>
        
        
        )
        :<>





        <form onSubmit={(e)=>setsearchresults(e)}>
        <Select 
                required
                name='flight'
                id='flight'
                className='fancy-select'
                placeholder = 'Search for a flight'
                options ={flightOptions}
                isSearchable = {true}
                isClearable = {true}  />
            <div className="col-md-12 text-center">
        <input type="submit" className="btn btn-primary btn-sm" value='search'/></div>
        </form>



        {searched?<>
        {
        <div key={searched.id} className="list-group-item list-group-item-action flex-column align-items-start">
        <p>Searched for:</p>
        <FlightCard flight={searched} countries={countries} custPage = {false}/>
        <button onClick={()=>Delete(searched.id)}className="btn btn-danger btn-sm" >Delete</button>
        <button onClick={()=>setUpdate(searched)}className="btn btn-primary btn-sm" >Update</button>
        </div>
        }</>
        :<>
        
        
        
        <div className='flights-header'>
      <h2 className='flights-title'>  My Flights  </h2>
        </div>
        
        <div className="container">
              <div className="row">
        {
                flights?.length > 0
                ? (<>
                    {displayFlights}
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
                        <h2>No Flights found</h2>
                )
            }
    </div></div></>}</>}

</div>)
}

export default ViewAirlineFlights