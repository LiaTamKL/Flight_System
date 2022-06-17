import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/authentication'

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

/////check if logged in//////////////////
export const LoggedinGeneric= () => {
    console.log('in LoggedinGeneric')
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

//////////check if not logged in//////////
export const LoggedOut= () => {
    console.log('in LoggedOut')
    let {user} = useContext(AuthContext)
    let result = logged(user)
    if (result === true){
        alert('Log out to use this function.')
        return(
            <Navigate to="/" /> 
        ) }
    else{return (<Outlet/>)

    }
}

//Type refers to account role, give this as a string.
//children and rest are just the normal parameters you give to a route
 const LoggedinRoute = ({account_role}) => {
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

export default LoggedinRoute;