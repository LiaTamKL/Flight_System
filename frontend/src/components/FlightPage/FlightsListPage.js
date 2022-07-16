
import React, {useState, useEffect} from 'react'
// import AddCreateButton from '../components/AddCreateButton'
import { useLocation } from 'react-router-dom' ;
import { FilteredFlightsMethod} from "../../methods/FilterMethods"
import ReactPaginate from "react-paginate"

import FlightCard from './Components/FlightCard'
import'./FlightPage.css'


const FlightsListPage = () => {
  const { state } = useLocation();
  let[filteredFlights, setFilteredFlights] = useState();


  useEffect(() => {
      
  if(!state) {getfilteredflights() }
  else { setFilteredFlights(state.filteredFlights)}

    }, []);

    let getfilteredflights = async () => {
      let filtered = await FilteredFlightsMethod(
        {departureTime: "",
        arrivalTime: "",
        fromSearchOption:"",
        toSearchOption:""}
        );
      setFilteredFlights(filtered);
  }

  const [pagenumber, setPageNumber] = useState(0)
  const flightsPerPage = 5
  const pagesSeen = pagenumber * flightsPerPage


  if (filteredFlights!==undefined){
    var displayFlights = filteredFlights.slice(pagesSeen, pagesSeen + flightsPerPage).map((flight, index)=>{
    
    //########################
    // customer check
    //########################
    return (
      <div className="container">
      <div className="row">
          <FlightCard key={index} flight={flight}/>
          {/* <ListIFlightitem key={index} flight={flight} />           */}
      
      </div>
</div> 
       

    )})
    var pageCount = Math.ceil(filteredFlights.length / flightsPerPage)
  }

    const changePage = ({selected})=>{
        setPageNumber(selected)
    }

  return (
        <div className='all'>
          <div className='all-header'>
            <h2 className='all-title'>&#9782; Flights Found  </h2>
            {/* <p className='all-count'>{filteredFlights?.length}</p> */}
          </div>

          <div className="all-list">
                     
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
