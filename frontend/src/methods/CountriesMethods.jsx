import React from 'react'


const GetCountryMethod = async (countryid) => {
  let response = await fetch(`/backend/contries/${countryid}/`)
  let data = await response.json()
  return data

}

const CreateCountryMethod  = async  (submitted) => {
    console.log(submitted)

    fetch(`/backend/contries/create`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submitted)
    }).then(() => {
    console.log('flight added')
    });

}

const UpdateCountryMethod  = async (submitted , countryid) => {

  fetch(`/backend/contries/${countryid}/update` , {
    method: "PUT",
    headers: {
              'content-Type': 'application/json'
    },
    remaining_tickets: JSON.stringify(submitted)
  })

}


let DeleteCountryMethod  = async(countryid) => {
  fetch(`/backend/contries/${countryid}/delete` , {
    method: "DELETE",
    headers: {
              'content-Type': 'application/json'
    }
  })

}


export { CreateCountryMethod , UpdateCountryMethod , DeleteCountryMethod, GetCountryMethod }


