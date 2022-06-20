import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddCreateButton from '../components/AddCreateButton'





const FlightsListPage = () => {
     let [flights , setFlights] = useState([])
    

     
     useEffect(() => {
        getFlights()
     }, [])
  
     
     let getFlights = async () => {
        let response = await fetch('/backend/flights')
        let data = await response.json()
        setFlights(data)
     }

      return (
        <div className='all'>
          <div className='all-header'>
            <h2 className='all-title'>&#9782; Flights </h2>
            <p className='all-count'>{flights.length}</p>
          </div>



            <div className="all-list">         
                    {flights.map((flight, index) => (
                    <ListItem key={index} flight={flight} />
                    
                ))}

            </div>  
            <AddCreateButton />
        </div>
  )
}


export default FlightsListPage