import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import AccountForm from '../forms/AccountForm'
import { CheckPasswords } from '../forms/AccountForm'
import CustomerForm from '../forms/CustomerForm'
import UserForm from '../methods/UserMethods'

const Register= () => {
    let nav = useNavigate()
    let [message, setMessage] = useState(null)
    const [errors, setErrors] = useState([])

    let register = async (e) =>{
        e.preventDefault()
        setErrors([])
        if (CheckPasswords(e)===false){
            setMessage('Passwords must match and be 8 characters long')
        }
        else{
        setMessage('')

        //change the url when final package
        let result = await UserForm(e, 'Customer', 'POST', '/backend/api/user_api')
        let data =  result.data
        let status = result.status
        
        if (status ===200){
            console.log('successful registration, ', {data})
            setMessage(`successful registration of ${e.target.username.value}`)
            nav('/login')
        }
        else{
            setMessage(`Something went wrong. Status: ${status}.`)
            setErrors(data)
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