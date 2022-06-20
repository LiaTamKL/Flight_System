
import React, { useContext,} from 'react'
import AuthContext from '../context/authentication'


const UpdateAccountForm = ()=>{
    let {user} = useContext(AuthContext)
    return(
        <>
        <input type="email" name="email" placeholder="Email" defaultValue = {user ?(user.email):null} required/>
        <input type="password" name="password" minLength="8" maxLength='8' placeholder="Password" required/>
        <input type="password" name="password2" placeholder="Confirm Password" required/>
        </>
    )
}

export default UpdateAccountForm