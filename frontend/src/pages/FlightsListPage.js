import React, {useState, useEffect,useRef} from 'react'
import ListIFlightitem from '../components/ListIFlightitem'
import AddCreateButton from '../components/AddCreateButton'





const FlightsListPage = ({ filteredFlights }) => {

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



      return (
        <div className='all'>
          <div className='all-header'>
            <h2 className='all-title'>&#9782; Flights </h2>
            <p className='all-count'>{filteredFlights?.length}</p>
          </div>


          <div className="all-list">         
                    {filteredFlights?.map((flight, index) => (
                    <ListIFlightitem key={index} flight={flight} />
                    
                ))}

            </div>  
            <AddCreateButton />
        </div>
  )
}


export default FlightsListPage