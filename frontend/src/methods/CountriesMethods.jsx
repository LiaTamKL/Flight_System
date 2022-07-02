import GetCookie from "../utilities/csrf_token";

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

/**
* Creates a new country
* @param  {Dictionary} e The information (country_name, flag)
* @param  {Dictionary} authToken The authentication token
* @return {Dictionary} The data and the response.status
* 
*/
export const CreateCountry = async(e, authToken) =>{
 var csrftoken = GetCookie('csrftoken')
 console.log("what is file 0?", e.target.flag.files[0])
 let response = await fetch('http://127.0.0.1:8000/backend/countries', {
     method:'POST',
     headers:{
         'Content-Type':'application/json',
         'Authorization':'Bearer ' + String(authToken.access),
         'X-CSRFToken': csrftoken
     },
     body:JSON.stringify({"country_name":e.target.country_name.value,
     "flag":e.target.flag.files[0],
     "flag name":e.target.flag.value
   })})
let data = await response.json()
return {'data':data, 'status':response.status}}


let DeleteCountryMethod  = async(countryid) => {
  fetch(`/backend/contries/${countryid}/delete` , {
    method: "DELETE",
    headers: {
              'content-Type': 'application/json'
    }
  })

}


export { CreateCountryMethod , UpdateCountryMethod , DeleteCountryMethod, GetCountryMethod }


