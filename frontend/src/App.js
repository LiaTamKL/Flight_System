import './App.css';
import Header from './components/Header'
import FlightsListPage from './pages/FlightsListPage'; 
import FlightPage from './pages/FlightPage';
import {
  Routes,
  Route,
} from "react-router-dom";



function App() {
  return (
    <div className="container dark" >
        <div className='app'>
        <Header />
        <Routes>
          <Route path = "/" exact element={<FlightsListPage />} />
          <Route path = '/flights/:id' element={<FlightPage />} />
        </Routes>
      </div>
    </div>
    )

}

export default App;
 