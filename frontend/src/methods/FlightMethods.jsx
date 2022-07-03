import React from 'react'


// const GetFlightMethod = async (flightid) => {
//   let response = await fetch(`/backend/flights/${flightid}/`)
//   let data = await response.json()
//   return data

// }

// const CreateFlight = async  (submitted) => {
//     fetch(`/backend/flights/create`, {
//       method: "POST",
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(submitted)
//     }).then(() => {
//     console.log('flight added')
//     });

// }


// const UpdateFlight = async (submitted , flightid) => {

//   fetch(`/backend/flights/${flightid}/update` , {
//     method: "PUT",
//     headers: {
//               'content-Type': 'application/json'
//     },
//     remaining_tickets: JSON.stringify(submitted)
//   })

// }


// let DeleteFlight = async(flightid) => {
//   fetch(`/backend/flights/${flightid}/delete` , {
//     method: "DELETE",
//     headers: {
//               'content-Type': 'application/json'
//     }
//   })

// }


// export { CreateFlight , UpdateFlight , DeleteFlight ,GetFlightMethod }


