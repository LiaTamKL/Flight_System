import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthenticationProvider = ({children}) => {
    let [authToken, setAuthToken] = useState(()=> localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [account, setAccount] = useState(()=> localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null)
    let [loading, setLoading] = useState(true)
    let nav = useNavigate()

    /////////////////////////FUNCTIONS START HERE//////////////////////////////

    /////////////////LOG THE USER OUT, REDIRECT THEM TO MAIN PAGE/////////////////////
    let logout = () => {
        setAuthToken(null)
        setAccount(null)
        localStorage.removeItem('authToken')
        nav('/')
    }

    /////////////////REFRESH THE TOKEN, IF TOKEN MISSING, LOGS THE USER OUT AND REDIRECTS TO MAIN PAGE/////////////////////
    /////////////////IF LOADING IS STILL TRUE (ONLY TRUE AT START OF SESSION), TURNS IT INTO FALSE TO RENDER EVERYTHING/////////////////////
    let RefreshToken = async ()=>{
        console.log('HELLO IM REFRESHING NOW')
        //change the url when final package
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
            setAuthToken(null)
            setAccount(null)
            localStorage.removeItem('authToken')
       }
      if(loading){
        setLoading(false)
    }}

////////LOG THE USER IN, REDIRECT THEM TO MAIN PAGE ONCE IN///////////////////////
///////IF STATUS CODE NOT 200, TELL USER WHATS WRONG//////////////
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

    useEffect(()=>{
        /////RUN IT IF START OF SESSION////////
        if(loading){
            RefreshToken()
        }
        /////////REFRESH EVERY 4 MINUTES//////////
        let four_minutes = 1000 * 6000 * 4
        let interval = setInterval(()=>{
            if(authToken){
                RefreshToken()
            }
        }, four_minutes)
        return ()=> clearInterval(interval)
    }, [authToken,loading]
    
    )


    ///////THIS SENDS DATA TO ANY COMPONANT AND PAGE THAT USES AUTHCONTEXT//////////////

    let contextData = {
        loginUser:loginUser,
        user: account,
        logout: logout,
        authToken: authToken,
        refresh: RefreshToken
    }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}









