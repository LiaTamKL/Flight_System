import {useState, useEffect, useContext} from "react";
import AuthContext from "../context/authentication";
import AirlineForm from "../forms/AirlineForm";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Check_if_User, TurnIntoAirline } from "../methods/AdminMethods";

const MakeAnAirline = () =>{
    let params = useParams();
    let {user, authToken} = useContext(AuthContext)
    let nav = useNavigate()
    let [message, setMessage] = useState()

    const airlineMaker = async(e)=>{
    e.preventDefault()
    if(!e.target.country.value){
        setMessage('You must choose a country!')
    }else{
    let result = await TurnIntoAirline(params.username,e,authToken)
    if (result.status===200){
        console.log('success!')
        nav('/admin/view_airlines')
    }
    else{
        alert('error:', result.data)
        setMessage(result.data)
    }
    }}

    useEffect(() => {
        let data = Check_if_User(user, params,"Airline", authToken, nav)
        console.log('heres the final data', data)},[])
        
    return(<>
        {message? (<p className="alert alert-warning">{message}</p>):<></>}
        <form onSubmit={(e)=>airlineMaker(e)}>
        <AirlineForm />
        <br/>
        <input type="submit"/>
        </form></>
    )



}

export default MakeAnAirline