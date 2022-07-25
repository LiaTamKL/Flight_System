
import React, {useState, useEffect, useContext} from 'react'
import { useLocation } from 'react-router-dom' ;
import { FilteredFlightsMethod } from "../methods/FilterMethods"
// import ReactPaginate from "react-paginate"
import AuthContext from "../context/authentication";
import { AllCountries } from '../methods/CountriesMethods';
// import FlightCard from '../components/FlightPage/FlightCard'
import { ViewMyTickets } from '../methods/TicketMethods';
import "./PagesCss/Pages.css"
import  Pagination from "../components/Pagination";


const FlightsListPage = () => {
  const { state } = useLocation();
  let [myFlights, setMyFlights] = useState(null);
  let[filteredFlights, setFilteredFlights] = useState();
  let flightSearchParams = {'fromSearchOption':0, 'toSearchOption':0 ,departureTime:"", arrivalTime:""}
  const [countries, setCountries] = useState([]);
  let {user, authToken} = useContext(AuthContext)
  // const [pagenumber, setPageNumber] = useState(0)
  // const flightsPerPage = 6
  // const pagesSeen = pagenumber * flightsPerPage

  useEffect(() => {
      
  if(!state) {getfilteredflights(flightSearchParams) }
  else { getfilteredflights(state.flightSearchParams)}

    }, []);


/**
* gets filtered search results for flights. sets the results and all countries from the DB. if user is customer, sets myflights based on tickets from the db
* @param  {Dictionary} flightSearchParams the parameters you wish to filter by (if none, all flights returned)
*/
  let getfilteredflights = async (flightSearchParams) => {

      let filtered = await FilteredFlightsMethod(
        {
          departureTime: flightSearchParams.departureTime,
          arrivalTime: flightSearchParams.arrivalTime,
          fromSearchOption:flightSearchParams.fromSearchOption,
          toSearchOption:flightSearchParams.toSearchOption
        }
    );

      setFilteredFlights(filtered);
      let country_data = await AllCountries()
      if (country_data){
          setCountries(country_data)
      if (user && user?.account_role === 'Customer'){      
      let result = await ViewMyTickets(authToken?authToken:null)
      let data =  result.data
      let status = result.status

      if (status ===200){setMyFlights(data)}
      } 
  }
  }




  // if (filteredFlights!==undefined){
  //   var displayFlights = filteredFlights.slice(pagesSeen, pagesSeen + flightsPerPage).map((flight, index)=>{
  //     var myticket 
  //     if (myFlights){
  //       myticket = myFlights.find(ticket=> ticket.flight.id===flight.id)}
  //     return (

  //             <FlightCard key={index} flight={flight} custFlight={myticket} countries={countries}  />
              
  //       )})
  //       var pageCount = Math.ceil(filteredFlights.length / flightsPerPage)
  //     }
  //       const changePage = ({selected})=>{
  //           setPageNumber(selected)
  //       }



  return (
    // <>
    <Pagination 
      sourcePage = {"flightListPage"} 
      myFlights = {myFlights} 
      filteredFlights = {filteredFlights}  
      countries={countries} 
      />

    // </> 
    // <>

    // <div className='flights-header'>
    //   <h2 className='flights-title'>  Flights Found  </h2>
    // </div>

    //         <div className="container">
    //           <div className="row">
                     
    //       {
    //             filteredFlights?.length > 0
    //             ? (<>
    //                 {displayFlights}
    //                 <ReactPaginate
    //                 className= {"pagination"}
    //                 previousLabel = {'Back'}
    //                 nextLabel = {'Next'}
    //                 pageCount={pageCount}
    //                 onPageChange={changePage}
    //                 siblingCount = {0}
    //                 containerClassName={""}
    //                 previousLinkClassName={"btn btn-outline-info"}
    //                 nextLinkClassName={"btn btn-outline-info"}
    //                 />
    //                 </>
    //             ) :(
    //               <></>
    //       )}
    //         </div>  
    //     </div>
    //   </>  
  )
}



export default FlightsListPage
