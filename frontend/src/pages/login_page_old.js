import React, {useContext} from "react";
import AuthContext from "../context/authentication";
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
    let location = useLocation();
    if (location.state===null){
        var url = '/'
    }
    else{
        var url = location.state
        }
    let {loginUser, user} = useContext(AuthContext)
    
    
    
    
    
    return (
        <div>
            {user? <h1>Hello {user.main_name}, logout if you wish to login as a different user</h1>:<>
            <form onSubmit={(e)=>loginUser(e, url)}>
                <input type="email" name="email" placeholder="Your email" required/>
                <input type="password" name="password" placeholder="Your Password" required/>
                <input type="submit"/>
            </form>
        </>}</div>
    )


}

export default LoginPage