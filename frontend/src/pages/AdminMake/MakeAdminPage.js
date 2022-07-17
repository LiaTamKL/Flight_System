import {useState, useEffect, useContext} from "react";
import AuthContext from "../../context/authentication";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Check_if_User, TurnIntoAdmin } from "../../methods/AdminMethods";
import AdminForm from "../../forms/AdminForm";
import FormTemplate from '../../forms/FormTemplate/FormTemplate';


const MakeAnAdmin = () =>{
    let params = useParams();
    let {user, authToken} = useContext(AuthContext)
    let nav = useNavigate()
    let [reference, setReference] = useState()
    let [message, setMessage] = useState()

    const adminmaker = async(e)=>{
    e.preventDefault()
    let result = await TurnIntoAdmin(params.username,e,authToken)
    if (result.status===200){
        console.log('success!')
        nav('/admin/view_admins')
    }
    else{
        alert('error:', result.data)
        setMessage(result.data)
    }
    }

    let check_user = async()=>{
        let data = await Check_if_User(user, params,"Admin", authToken, nav)
        setReference(data)    }

    useEffect(() => {
        check_user()
        },[])
        
    return(<>
        {message? (<p className="alert alert-warning">{message}</p>):<></>}
        <form onSubmit={(e)=>adminmaker(e)}>
        <FormTemplate 
            formName= {`Add as Admin`}
            btnDesc = {'Add'} 
            formFields = {<AdminForm userData= {reference} /> }
            formErrors = {message? (<p className="alert alert-warning">{message}</p>):<></>}
            
             />
            {/* <AdminForm userData= {reference}/> */}
            {/* <br/> */}
            {/* <input type="submit" className="btn btn-primary btn-sm"  value='Add them as an admin'/> */}
        </form></>
    )



}

export default MakeAnAdmin