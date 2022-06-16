import { Route, Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/authentication'

export const Logged_in = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return(
        <Route {...rest}>{!user ? <Navigate  to="/login" /> :   children}</Route>
    )
}

const logged = (user) => {
    if (user === null){
        return false
    }
    else{return true}
}

//Type refers to account role, give this as a string.
//children and rest are just the normal parameters you give to a route
export const Logged_in_Route = ({account_role}) => {
    let {user} = useContext(AuthContext)
    let result = logged(user)
    console.log('user:', user)
    console.log('result:', result)
    if (result === false){
        alert('You are not logged in, Please log in.')
        return(
           <Navigate to="/login" />
        ) 
    }else{
        if (!user.account_role === account_role){
            alert(```Only ${account_role}s are allowed access to this page```)
            return(<Navigate to="/" />)
        }else{
            <Outlet/>
        }
        //return !user.account_role === account_role ? <Navigate to="/" /> : <Outlet/>
        
    }

}

export default Logged_in_Route;

