import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import AccountForm from '../forms/AccountForm'
import { CheckPasswords } from '../forms/AccountForm'
import CustomerForm from '../forms/CustomerForm'
import UserForm from './UserMethods'


const Register = async (e) => {
    // let nav = useNavigate()
    let message 
    let errors = []

    if (CheckPasswords(e)===false){
        message = 'Passwords must match and be 8 characters long'
    }
    else{
        message=''
    //     //change the url when final package
    let result = await UserForm(e, 'Customer', 'POST', '/backend/api/user_api')
    let data =  result.data
    let status = result.status
    
    if (status !==200){errors = data}

    }


    return {message, errors}
}

export { Register }



// if (status ===200){
//     // console.log('successful registration, ', {data})
//     // message = `successful registration of ${e.target.username.value}`
//     // nav('/login')
// }
// else{
//     // message = `Something went wrong. Status: ${status}.`
//     errors = data
//     }
// }