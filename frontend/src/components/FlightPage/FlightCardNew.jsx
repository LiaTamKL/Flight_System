import React from 'react'
import './FlightCardNew.css'
import { MdFlightTakeoff } from 'react-icons/md';


export const FlightCardNew = () => {
  return (
  
  <>
  <div id="main-card">
      <div id="logo-box">
        <label id='flight-logo'>id</label>
      </div>
      <div id='time-box'>
          <div id='dep-time'>
            <label className="show-date">10/12/2012</label>
            <label className="show-time">10:20</label>
            <label className="country-label">ORG</label>
          </div>
          
          <div id='duration-time'>
              <div id='flight-icon' ><div id="icon-label"> <MdFlightTakeoff /></div></div>
          </div>
          
          <div id='arr-time'>
            <label className="show-date">12/12/2012</label>
            <label className="show-time">09:20</label>
            <label className="country-label">DST</label>
          </div>
          {/* <div id='ticket-box'>
            <label id='ticket-label'>Tickets left:</label>
            <label id="number-label">500</label>
          </div> */}
          
    </div>
              
    <div id="select-box">
      <input type="button" value="book" />
    </div>
   </div>
  
  
  </>
    

  )
}

export default FlightCardNew