
import React, {useState, useEffect, useContext} from 'react'
// import AddCreateButton from '../components/AddCreateButton'
import { useLocation ,useNavigate } from 'react-router-dom' ;
import { FilteredFlightsMethod } from "../methods/FilterMethods"
import ReactPaginate from "react-paginate"
import AuthContext from "../context/authentication";
import { AllCountries } from '../methods/CountriesMethods';
import FlightCard from '../components/FlightPage/FlightCard'
import "./Pages.css"

const FlightsListPage = () => {
  const { state } = useLocation();
  // let  navigate = useNavigate();
  let {user, authToken} = useContext(AuthContext);
  let[filteredFlights, setFilteredFlights] = useState();
  let flightSearchParams = {'fromSearchOption':0, 'toSearchOption':0 ,departureTime:"", arrivalTime:""}
  const [countries, setCountries] = useState([]);

  useEffect(() => {
      
  if(!state) {getfilteredflights(flightSearchParams) }
  else { getfilteredflights(state.flightSearchParams)}

    }, []);

/**
* gets filtered search results for flights. sets the results and all countries from the DB
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

  }
  }

  const [pagenumber, setPageNumber] = useState(0)
  const flightsPerPage = 6
  const pagesSeen = pagenumber * flightsPerPage

  if (filteredFlights!==undefined){
    var displayFlights = filteredFlights.slice(pagesSeen, pagesSeen + flightsPerPage).map((flight, index)=>{
    
      return (

              <FlightCard key={index} flight={flight} countries={countries} custPage = {false} />

        )})
        var pageCount = Math.ceil(filteredFlights.length / flightsPerPage)
      }
        const changePage = ({selected})=>{
            setPageNumber(selected)
        }

  return (
    <>
    <div className='flights-header'>
      <h2 className='flights-title'>  Flights Found  </h2>
    </div>

            <div className="container">
              <div className="row">
                     
          {
                filteredFlights?.length > 0
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
                ) :(
                  <></>
          )}
            </div>  
        </div>
      </>  
  )
}



export default FlightsListPage
