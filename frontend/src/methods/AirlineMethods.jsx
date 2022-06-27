import GetCookie from "../utilities/csrf_token";



const GetAirlineMethod = async (airlineid) => {
    let response = await fetch(`/backend/airlines/${airlineid}/`)
    let data = await response.json()
    return data
  
  }
  
  const CreateAirlineMethod  = async  (submitted) => {
      console.log(submitted)
  
      fetch(`/backend/airlines/create`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(submitted)
      }).then(() => {
      console.log('flight added')
      });
  
  }
  
  const UpdateAirlineMethod  = async (submitted , airlineid) => {
  
    fetch(`/backend/airlines/${airlineid}/update` , {
      method: "PUT",
      headers: {
                'content-Type': 'application/json'
      },
      remaining_tickets: JSON.stringify(submitted)
    })
  
  }
  
  
  let DeleteAirlineMethod  = async(airlineid) => {
    fetch(`/backend/airlines/${airlineid}/delete` , {
      method: "DELETE",
      headers: {
                'content-Type': 'application/json'
      }
    })
  
  }


export const ViewMyFlights = async(authToken) =>{
  var csrftoken = GetCookie('csrftoken')

  let response = await fetch('http://127.0.0.1:8000/backend/api/airline_api', {
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authToken.access),
          'X-CSRFToken': csrftoken
      }})
  let data = await response.json()
  return {'data':data, 'status':response.status}}


export const CreateMyFlight = async(e, authToken) =>{
    var csrftoken = GetCookie('csrftoken')
  
    let response = await fetch('http://127.0.0.1:8000/backend/api/airline_api', {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authToken.access),
            'X-CSRFToken': csrftoken
        },
        body:JSON.stringify({"airline":e.airline,
        "origin_country":e.originCountry,
        "destination_country":e.destinationCountry,
        "departure_time": e.departureTime,
        "landing_time":e.arrivalTime,
        "remaining_tickets":e.tickets
      })})
  let data = await response.json()
  return {'data':data, 'status':response.status}}

export const  DeleteFlightAsAirline = async(id,authToken)=>{
    var csrftoken = GetCookie('csrftoken')

    let response = await fetch(`http://127.0.0.1:8000/backend/api/airline_api/${id}`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authToken.access),
                'X-CSRFToken': csrftoken
            }
        })
    let data = await response.json()
    return {'data':data, 'status':response.status}}

  
  
  export { CreateAirlineMethod , UpdateAirlineMethod , DeleteAirlineMethod, GetAirlineMethod }
  
  
  