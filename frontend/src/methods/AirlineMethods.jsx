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
  
  
  export { CreateAirlineMethod , UpdateAirlineMethod , DeleteAirlineMethod, GetAirlineMethod }
  
  
  