import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import AccountForm from '../forms/AccountForm'
import { CheckPasswords } from '../forms/AccountForm'
import CustomerForm from '../forms/CustomerForm'
import GetCookie from '../utilities/csrf_token'

const Register= () => {
    let nav = useNavigate()
    let [message, setMessage] = useState(null)
    const [errors, setErrors] = useState([])
    console.log('THE START', errors)

    let register = async (e) =>{
        var csrftoken = GetCookie('csrftoken')
        e.preventDefault()
        setErrors([])
        if (CheckPasswords(e)===false){
            setMessage('Passwords must match and be 8 characters long')
        }
        else{
        setMessage('')

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

            setMessage(`Something went wrong. Status: ${response.status}.`)
            let error = []

            //gathers all the errors into errors
            for (const [key] of Object.entries(data)){
                const er = data[key]
                for (const [k] of Object.entries(er)){
                    error.push(er[k][0] + ' ')

                }
            }
            console.log('END', errors)

            setErrors(error //prevError =>[
                //error, ...prevError]
            )
            }

    }}

    return (
    <>
    <form onSubmit={(e)=>register(e)}>
        <AccountForm/>
        <CustomerForm/>
        <br/>
        <input type="submit"/>
    </form>
    <br/>
    <div id='message'>{message}</div>
    <ul>{errors.map((e)=>(
        <li>{e}</li>
                        ))}</ul>
    </>
    
    )
    }

export default Register