import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext


export const Authentication_Provider = ({children}) => {
    let [authTokens, setAuthToken] = useState(null)
    let [account, setAccount] = useState(null)
    let [loading, setLoading] = useState(true)

    let loginUser = async (e)=>{
        e.preventDefault()
        //change the url when final package
         let response = await fetch('http://127.0.0.1:8000/backend/token/',{
             method:'POST',
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
         })
        let data = await response.json()
        if (response.status ===200){
            setAuthToken(data)
            setAccount(jwt_decode(data.access))


        }
        else{
            alert(`Something went wrong. Status: ${response.status}: ${data.detail}`)
        }
        //console.log(data.detail) <-- how to get the error
    }
    let contextData = {
        loginUser:loginUser,
        user: account
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

}









