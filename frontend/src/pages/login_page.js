import React, {useContext} from "react";
import AuthContext from "../context/authentication";

const Login_Page = () => {
    let {loginUser, user} = useContext(AuthContext)
    return (
        <div>
            {user&& <h1>Hello {user.main_name}</h1>}
            <form onSubmit={loginUser}>
                <input type="email" name="email" placeholder="Your email" />
                <input type="password" name="password" placeholder="Your Password" />
                <input type="submit"/>
            </form>
        </div>
    )


}

export default Login_Page