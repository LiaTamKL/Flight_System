import React from 'react'
import'./FlightPage.css'
import {Link} from "react-router-dom";
import { BiTime } from 'react-icons/bi';
import { MdFlight } from 'react-icons/md';
import FlightCard from './Components/FlightCard'



const FlightPage = () => {

  return (

    <div className="container">
        <div className="row">
            <FlightCard />
                        
        </div>
</div> 
)}

export default  FlightPage  