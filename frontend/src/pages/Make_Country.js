import {useState, useContext} from "react";
import AuthContext from "../context/authentication";
import { useNavigate } from "react-router-dom";
import { CreateCountry } from "../methods/CountriesMethods";
import CountryForm from "../forms/CountryForm";
import { useLocation} from "react-router-dom";

const MakeCountry= () =>{
    let {user, authToken} = useContext(AuthContext)
    let nav = useNavigate()
    let countr = useLocation()
    let [message, setMessage] = useState()

    let update = true
    let existing_country = countr.state? countr.state.countrobj : update = false  

    const makeCountry = async(e)=>{
        e.preventDefault()
        let result = await CreateCountry(e,authToken)
        if (result.status===200){
            setMessage('Successfully made this country!')
        }
        else{
            console.log(result.data)
            //setMessage(result.data)
        }
        }


    return(<>
        {message? (<p className="alert alert-warning">{message}</p>):<></>}
        <form onSubmit={(e)=>makeCountry(e)}>
        <CountryForm/> 
        <br/>
        <input type="submit"/>
        </form></>
    )



}

export default MakeCountry