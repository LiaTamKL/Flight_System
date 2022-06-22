import {useState, useEffect, useContext, useRef} from "react";
import AuthContext from "../context/authentication";
import AirlineForm from "../forms/AirlineForm";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { GetSpecificUser, Check_if_User } from "../methods/AdminMethods";

const MakeAnAirline = () =>{
    let params = useParams();
    let {user, authToken} = useContext(AuthContext)
    let nav = useNavigate()


    // let Check_if_User = async()=>
    // {if (user.username===params.username){
    //     alert('Cannot change own account!')
    //     nav('/')
    // }
    // let result = await GetSpecificUser(params.username, authToken)
    // let data = result.data
    // if (result.status === 200){
    //     if (data.account_role==="Airline"){
    //         alert('Account already airline!')
    //         nav('/')
    //     }
    //     if (data.is_superuser===true){
    //         alert('Superuser cannot be changed!')
    //         nav('/')
    //     }
    // }
    // else{
    //     alert("User does not exist")
    //     nav('/')}

    // }
    useEffect(() => {
        let data = Check_if_User(user, params,"Airline", authToken, nav)
        console.log('heres the final data', data)},[])
    
    return(
        <form>
        <AirlineForm/>
        <br/>
        <input type="submit"/>
        </form>
    )



}

export default MakeAnAirline