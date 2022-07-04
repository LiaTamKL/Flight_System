import React, { useState , useContext } from 'react'
import { CheckIfFlightFormIsValid, CreateMyFlight } from '../../methods/AirlineMethods';
import AuthContext from '../../context/authentication';
import NewFlightForm from '../../forms/NewFlightForm';

const CreateAFlight = () =>{
    let [message, setMessage] = useState()
    let {user, authToken} = useContext(AuthContext)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        let is_form_valid = CheckIfFlightFormIsValid(e)
        if (is_form_valid!==true){
            setMessage(is_form_valid)
        }
        else{
            let result = await CreateMyFlight(e, authToken)
            setMessage(result.data)
        }

    }
    return(<>
        {message? (<p className="alert alert-warning">{message}</p>):<></>}
        <h3>Making flight for {user.username}</h3>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <NewFlightForm/>
        <input type='submit'></input>
        </form></>
    )
}


export default CreateAFlight