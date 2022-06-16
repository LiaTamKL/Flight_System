import React, { useContext } from 'react'
import AuthContext from '../context/authentication'

const Header = () => {
  let {user} = useContext(AuthContext)
  return (
    <div className='app-header'>
        <h1>Flight list</h1>


    </div>
  )
}

export default Header