import {useState, useEffect, useContext, useRef} from "react";
import AuthContext from "../context/authentication";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Check_if_User, TurnIntoAdmin } from "../methods/AdminMethods";
import AdminForm from "../forms/AdminForm";

const MakeAnAdmin = () =>{
    let params = useParams();
    let {user, authToken} = useContext(AuthContext)
    let nav = useNavigate()
    let [reference, setReference] = useState()

    const adminmaker = async(e)=>{
    e.preventDefault()
    let result = await TurnIntoAdmin(params.username,e,authToken)
    if (result.status===200){
        console.log('success!')
        nav('/admin/view_admins')
    }
    else{
        alert('error:', result.data)
    }
    }

    let check_user = async()=>{
        let data = await Check_if_User(user, params,"Admin", authToken, nav)
        setReference(data)    }

    useEffect(() => {
        check_user()
        },[])
        
    return(
        <form onSubmit={(e)=>adminmaker(e)}>
        <AdminForm userData= {reference}/>
        <br/>
        <input type="submit"/>
        </form>
    )



}

export default MakeAnAdmin