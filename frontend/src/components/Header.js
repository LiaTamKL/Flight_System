import React, { useContext,} from 'react'
import AuthContext from '../context/authentication'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'


let admin_options = [
  { value: 'admin/view_specific', label: 'Search User' },
  { value: 'admin', label: 'All Customers' },
  { value: 'admin/view_admins', label: 'All Admins' },
  { value: 'admin/view_airlines', label: 'All Airlines' }
]

let cust_options  = [
  { value: 'cust', label: 'Search for my ticket' },
  { value: 'cust/view_my_tickets', label: 'View my tickets' }
]

let airline_options = [
  { value: 'airline', label: 'All my Flights' },
  { value: 'airline/add_flight', label: 'Add flight' },
]

let general_options = [
  { value: '', label: 'Home Page' },
  { value: 'flights', label: 'All flights' },
]
const Header = () => {
  let nav = useNavigate()

  const handleNavigateSelect = (url) => {
    nav(`/${url}`)
  }
  let {user, logout} = useContext(AuthContext)

  return (
    <div className='app-header'>
        <br/>
        <Select placeholder="General Commands" onChange={e=>handleNavigateSelect(e.value)} options={general_options}/>
        {user ? (<>{user.account_role === 'Admin' ? (<>
                  <Select placeholder="Admin Commands" onChange={e=>handleNavigateSelect(e.value)} options={admin_options}/>
                  </>
                ):<></>}
                {user.account_role === 'Customer' ? (<>
                  <Select placeholder="Customer Commands" onChange={e=>handleNavigateSelect(e.value)} options={cust_options}/></>
                ):<></>}
                {user.account_role === 'Airline' ? (<>
                  <Select placeholder="Airline Commands" onChange={e=>handleNavigateSelect(e.value)} options={airline_options}/>
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