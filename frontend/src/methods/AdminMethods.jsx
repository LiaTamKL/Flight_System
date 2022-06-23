import GetCookie from "../utilities/csrf_token";
import AuthContext from "../context/authentication";
import {useContext} from "react";
import { useNavigate } from "react-router-dom";


//insert in the authtoken and what kind of user types you're looking for (Admins, Customers, Airlines, Accounts)
//will return the end data as data and status as status in a dict. Check if the status is 200 after using.
const GetUsers = async(view, authToken) =>{
    var csrftoken = GetCookie('csrftoken')

    let response = await fetch('http://127.0.0.1:8000/backend/api/admin_api', {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authToken.access),
            'X-CSRFToken': csrftoken
        },
        body:JSON.stringify({"view":view})
    })
    let data = await response.json()
    return {'data':data, 'status':response.status}}

//insert a username and authtokens, will delete said user.
//will return the end data as data and status as status in a dict. Check if the status is 200 after using.
export const  DeleteUser = async(username,authToken)=>{
    var csrftoken = GetCookie('csrftoken')

    let response = await fetch(`http://127.0.0.1:8000/backend/api/admin_api/${username}`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authToken.access),
                'X-CSRFToken': csrftoken
            }
        })
    let data = await response.json()
    return {'data':data, 'status':response.status}}

//insert admin data as e and authtokens, will turn admin into customer.
//will return the end data as data and status as status in a dict. Check if the status is 200 after using.
export const UpdateToAdminFromCus = async(e,authToken)=>{
    var csrftoken = GetCookie('csrftoken')

    let response = await fetch('http://127.0.0.1:8000/backend/api/admin_api', {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authToken.access),
            'X-CSRFToken': csrftoken
        },
        body:JSON.stringify({"make":"Admin",
            "username":e.account,
            "first_name": e.first_name,
            "last_name": e.last_name})
    })
    let data = await response.json()
    return {'data':data, 'status':response.status}
}

//insert username and authtokens, will return said user.
//will return the end data as data and status as status in a dict. Check if the status is 200 after using.
export const GetSpecificUser = async(username, authToken) =>{
    var csrftoken = GetCookie('csrftoken')
    let response = await fetch('http://127.0.0.1:8000/backend/api/admin_api', {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authToken.access),
            'X-CSRFToken': csrftoken
        },
        body:JSON.stringify({"view":"Specific",
                            "username":username
    })
    })
    let data = await response.json()
    return {'data':data, 'status':response.status}}

//insert the logged in user, the parameters, the userrole you're trying to change this user into, authtokens and nav
//will check that: user is not trying to change own account, requested user isn't already of said userrole, that the user exists and that user isn't superuser
//will return the end data as data.
export let Check_if_User = async(user, params,role, authToken, nav)=>{
    if (user.username===params.username){
        nav('/')
    }
    let result = await GetSpecificUser(params.username, authToken)
    let data = result.data
    if (result.status === 200){
        if (data.account_role===role){
            nav('/')
        }
        if (data.is_superuser===true){
            alert('Superuser cannot be changed!')
            nav('/')
        }
    }
    else{
        alert("User does not exist")
        nav('/')}
    return(data)

    }

//insert username you wish to change, form data as e and authtokens, will turn into airline.
//will return the end data as data and status as status in a dict. Check if the status is 200 after using.
export let TurnIntoAirline=async(username,e,authToken)=>{
    var csrftoken = GetCookie('csrftoken')

    let response = await fetch('http://127.0.0.1:8000/backend/api/admin_api', {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authToken.access),
            'X-CSRFToken': csrftoken
        },
        body:JSON.stringify({"make":"Airline",
            "username":username,
            "country": e.target.country.value,
            "name": e.target.name.value})
    })
    let data = await response.json()
    return {'data':data, 'status':response.status}

}

//insert username you wish to change, form data as e and authtokens, will turn into admin.
//will return the end data as data and status as status in a dict. Check if the status is 200 after using.
export let TurnIntoAdmin=async(username,e,authToken)=>{
    var csrftoken = GetCookie('csrftoken')

    let response = await fetch('http://127.0.0.1:8000/backend/api/admin_api', {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authToken.access),
            'X-CSRFToken': csrftoken
        },
        body:JSON.stringify({"make":"Admin",
            "username":username,
            "first_name": e.target.first_name.value,
            "last_name": e.target.last_name.value})
    })
    let data = await response.json()
    return {'data':data, 'status':response.status}

}

//insert username you wish to change, form data as e and authtokens, will turn into customer.
//will return the end data as data and status as status in a dict. Check if the status is 200 after using.
export let TurnIntoCustomer=async(username,e,authToken)=>{
    var csrftoken = GetCookie('csrftoken')

    let response = await fetch('http://127.0.0.1:8000/backend/api/admin_api', {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authToken.access),
            'X-CSRFToken': csrftoken
        },
        body:JSON.stringify({"make":"Customer",
            "username":username,
            "first_name": e.target.first_name.value,
            "last_name": e.target.last_name.value,
            'address':e.target.address.value,
            'phone_number':e.target.phone_number.value,
            'credit_card_no': e.target.credit_card_no.value})
    })
    let data = await response.json()
    return {'data':data, 'status':response.status}

}

export default GetUsers