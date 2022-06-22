import GetCookie from "../utilities/csrf_token";
import AuthContext from "../context/authentication";
import {useContext} from "react";


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
    
export default GetUsers