
import React, { useContext,} from 'react'
import AuthContext from '../context/authentication'

export const CheckPasswords = (e)=>{
    if (e.target.password.value===e.target.password2.value && e.target.password.value.length === 8){
        return true
    }
    else{return false}
}

const AccountForm = ()=>{
    let {user} = useContext(AuthContext)
    return(
        <>
        <input type="text" name="username" placeholder="Username" defaultValue = {user ?(user.username):null} required />
        <input type="email" name="email" placeholder="Email" defaultValue = {user ?(user.email):null} required/>
        <input type="password" name="password" minLength="8" maxLength='8' placeholder="Password" required/>
        <input type="password" name="password2" placeholder="Confirm Password" required/>
        </>
    )
}


export default AccountForm