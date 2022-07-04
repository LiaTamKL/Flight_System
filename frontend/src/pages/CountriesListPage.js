import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddCreateButton from '../components/AddCreateButton'


const CountriesListPage = () => {
     let [Countries , setCountries] = useState([])
    

     
     useEffect(() => {
        getCountries()
     }, [])
  
     
     let getCountries = async () => {
        let response = await fetch('/backend/Countries')
        let data = await response.json()
        setCountries(data)
     }

      return (
        <div className='all'>
          <div className='all-header'>
            <h2 className='all-title'>&#9782; Countries </h2>
            <p className='all-count'>{Countries.length}</p>
          </div>



            <div className="all-list">         
                    {Countries.map((Country, index) => (
                    <ListItem key={index} Country={Country} />
                    
                ))}

            </div>  
            <AddCreateButton />
        </div>
  )
}


export default CountriesListPage