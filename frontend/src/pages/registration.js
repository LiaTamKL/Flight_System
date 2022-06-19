import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import AccountForm from '../forms/AccountForm'
import { CheckPasswords } from '../forms/AccountForm'
import CustomerForm from '../forms/CustomerForm'

const Register= () => {
    let nav = useNavigate()
    let [message, setMessage] = useState(null)

    let register = async (e) =>{
        e.preventDefault()
        if (CheckPasswords(e)===false){
            setMessage('Passwords must match and be 8 characters long')
        }
        else{
        //change the url when final package
        let response = await fetch('http://127.0.0.1:8000/backend/unknownfornow',{
                method:'POST',
                headers:{
                        'Content-Type':'application/json'
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
            setMessage(`Something went wrong. Status: ${response.status}: ${data.detail}`)}

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
    <h1>to add to here: a fetch which will be imported as a component and two form components once they're made</h1>
    <form onSubmit={(e)=>test(e)}>
        <AccountForm/>
        <CustomerForm/>
        <input type="submit"/>
    </form>
    
    </>
    
    )
    }

export default Register