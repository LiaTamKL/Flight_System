import {useState, useContext} from "react";
import AuthContext from "../../context/authentication";
import { CreateCountry } from "../../methods/CountriesMethods";
import CountryForm from "../../forms/CountryForm";
import { useLocation} from "react-router-dom";
import FormTemplate from '../../forms/FormTemplate/FormTemplate';


const MakeCountry = () =>{
    let {authToken} = useContext(AuthContext)
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
            setMessage('Country with this name already exists!')
        }
        }

 {/* {message? (<p className="alert alert-warning">{message}</p>):<></>} */}
    return(<>
       
        {/* <h1>Add a country</h1> */}
        <form onSubmit={(e)=>makeCountry(e)}>
            <FormTemplate 
            formName= {"New Country Form"}
            btnDesc = {'Add a Country'} 
            formFields = {<CountryForm /> }
            formErrors = {message? (<p className="alert alert-warning">{message}</p>):<></>}
             />
            {/* <CountryForm />  */}
            {/* <br/> */}
            {/* <input className="btn btn-outline-secondary" type="submit"/> */}

        </form>
        
        
        </>

    )



}

export default MakeCountry