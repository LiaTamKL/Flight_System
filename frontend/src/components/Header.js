import React, { useContext } from 'react'
import AuthContext from '../context/authentication'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'


let admin_options = [
  { value: 'admin/view_specific', label: 'Search user' },
  { value: 'admin/view_admins', label: 'All Admins' },
  { value: 'admin/view_airlines', label: 'All Airlines' }
]

let cust_options  = [
  { value: 'cust/view_my_tickets', label: 'View my tickets' }
]

let airline_options = [
  { value: 'airline', label: 'Search for flight' },
  { value: 'airline/add_fli', label: 'Add flight' },
]

const Header = () => {
  let nav = useNavigate()

  const handleNavigateSelect = (url) => {
    console.log(url)
    nav(`/${url}`)
  }
  let {user, logout} = useContext(AuthContext)

  return (
    <div className='app-header'>
        <h1>Flight list</h1>
        <br/>
        {user ? (<>{user.account_role === 'Admin' ? (<>
                  <Link to="/admin" >Admin page</Link>
                  <Select onChange={e=>handleNavigateSelect(e.value)} options={admin_options}/></>
                ):<></>}
                {user.account_role === 'Customer' ? (<>
                  <Link to="/cust" >Customer page</Link>
                  <Select onChange={e=>handleNavigateSelect(e.value)} options={cust_options}/></>
                ):<></>}
                {user.account_role === 'Airline' ? (<>
                  <Link to="/airline" >Airline page</Link>
                  <Select onChange={e=>handleNavigateSelect(e.value)} options={airline_options}/>
                  </>):<></>}
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