import React, { useContext } from 'react'
import AuthContext from '../context/authentication'

const MainPage= (message) => {
    console.log('WELCOME USER')
    console.log(message)
    let {user} = useContext(AuthContext)
    return (
    <div><h1>WHAT A WONDERFUL MAIN PAGE</h1>
        <div className='app-header'>
        <br/>
        {user ? (<h2>you are a {user.account_role}. Your name is {user.main_name}, but you prefer {user.username} right?</h2>):<>
        <h2>not even logged in?</h2></>}

    </div>
    
     {!message ==={}? (<h2>{message}</h2>):<></>}</div>)
}

export default MainPage