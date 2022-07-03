import React from 'react'
import GetCookie from "../utilities/csrf_token";




const ViewMyTickets = async (authToken) => {
  let csrftoken = GetCookie('csrftoken')

  let response = await fetch('/backend/api/customer_api', {
      method:'GET',
      headers:{
          'Content-Type':'application/json',
          'Authorization':'Bearer ' + String(authToken.access),
          'X-CSRFToken': csrftoken
      }})

  let data = await response.json()
  return {'data':data, 'status':response.status}}




const CreateTicket = async (flight_id, authToken) => {
    let csrftoken = GetCookie('csrftoken')
    let response = await fetch(`/backend/api/customer_api`, {
    
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + String(authToken.access),
        'X-CSRFToken': csrftoken

      },
      body:JSON.stringify({
        "flight":flight_id
      })})

    let data = await response.json()
    return {'data':data, 'status':response.status}
      
}




let RemoveTicket = async(flight_id, ticket_id, authToken) => {
  let csrftoken = GetCookie('csrftoken')

  let response = await fetch(`/backend/api/customer_api`, {
  
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + String(authToken.access),
      'X-CSRFToken': csrftoken

    },
    body:JSON.stringify({
      "flight":flight_id,
      "ticket":ticket_id
    })})

  let data = await response.json()
  return {'data':data, 'status':response.status}

  }
export { RemoveTicket  , CreateTicket ,ViewMyTickets }


