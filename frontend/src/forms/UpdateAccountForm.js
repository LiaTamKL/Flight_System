
import React, { useContext,} from 'react'
import AuthContext from '../context/authentication'


const UpdateAccountForm = ()=>{
    let {user} = useContext(AuthContext)
    return(
        <input type="email" name="email" placeholder="Email" defaultValue = {user ?(user.email):null} required/>
    )
}

export default UpdateAccountForm