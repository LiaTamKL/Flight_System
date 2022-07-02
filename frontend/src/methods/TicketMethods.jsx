import React from 'react'
import GetCookie from "../utilities/csrf_token";




const ViewMyTickets = async (authToken) => {
   var csrftoken = GetCookie('csrftoken')

    let response = await fetch('/backend/api/customer_api', {
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authToken.access),
          'X-CSRFToken': csrftoken
      }})

  let data = await response.json()
  return {'data':data, 'status':response.status}}


// const FlightByTicket = async (tickets) => {
//   tickets?.map((ticket) => (
    
//     // Blog.objects.filter(pk__in=[1, 4, 7])
//   ))

  

// }


// needs updateing 
// ############################################################

const CreateTicket = async  (submitted) => {
    fetch(`/backend/tickets/create`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submitted)
    }).then(() => {
    console.log('flight added')
    });

}




const UpdateTicket = async (submitted , flightid) => {

  fetch(`/backend/tickets/${flightid}/update` , {
    method: "PUT",
    headers: {
              'content-Type': 'application/json'
    },
    remaining_tickets: JSON.stringify(submitted)
  })

}


let DeleteTicket = async(flightid) => {
  fetch(`/backend/tickets/${flightid}/delete` , {
    method: "DELETE",
    headers: {
              'content-Type': 'application/json'
    }
  })

}


export { DeleteTicket , UpdateTicket , CreateTicket ,ViewMyTickets }


