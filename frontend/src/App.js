import './App.css';
import Header from './components/Header'
import FlightsListPage from './pages/FlightsListPage'; 
import FlightPage from './pages/FlightPage';
import Login_Page from './pages/login_page';
import {Authentication_Provider} from './context/authentication'
import Admin_Dashboard from './pages/admin_Test';
import Logged_in_Route from './utilities/route_authentication';
import {Logged_in_generic} from './utilities/route_authentication';

import {
  Routes,
  Route,
} from "react-router-dom";



function App() {
  return (
    <div className="container dark" >
        <div className='app'>
        <Authentication_Provider>
          <Header />
          <Routes>
            <Route path = "/" exact element={<FlightsListPage />} />

            <Route path="/login" element={<Login_Page/>} />
            <Route path='/update' exact element={<Logged_in_generic/>}> 
              <Route path='' element={<FlightsListPage/>}/>
            </Route>

            <Route path='/admin'  exact element={<Logged_in_Route account_role="Admin"/>}>
              <Route path='' element={<Admin_Dashboard/>}/>
              <Route path='view_airlines' element={<Admin_Dashboard/>}/>
              <Route path='view_admins' element={<Admin_Dashboard/>}/>
              <Route path='view_specific' element={<Admin_Dashboard/>}/>
            </Route>

            <Route path='/cust'  exact element={<Logged_in_Route account_role="Customer"/>}>
              <Route path='' element={<Admin_Dashboard/>}/>
              <Route path='view_my_tickets' element={<Admin_Dashboard/>}/>
            </Route>

            <Route path='/airline'  exact element={<Logged_in_Route account_role="Airline"/>}>
              <Route path='' element={<Admin_Dashboard/>}/>
              <Route path='add_fli' element={<Admin_Dashboard/>}/>
              <Route path='update_flight' element={<Admin_Dashboard/>}/>
            </Route>

            <Route path = '/flights/:id' element={<FlightPage />} />
          </Routes>
        </Authentication_Provider>
      </div>
    </div>
    )

}

export default App;
