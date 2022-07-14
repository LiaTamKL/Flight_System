import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import Header from './components/Header'

// import LoginPage from './pages/login_page';
import {AuthenticationProvider} from './context/authentication'
import AdminDashboard from './pages/Admin_Dashboard';
import LoggedinRoute from './utilities/route_authentication';
import {LoggedinGeneric, LoggedOut} from './utilities/route_authentication';
import MainPage from './pages/main';
import Register from './pages/registration';
import NotFound from './pages/404Page';
import UpdatePage from './pages/update';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import FlightSearch from './forms/FlightSearch'
import CustomerPage from './pages/CustomerPage'


import ViewAirlines from './pages/Views/ViewAllAirlines';
import ViewAdmins from './pages/Views/ViewAllAdmins';
import SearchForUser from './pages/Views/ViewSpecificUser';
import ViewAirlineFlights from './pages/Views/ViewAllFlights';

import MakeAnAirline from './pages/AdminMake/MakeAirlinePage';
import MakeAnAdmin from './pages/AdminMake/MakeAdminPage';
import MakeACustomer from './pages/AdminMake/MakeCustomerPage';
import MakeCountry from './pages/AdminMake/MakeCountry';
import CreateAFlight from './pages/AdminMake/MakeAFlight';
import UpdatePassword from './pages/update_password';


// import FlightsListPage from './pages/FlightsListPage'; 
import FlightsListPage from './pages/FlightsListPage'; 


import Login from './components/Login/Login';

function App() {
  return (
    <div className="container dark" >
        <div className='app'>
        <AuthenticationProvider>
          <Header />
          <Routes>

            <Route path='*' element={<NotFound/>} />

            <Route path = "/" exact element={<Navigate to="home" replace />} />
            <Route path = "/home" exact element={<MainPage />} />

            {/* <Route path="/login" element={<LoginPage/>} /> */}
            <Route path="/login" element={<Login/>} />



            <Route path="/register" element={<LoggedOut/>}>
              <Route path='' element={<Register/>}/>
            </Route>
            <Route path='/update' exact element={<LoggedinGeneric/>}> 
              <Route path='' element={<UpdatePage/>}/>
              <Route path='password' element={<UpdatePassword/>}/>
            </Route>

            <Route path='/admin'  exact element={<LoggedinRoute account_role="Admin"/>}>
              <Route path='' element={<AdminDashboard/>}/>
              <Route path='view_airlines' element={<ViewAirlines/>}/>
              <Route path='view_admins' element={<ViewAdmins/>}/>
              <Route path='view_specific' element={<SearchForUser/>}/>
              <Route path='make_airline/:username' element={<MakeAnAirline/>}/>
              <Route path='make_admin/:username' element={<MakeAnAdmin/>}/>
              <Route path='make_customer/:username' element={<MakeACustomer/>}/>
              <Route path='make_country' element={<MakeCountry/>}/>
            </Route>

            <Route path='/customer'  exact element={<LoggedinRoute account_role="Customer"/>}>
              <Route path = '' element={<Navigate to="tickets" replace />} /> 
              <Route path='tickets' element={<CustomerPage />}/>
              {/* <Route path='tickets/:id' element={<FlightsListPage />}/> */}
              <Route path='flight/search' element={<FlightSearch />}/>           
            </Route>



            <Route path='/airline'  exact element={<LoggedinRoute account_role="Airline"/>}>
              <Route path='' element={<ViewAirlineFlights/>}/>
              <Route path='add_flight' element={<CreateAFlight/>}/>
            </Route>
            
            <Route path = '/flights' exact element={<FlightsListPage />}/>
            {/* <Route path = 'flights/:id' element={<FlightsListPage />} /> */}
            

           

          </Routes>
        </AuthenticationProvider>
      </div>
    </div>
    )

}

export default App;