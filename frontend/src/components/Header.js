// import {Navbar ,  NavLogo } from "./Navbar/Navbar";

// import ContextMenu from './Navbar/components/ContextMenu';

// let admin_options = [
//   { value: 'admin/view_specific', label: 'Search User' },
//   { value: 'admin', label: 'All Customers' },
//   { value: 'admin/view_admins', label: 'All Admins' },
//   { value: 'admin/view_airlines', label: 'All Airlines' }
// ]

// let cust_options  = [
//   { value: 'cust', label: 'Search for my ticket' },
//   { value: 'cust/view_my_tickets', label: 'View my tickets' }
// ]


// let airline_options = [ 
//   { value: 'airline', label: 'Search for flight' },
//   { value: 'airline/add_fli', label: 'Add flight' },
// ]



// // let general_options = [
// //   { value: '', label: 'Home Page' },
// //   { value: 'flights', label: 'All flights' },
// // ]


import MainNavbar from './Navbar/Navbar';


const Header = () => {
  // let nav = useNavigate()
  

  // const handleNavigateSelect = (url) => {
  //   nav(`/${url}`)
  // }

  // let {user, logout} = useContext(AuthContext)

  return (
    <div className='app-header'>

      <MainNavbar />
     
      {/* <Navbar>
        <NavLogo />

      <ContextMenu />

      </Navbar> */}

{/* <Sidenav /> */}

        <br/>

        {/* <Select placeholder="General Commands" onChange={e=>handleNavigateSelect(e.value)} options={general_options}/>
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
                 */}

    </div>
  )
}

export default Header