
import AuthContext from '../context/authentication'
import React, { useContext,} from 'react'
import UpdateAccountForm from '../forms/UpdateAccountForm'
import CustomerForm from '../forms/CustomerForm'
import AirlineForm from '../forms/AirlineForm'
import AdminForm from '../forms/AdminForm'
import { useState, useEffect } from 'react'
import { UpdateUser, getUserInfo } from '../methods/UserMethods'
import { Link } from "react-router-dom";

const UpdatePage = () =>{
    let {user, authToken, logout} = useContext(AuthContext)
    let [userData, setUserData]= useState([])
    let [message, setMessage] = useState()

    useEffect(()=>{
        GetLoggedUserData()
    }, [])

    let GetLoggedUserData = async() =>{
        if (!user.is_superuser){
            let result = await getUserInfo(authToken)
            if(result.status === 200){
                setUserData(result.data)
        }
        else{
            console.log(result.status)
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
        }else{
            var context = {
                'email':e.target.email.value, 
                'name': e.target.name.value,
                'country': e.target.country.value,}
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
    <Link className="btn btn-primary btn-sm" to="/update/password" >Change Password</Link>
    <br/><br/>
    <p className="alert alert-warning">Warning: this will ask you to log back in if you update your account</p>
    {message? (<p className="alert alert-warning">{message}</p>):<></>}


    <form onSubmit={(e)=>handleSubmit(e)}>
        <UpdateAccountForm/>
                {user.account_role === 'Airline' ? (
                    <AirlineForm userData={userData}/>
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
        <input className="btn btn-primary btn-sm" type="submit"/>
    </form>
    
    </>
)

}

export default UpdatePage