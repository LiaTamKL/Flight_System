
import React, {useState, useEffect, useContext} from 'react'
// import AddCreateButton from '../components/AddCreateButton'
import { useLocation ,useNavigate } from 'react-router-dom' ;
import { FilteredFlightsMethod } from "../../methods/FilterMethods"
import ReactPaginate from "react-paginate"
import AuthContext from "../../context/authentication";

import FlightCard from './Components/FlightCard'
import'./FlightPage.css'


const FlightsListPage = () => {
  const { state } = useLocation();
  let  navigate = useNavigate();
  let {user, authToken} = useContext(AuthContext);
  let[filteredFlights, setFilteredFlights] = useState();
  let flightSearchParams = {'fromSearchOption':0, 'toSearchOption':0 ,departureTime:"", arrivalTime:""}

  useEffect(() => {
      
  if(!state) {getfilteredflights(flightSearchParams) }
  else { getfilteredflights(state.flightSearchParams)}

    }, []);



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
  }

  const [pagenumber, setPageNumber] = useState(0)
  const flightsPerPage = 5
  const pagesSeen = pagenumber * flightsPerPage


if (user?.account_role === "Customer"){ navigate ("/customer/tickets/")}


  if (filteredFlights!==undefined){
    var displayFlights = filteredFlights.slice(pagesSeen, pagesSeen + flightsPerPage).map((flight, index)=>{
    
      return (

              <FlightCard key={index} flight={flight}/>

        )})
        var pageCount = Math.ceil(filteredFlights.length / flightsPerPage)
      }

        const changePage = ({selected})=>{
            setPageNumber(selected)
        }


  return (
    <>
    <div className='all-header'>
      <h2 className='all-title'>&#9782; Flights Found  </h2>
    </div>
            <div className="container">
              <div className="row">
                     
          {
                filteredFlights?.length > 0
                ? (<>
                    {displayFlights}
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
                ) :(
                  <></>
          )}
            </div>  
        </div>
      </>  
  )
}



export default FlightsListPage

// import React, {useState, useEffect,useRef} from 'react'


    //  let [flights , setFlights] = useState()
    //   console.log(filteredFlights)
       
    // const flights = useRef(filteredflights)


     
    //  useEffect(() => {
    //   // setFlights(filteredflights)
    //   getFlights()
    //  }, [flights])
  
     
  //   let getFlights = async () => {
  //   setFlights(filteredFlights)

  //   // if(filteredflights) {setFlights(filteredflights)}
  //   // else{
  //   // let response = await fetch('/backend/flights')
  //   // let data = await response.json()
  //   // setFlights(data)
  //   // }

  // }
