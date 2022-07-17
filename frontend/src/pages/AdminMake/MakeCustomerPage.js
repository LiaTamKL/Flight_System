import {useState, useEffect, useContext} from "react";
import AuthContext from "../../context/authentication";
import { useParams , useNavigate} from 'react-router-dom';
import { Check_if_User, TurnIntoCustomer } from "../../methods/AdminMethods";
import CustomerForm from "../../forms/CustomerForm";
import FormTemplate from '../../forms/FormTemplate/FormTemplate';


const MakeACustomer = () =>{
    let params = useParams();
    let {user, authToken} = useContext(AuthContext)
    let nav = useNavigate()
    let [reference, setReference] = useState()
    let [message, setMessage] = useState()

    const customermaker = async(e)=>{
    e.preventDefault()
    let result = await TurnIntoCustomer(params.username,e,authToken)
    if (result.status===200){
        console.log('success!')
        nav('/admin')
    }
    else{
        setMessage(result.data)
    }
    }

    let check_user = async()=>{
        let data = await Check_if_User(user, params,"Customer", authToken, nav)
        setReference(data)
    }

    useEffect(() => {
        check_user()
        },[])

    return(<>
        {/* {message? (<p className="alert alert-warning">{message}</p>):<></>} */}

        <form onSubmit={(e)=>customermaker(e)}>
        <FormTemplate 
            userData = {reference}
            formName= {"Add as Customer"}
            btnDesc = {'Add'} 
            formFields = {<CustomerForm userData= {reference} />}
            formErrors = {message? (<p className="alert alert-warning">{message}</p>):<></>}
             />

{/* 
             <CustomerForm userData= {reference}/>
            <br/>
            <input type="submit" className="btn btn-primary btn-sm"  value='Add them as a customer'/>  */}
        </form></>
    )



}

export default MakeACustomer