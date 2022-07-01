
import React , {useContext , useEffect , useState} from 'react';
import TicketFrom from '../forms/TicketFrom';
import AuthContext from "../context/authentication";
import { Link, useNavigate } from "react-router-dom";

const CustomerPage = () => {
    let [tickes, setTickets] = useState();


    const getTickets = async () => {

    }

    
    // let {user} = useContext(AuthContext)
    // user.account_role ==='Customer'? 
    // console.log("yes"): 
    // console.log("no");
  


    return (
    <div>
    
    </div>
  )
  
}

export default CustomerPage