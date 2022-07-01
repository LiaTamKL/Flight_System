import './App.css';
import Header from './components/Header'
import FlightsListPage from './pages/FlightsListPage'; 
import FlightPage from './pages/FlightPage';
import LoginPage from './pages/login_page';
import {AuthenticationProvider} from './context/authentication'
import AdminDashboard from './pages/admin_Test';
import LoggedinRoute from './utilities/route_authentication';
import {LoggedinGeneric, LoggedOut} from './utilities/route_authentication';
// import CreateFlightForm from './forms/CreateFlightForm'
import MainPage from './pages/main';
import Register from './pages/registration';
import NotFound from './pages/404Page';
import UpdatePage from './pages/update';
import MakeAnAirline from './pages/make_airline_page';
import {
  Routes,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css'
import MakeAnAdmin from './pages/Make_Admin_Page';
import MakeACustomer from './pages/Make_Customer_Page';
import ViewAirlines from './pages/View_all_Airlines';
import ViewAdmins from './pages/View_all_Admins';
import SearchForUser from './pages/View_Specific_User';
import ViewAirlineFlights from './pages/view_all_flights';
import CreateFlightFormAirline from './forms/CreateFlightFormAirline';
import FlightSearch from './forms/FlightSearch'

function App() {
  return (
    <div className="container dark" >
        <div className='app'>
        <AuthenticationProvider>
          <Header />
          <Routes>
            <Route path='*' element={<NotFound/>} />
            <Route path = "/" exact element={<MainPage />} />
            {/* <Route path = "/flights" element={<FlightsListPage />} /> */}

            {/* <Route path="/login" element={<LoggedOut/>}> */}
              <Route path="/login" element={<LoginPage/>} />
            {/* </Route>   */}
            <Route path="/register" element={<LoggedOut/>}>
              <Route path='' element={<Register/>}/>
            </Route>
            <Route path='/update' exact element={<LoggedinGeneric/>}> 
              <Route path='' element={<UpdatePage/>}/>
            </Route>

            <Route path='/admin'  exact element={<LoggedinRoute account_role="Admin"/>}>
              <Route path='' element={<AdminDashboard/>}/>
              <Route path='view_airlines' element={<ViewAirlines/>}/>
              <Route path='view_admins' element={<ViewAdmins/>}/>
              <Route path='view_specific' element={<SearchForUser/>}/>
              <Route path='make_airline/:username' element={<MakeAnAirline/>}/>
              <Route path='make_admin/:username' element={<MakeAnAdmin/>}/>
              <Route path='make_customer/:username' element={<MakeACustomer/>}/>

            </Route>

            <Route path='/cust'  exact element={<LoggedinRoute account_role="Customer"/>}>
              <Route path='' element={<AdminDashboard/>}/>
              <Route path='view_my_tickets' element={<AdminDashboard/>}/>
            </Route>

            <Route path='/airline'  exact element={<LoggedinRoute account_role="Airline"/>}>
              <Route path='' element={<ViewAirlineFlights/>}/>
              <Route path='add_fli' element={<CreateFlightFormAirline/>}/>
            </Route>

            <Route path = '/flights' exact element={<FlightsListPage />}/>
            {/* <Route path = '/flights/:id/update' element={<CreateFlightForm />} />
            <Route path = '/flights/create'  element={<CreateFlightForm />}  /> */}
            <Route path = 'flights/:id' element={<FlightPage />} />

            <Route path='flights/search' element={<FlightSearch />}/>

           

          </Routes>
        </AuthenticationProvider>
      </div>
    </div>
    )

}

export default App;