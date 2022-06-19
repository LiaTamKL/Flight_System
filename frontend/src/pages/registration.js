import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import AccountForm from '../forms/AccountForm'
import { CheckPasswords } from '../forms/AccountForm'
import CustomerForm from '../forms/CustomerForm'
import GetCookie from '../utilities/csrf_token'

const Register= () => {
    let nav = useNavigate()
    let [message, setMessage] = useState(null)
    const [error, setError] = useState([])
    const [errmessage, setErrMessage] = useState([])
    console.log('THE START', error, errmessage)

    let register = async (e) =>{
        var csrftoken = GetCookie('csrftoken')
        e.preventDefault()
        if (CheckPasswords(e)===false){
            setMessage('Passwords must match and be 8 characters long')
        }
        else{
        //change the url when final package
        let response = await fetch('http://127.0.0.1:8000/backend/api/user_api',{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                    },
                    body:JSON.stringify({'username': e.target.username.value,
                                        'email':e.target.email.value, 
                                        'password':e.target.password.value,
                                        'password2': e.target.password2.value,
                                        'first_name': e.target.first_name.value,
                                        'last_name': e.target.last_name.value,
                                        'address':e.target.address.value,
                                        'phone_number':e.target.phone_number.value,
                                        'credit_card_no': e.target.credit_card_no.value},
                                            )
                })
        let data = await response.json()
        if (response.status ===200){
            console.log('successful registration, ', {data})
            setMessage(`successful registration of ${e.target.username.value}`)
            nav('/login')
        }
        else{
            //console.log('!isNaN(error)', !isNaN(error))
            //console.log('error at the start of the error loop:', error)
            //setError([])
            //if (!isNaN(error)){setError([])}
            setMessage(`Something went wrong. Status: ${response.status}.`)
            for (const [key] of Object.entries(data)){
                const errors = data[key]
                //console.log(errors)
                for (const [k] of Object.entries(errors)){

                    //console.log(errors[k][0])
                    setError(error.push(errors[k][0] + ' '))
                    //console.log(error)
                    //setMessage(message + errors[k][0] )
                }
            }
            setMessage(`Something went wrong. Status: ${response.status}.`)
            console.log('END', error)
            setErrMessage(error)
            setError([])
            }

    }}

    let test = (e) =>{
        e.preventDefault()
        if (CheckPasswords(e)===false){
            setMessage('Passwords must match and be 8 characters long')}
        else{
        let data = {'username': e.target.username.value,
        'email':e.target.email.value, 
        'password':e.target.password.value,
        'password2': e.target.password2.value,
        'first_name': e.target.first_name.value,
        'last_name': e.target.last_name.value,
        'address':e.target.address.value,
        'phone_number':e.target.phone_number.value,
        'credit_card_no': e.target.credit_card_no.value}
        console.log(data)
        setMessage(`successful registration of ${e.target.username.value}`)
    }
    }
    return (
    <>
    <div id='message'>{message}</div>
    <form onSubmit={(e)=>register(e)}>
        <AccountForm/>
        <CustomerForm/>
        <input type="submit"/>
    </form>
    <ul>{errmessage.map((e)=>(
        <li>{e}</li>
                        ))}</ul>
    </>
    
    )
    }

export default Register