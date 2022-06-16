import React, { useState , useEffect } from 'react'
import { format, setSeconds } from "date-fns";
import './Form.css'
import Select from 'react-select'


const CreateFlight = () => {

  let [airline, setAirline] = useState('')
  let [originCountry, setOriginCountry] = useState('')
  let [destinationCountry, setDestinationCountry] = useState('')

  let [tickets, setTickets] = useState(1)


  let [airlineOptions, setAirlineOptions] = useState()
  let [countryOptions, setCountryOptions] = useState()

  let [departureTime, setDepartureTime] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm")) ;
  let [arrivalTime, setArrivalTime] = useState(departureTime) 
  let [isPending, setisPending] = useState(false) 
  let [errorMessage, setErrorMessage] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(departureTime)
    const submitted = {airline, originCountry , destinationCountry , departureTime , arrivalTime, tickets} 
    // console.log(submitted)
    setisPending(true);

    fetch(`/backend/flights/create`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submitted)
    }).then(() => {
    console.log('flight added')
    setisPending(false);
    })
}


useEffect(() => {
    getAirlines()
    getContries()
  // eslint-disable-next-line
  }, [])


let getAirlines = async () => {
  let response = await fetch(`/backend/airlines`)
  let data = await response.json()
  setAirlineOptions(data.map((airline) => ({value:airline.id, label:airline.name})))

  
  }


let getContries = async () => {
  let response = await fetch(`/backend/countries`)
  let data = await response.json()
  setCountryOptions(data.map((country) => ({value:country.id, label:country.country_name})))
    
  }
  
  

  let time_validation = () =>{

    let dep = new Date(arrivalTime).getTime()
    let arr = new Date(departureTime).getTime()
    if (arr < dep) {
      setArrivalTime(departureTime)
    }
    
  }


  // let getOptions = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]

  // let getOptions = options.map((airline) => {value:{airline.id} label:{airline.id}})



  return (
    <div className='create'>
    <h2>Create New Flight</h2>

        <form onSubmit={handleSubmit}>
            <label>Airline</label>
            {/* <div className='fancy-select'> */}
              
              <Select 
                required
                options ={airlineOptions}
                isSearchable = {true}
                defaultValue = {null}
                // isMulti  = {true}
                onChange ={(e) => {setAirline(e.value)}}
                
                // More props
                //https://react-select.com/props#select-props
              />
        

            <label>Origin Country</label>
            <Select 
                required
                options ={countryOptions}
                isSearchable = {true}
                defaultValue = {null}
                // isMulti  = {true}
                onChange ={(e) => {setOriginCountry(e.value)}}

              />

            <label>Destination Country</label>
            <Select 
                required
                options ={countryOptions}
                isSearchable = {true}
                defaultValue = {null}
                // isMulti  = {true}
                onChange ={(e) => {setDestinationCountry(e.value)}}
                
              />


          {/* </div> */}


            <label>Departure Time</label>
            <input 
                type='datetime-local'
                required
                // onKeyDown={(e) => e.preventDefault()}
                value={departureTime}
                
                // min={departureTime}
                
                onChange = {
                  (e) => {
                    setDepartureTime(e.target.value)  
                    setArrivalTime(e.target.value) 
                }
              }
                >
                </input>
                


            <label>Arrival Time</label>
            <input 
                type='datetime-local'
                required
                min={departureTime}
                value = {arrivalTime}
                
                onChange ={(e) => {
                  // time_validation(e.target.value)
                  setArrivalTime(e.target.value)
                }
            }
                >

                </input>
          {/* <span style={{
            fontWeight: 'bold',
              color: 'red',
                }}>{errorMessage}</span> */}
                
            <label>Number Of Tickets</label>
            <input
                required
                type='number'
                step="1"
                min="1"
                value={tickets}
                onChange ={(e) => setTickets(e.target.value)}
                >

                </input>

            {!isPending && <button>Add Flight</button>}
            {isPending && <button disabled>Adding Flight....</button>}


        </form>
    </div>
   
   
  
  )

}

export default CreateFlight