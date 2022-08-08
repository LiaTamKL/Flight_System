import React, {useState} from 'react'
import ReactPaginate from "react-paginate"
import FlightCard from './FlightPage/FlightCard'


const Pagination = (props) => {
    const [pagenumber, setPageNumber] = useState(0)
    const itemsPerPage = 6
    const pagesSeen = pagenumber * itemsPerPage

    let sourcePage = props.sourcePage  
    let title =  null
    let displayitems = null
    let changePage = null
    let pageCount = null
    let itemsLength = null



    if (sourcePage === 'customerPage')
    {
        if (props.myFlights!==undefined){
            displayitems = props.myFlights.slice(pagesSeen, pagesSeen + itemsPerPage).map((myFlight, index)=>{
            
            return (
                    <FlightCard key={index} custFlight={myFlight} countries={props.countries}/>

                )})
                pageCount = Math.ceil(props.myFlights.length / itemsPerPage)
            }
                changePage = ({selected})=>{
                    setPageNumber(selected)
                }
        title  =  `Tickets of ${props.userData?.first_name} ${props.userData?.last_name}`
        itemsLength = (props.myFlights?.length > 0)
    }

    
    if (sourcePage === 'flightListPage')
    {
        if (props.filteredFlights!==undefined){
            displayitems = props.filteredFlights.slice(pagesSeen, pagesSeen + itemsPerPage).map((flight, index)=>{
              var myticket 
              if (props.myFlights){
                myticket = props.myFlights.find(ticket=> ticket.flight.id===flight.id)}
              return (
        
                      <FlightCard key={index} flight={flight} custFlight={myticket} countries={props.countries}  />
                      
                )})
                pageCount = Math.ceil(props.filteredFlights.length / itemsPerPage)
              }
               changePage = ({selected})=>{
                    setPageNumber(selected)
                }

                title  = "Flights Found"
                itemsLength = (props.filteredFlights?.length > 0)
    }




    return (
        <>
        <div className='flights-header'>
        <h2 className='flights-title'> { title }  </h2>
        </div>

                <div className="container">
                <div className="row">
                        
            {
                    itemsLength
                    ? (<>
                        {displayitems}
                        <div className='pagination-container' >
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
                        </div>
                        </>
                    ) :(
                    <></>
            )}
                </div>  
            </div>
        </>  

        )
}

export default Pagination