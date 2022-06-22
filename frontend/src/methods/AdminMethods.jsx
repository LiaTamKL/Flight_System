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

export default GetUsers