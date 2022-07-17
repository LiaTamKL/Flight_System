import { useContext,} from 'react'
import AuthContext from '../../context/authentication'
import { useState} from 'react'
import { CheckPasswords } from '../../forms/AccountForm'
import PasswordForm from '../../forms/UpdatePasswordForm'
import { PasswordChange } from '../../methods/UserMethods'
import FormTemplate from '../../forms/FormTemplate/FormTemplate';

const UpdatePassword = ()=>{
    let [message, setMessage] = useState()
    let {authToken} = useContext(AuthContext)
    

    let handleSubmit = async(e)=>{
        e.preventDefault();
        if (CheckPasswords(e)===false){
            setMessage('New password must match the confirm password')
        }
        else{
        let result = await PasswordChange(e,authToken)
        setMessage(result.data)
    }
    }
    return(<>
        {/* {message? (<p className="alert alert-warning">{message}</p>):<></>} */}
        <form onSubmit={(e)=>handleSubmit(e)}>
        <FormTemplate 
            formName= {"Change Password"}
            btnDesc = {'Change'} 
            formFields = {<PasswordForm/>}
            formErrors = {message? (<p className="alert alert-warning">{message}</p>):<></>}
             />
            {/* <PasswordForm/> */}
            {/* <br/> */}
            {/* <input className="btn btn-primary btn-sm" type="submit"/> */}
        </form>  
        </>



    )
    }

export default UpdatePassword