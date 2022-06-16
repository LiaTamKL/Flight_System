import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/authentication'
import Admin_Dashboard from '../pages/admin_Test'

// export const Logged_in = ({children, ...rest}) => {
//     let {user} = useContext(AuthContext)
//     return(
//         <Route {...rest}>{!user ? <Navigate  to="/login" /> :   children}</Route>
//     )
// }

const logged = (user) => {
    if (user === null){
        return false
    }
    else{return true}
}

export const Logged_in_generic= () => {
    let {user} = useContext(AuthContext)
    let result = logged(user)
    if (result === false){
        alert('You are not logged in, Please log in.')
        return(
           <Navigate to="/login" />
        ) }
    else{return (<Outlet/>)

    }
}


//Type refers to account role, give this as a string.
//children and rest are just the normal parameters you give to a route
 const Logged_in_Route = ({account_role}) => {
    let {user} = useContext(AuthContext)
    let result = logged(user)
    if (result === false){
        alert('You are not logged in, Please log in.')
        return(
           <Navigate to="/login" />
        ) 
    }else{
        if (user.account_role !== account_role){
            alert(`${user.account_role}s are not allowed to view this page`)
            return(<Navigate to="/" />)
        }else{return(
        <Outlet/>
        )
        }
        
    }

}

export default Logged_in_Route;