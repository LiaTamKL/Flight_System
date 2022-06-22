import {useState, useEffect, useContext, useRef} from "react";
import AuthContext from "../context/authentication";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Check_if_User, TurnIntoCustomer } from "../methods/AdminMethods";
import CustomerForm from "../forms/CustomerForm";

const MakeACustomer = () =>{
    let params = useParams();
    let {user, authToken} = useContext(AuthContext)
    let nav = useNavigate()
    let [reference, setReference] = useState()

    const customermaker = async(e)=>{
    e.preventDefault()
    let result = await TurnIntoCustomer(params.username,e,authToken)
    if (result.status===200){
        console.log('success!')
        nav('/admin')
    }
    else{
        alert('error:', result.data)
    }
    }

    let check_user = async()=>{
        let data = await Check_if_User(user, params,"Customer", authToken, nav)
        setReference(data)
    }

    useEffect(() => {
        check_user()
        },[])
        console.log('heres current ref:', reference)
    return(
        <form onSubmit={(e)=>customermaker(e)}>
        <CustomerForm userData= {reference}/>
        <br/>
        <input type="submit"/>
        </form>
    )



}

export default MakeACustomer