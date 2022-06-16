import React, { useContext } from 'react'
import AuthContext from '../context/authentication'
import { Link } from 'react-router-dom'

const Header = () => {
  let {user} = useContext(AuthContext)
  return (
    <div className='app-header'>
        <h1>Flight list</h1>
        <br/>
        {user ? (<>{user.account_role === 'Admin' ? (
                  <Link to="/admin" >Admin page</Link>
                ):<span></span>}
                 <p>Logout</p>
                 <Link to="/update" >Update</Link></>
            ):(
                <Link to="/login" >Login</Link>
            )}


    </div>
  )
}

export default Header