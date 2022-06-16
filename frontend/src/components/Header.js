import React, { useContext } from 'react'
import AuthContext from '../context/authentication'
import { Link } from 'react-router-dom'

const Header = () => {
  let {user, logout} = useContext(AuthContext)
  return (
    <div className='app-header'>
        <h1>Flight list</h1>
        <br/>
        {user ? (<>{user.account_role === 'Admin' ? (
                  <Link to="/admin" >Admin page</Link>
                ):<></>}
                {user.account_role === 'Customer' ? (
                  <Link to="/cust" >Customer page</Link>
                ):<></>}
                {user.account_role === 'Airline' ? (
                  <Link to="/airline" >Airline page</Link>
                ):<></>}
                 <button onClick={logout}>Logout</button>
                 <Link to="/update" >Update</Link></>
            ):(<>
                <Link to="/login" >Login</Link>
                <Link to="/Register" >Register</Link></>
            )}


    </div>
  )
}

export default Header