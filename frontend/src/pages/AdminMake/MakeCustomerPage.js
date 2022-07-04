import {useState, useEffect, useContext} from "react";
import AuthContext from "../../context/authentication";
import { useParams , useNavigate} from 'react-router-dom';
import { Check_if_User, TurnIntoCustomer } from "../../methods/AdminMethods";
import CustomerForm from "../../forms/CustomerForm";

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
        console.log(result.data)
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
        {message? (<p className="alert alert-warning">{message}</p>):<></>}
        <form onSubmit={(e)=>customermaker(e)}>
        <CustomerForm userData= {reference}/>
        <br/>
        <input type="submit"/>
        </form></>
    )



}

export default MakeACustomer