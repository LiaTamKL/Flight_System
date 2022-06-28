
import AuthContext from '../context/authentication'
import React, { useContext,} from 'react'
import UpdateAccountForm from '../forms/UpdateAccountForm'
import CustomerForm from '../forms/CustomerForm'
import AirlineForm from '../forms/AirlineForm'
import AdminForm from '../forms/AdminForm'
import { useState, useEffect } from 'react'
import { UpdateUser } from '../methods/UserMethods'

const UpdatePage = () =>{
    let {user, authToken, logout} = useContext(AuthContext)
    let [userData, setUserData]= useState([])
    let [message, setMessage] = useState()

    useEffect(()=>{
        GetLoggedUserData()
    }, [])

    let GetLoggedUserData = async() =>{
        if (!user.is_superuser){
        let response = await fetch('http://127.0.0.1:8000/backend/api/user_api', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authToken.access)
            }
        })
        let data = await response.json()
        console.log(data)
        if(response.status === 200){
            console.log(data.name)
            setUserData(data)
        }
        else{
            console.log(response.statusText)
        }}

    }

    let handleSubmit = async(e)=>{
        e.preventDefault();
        if (user.account_role==='Customer'){
            var context = {
                            'email':e.target.email.value, 
                            'first_name': e.target.first_name.value,
                            'last_name': e.target.last_name.value,
                            'address':e.target.address.value,
                            'phone_number':e.target.phone_number.value,
                            'credit_card_no': e.target.credit_card_no.value}
        }else if (user.is_superuser){
            var context = {'email':e.target.email.value}
        }
        else if(user.account_role==='Admin'){
            var context = {
                'email':e.target.email.value, 
                'first_name': e.target.first_name.value,
                'last_name': e.target.last_name.value,}
        }
        let result = await UpdateUser(context, authToken)
        if (result.status===200){
            logout()
        }
        else{
            setMessage(result.data)
        }
        
    }

return(<>
    <p className="alert alert-warning">Warning: this will ask you to log back in if you update your account</p>
    {message? (<p className="alert alert-warning">{message}</p>):<></>}
    <form onSubmit={(e)=>handleSubmit(e)}>
        <UpdateAccountForm/>
                {user.account_role === 'Airline' ? (
                    <AirlineForm userInfo={userData}/>
                ):<></>}
                {user.account_role === 'Customer' ? (<>
                    <CustomerForm userData={userData}/></>
                ):<></>}
                {user.account_role==='Admin' ?(<>{user.is_superuser===false? (<>
                    <AdminForm userData={userData}/>
                  </>
                ):<></>}  
                  </>):<></>}
                  <br/>
        <input type="submit"/>
    </form></>
)

}

export default UpdatePage