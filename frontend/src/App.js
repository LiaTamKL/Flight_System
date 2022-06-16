import './App.css';
import Header from './components/Header'
import FlightsListPage from './pages/FlightsListPage'; 
import FlightPage from './pages/FlightPage';
import Login_Page from './pages/login_page';
import {Authentication_Provider} from './context/authentication'
import Admin_Test from './pages/admin_Test';
import Logged_in_Route from './utilities/route_authentication';
import CreateFlight from './forms/CreateFlight'
import {
  Routes,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <div className="container dark" >
        <div className='app'>
        <Authentication_Provider>
          <Header />
          <Routes>        
            <Route path="/login" element={<Login_Page/>} />
              <Route path='/admin' element={<Logged_in_Route type="Admin"/>}>
               <Route path='/admin' element={<Admin_Test/>}/>
              </Route>

            <Route path = '/flights/create' element={<CreateFlight />} />
            <Route path = '/flights/:id' element={<FlightPage />} />
            <Route path = "/" exact element={<FlightsListPage />} />
            
          </Routes>
        </Authentication_Provider>
      </div>
    </div>
    )

}

export default App;
 