import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export const Logged_in = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return(
        <Route {...rest}>{!user ? <Redirect to="/login" /> :   children}</Route>
    )
}

const logged = (user) => {
    if (typeof user==="undefined"){
        return false
    }
    else{return true}
}

//Type refers to account role, give this as a string.
//children and rest are just the normal parameters you give to a route
export const logged_in_route = ({children,account_role, ...rest}) => {
    let {user} = useContext(AuthContext)
    let result = logged(user)
    if (result === false){
        return(
            <Route {...rest}><Redirect to="/login" /></Route>
        ) 
    }else{
        return(
        <Route {...rest}>{!user.account_role === account_role ? <Redirect to="/" /> :   children}</Route>
        )
    }

}

export default logged_in_route;

