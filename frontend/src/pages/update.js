
import AuthContext from '../context/authentication'
import React, { useContext,} from 'react'
import UpdateAccountForm from '../forms/AccountForm'
import CustomerForm from '../forms/CustomerForm'
import AirlineForm from '../forms/AirlineForm'
import AdminForm from '../forms/AdminForm'
import { useState, useEffect } from 'react'

const UpdatePage = () =>{
    let {user, authToken} = useContext(AuthContext)
    let [userData, setUserData]= useState([])

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

return(
    <form onSubmit={(e)=>console.log(e)}>
        <UpdateAccountForm/>
                {user.account_role === 'Airline' ? (
                    <AirlineForm userInfo={userData}/>
                ):<></>}
                {user.account_role === 'Customer' ? (<>
                    <CustomerForm/></>
                ):<></>}
                {!user.account_role==='Admin' ?(<>{!user.is_superuser? (<>
                    <AdminForm/>
                  </>
                ):<></>}  
                  </>):<></>}
                  <br/>
        <input type="submit"/>
    </form>
)

}

export default UpdatePage