import React from 'react'


const CreateFlight = async  (submitted) => {
    console.log(submitted)

    fetch(`/backend/flights/create`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submitted)
    }).then(() => {
    console.log('flight added')
    });

}


const UpdateFlight = async (submitted , flightid) => {

  fetch(`/backend/flights/${flightid}/update` , {
    method: "PUT",
    headers: {
              'content-Type': 'application/json'
    },
    remaining_tickets: JSON.stringify(submitted)
  })

}


export { CreateFlight , UpdateFlight }

