import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthenticationProvider = ({children}) => {
    let [authToken, setAuthToken] = useState(()=> localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [account, setAccount] = useState(()=> localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null)
    let [loading, setLoading] = useState(true)

    useEffect(()=>{
        if(loading){
            RefreshToken()
        }

        let four_minutes = 1000 * 6000 * 4
        let interval = setInterval(()=>{
            if(authToken){
                RefreshToken()
            }
        }, four_minutes)
        return ()=> clearInterval(interval)
    }, [authToken,loading]
    
    )

    let nav = useNavigate()

    let logout = () => {
        setAuthToken(null)
        setAccount(null)
        localStorage.removeItem('authToken')
        nav('/')
    }

    let RefreshToken = async ()=>{
        console.log('HELLO IM REFRESHING NOW')
        let response = await fetch('http://127.0.0.1:8000/backend/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authToken?.refresh})
        })
       let data = await response.json()
       if (response.status ===200){
            setAuthToken(data)
            setAccount(jwt_decode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
       }else{
           logout()
       }
      if(loading){
        setLoading(false)
    }}

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
            localStorage.setItem('authToken', JSON.stringify(data))
            nav('/')


        }
        else{
            alert(`Something went wrong. Status: ${response.status}: ${data.detail}`)
        }
        //console.log(data.detail) <-- how to get the error
    }
    let contextData = {
        loginUser:loginUser,
        user: account,
        logout: logout,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}









