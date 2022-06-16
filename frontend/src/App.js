import './App.css';
import Header from './components/Header'
import FlightsListPage from './pages/FlightsListPage'; 
import FlightPage from './pages/FlightPage';
import Login_Page from './pages/login_page';
import {Authentication_Provider} from './context/authentication'
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
            <Route path = '/flights/:id' element={<FlightPage />} />
          </Routes>
        </Authentication_Provider>
      </div>
    </div>
    )

}

export default App;
 