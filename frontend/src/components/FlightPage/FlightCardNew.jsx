import React from 'react'
import './FlightCardNew.css'

export const FlightCardNew = () => {
  return (
  
  <>
  <div id="main-card">
      <div id="logo-box">
        <label id='flight-logo'> flight name</label>
      </div>
      <div id="main-box"></div>
          <div id='county-box'></div>
          <div id='time-box'>
              <div id='dep-time'>
                <label className="show-date">10/12/2012</label>
                <label className="show-time">10:20</label>
              </div>
              
              <div id='dutration-time'></div>
              
              <div id='arr-time'></div>
              <label className="show-date">12/12/2012</label>
                <label className="show-time">09:20</label>
          </div>
                
      
      <div id="select-box"></div>
  </div>
  
  
  </>
    

  )
}

export default FlightCardNew