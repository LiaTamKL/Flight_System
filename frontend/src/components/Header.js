import React, { useContext } from 'react'
import AuthContext from '../context/authentication'
import { Link } from 'react-router-dom'

const Header = () => {
  let {user} = useContext(AuthContext)
  return (
    <div className='app-header'>
        <h1>Flight list</h1>
        <br/>
        {user ? (
                 <p>Logout</p>
            ): (
                <Link to="/login" >Login</Link>
            )}


    </div>
  )
}

export default Header