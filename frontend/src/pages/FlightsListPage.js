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
        <div className='flights'>
          <div className='flights-header'>
            <h2 className='flights-title'>&#9782; Flights </h2>
            <p className='flights-count'>{flights.length}</p>
          </div>



            <div className="flights-list">         
                    {flights.map((flight, index) => (
                    <ListItem key={index} flight={flight} />
                    
                ))}

            </div>  
            <AddCreateButton />
        </div>
  )
}


export default FlightsListPage