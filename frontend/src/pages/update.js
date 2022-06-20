
import AuthContext from '../context/authentication'
import React, { useContext,} from 'react'
import UpdateAccountForm from '../forms/AccountForm'
import CustomerForm from '../forms/CustomerForm'
import AirlineForm from '../forms/AirlineForm'
import AdminForm from '../forms/AdminForm'

const UpdatePage = () =>{
    let {user} = useContext(AuthContext)
    console.log(user)


return(
    <form onSubmit={(e)=>console.log(e)}>
        <UpdateAccountForm/>
                {user.account_role === 'Airline' ? (
                    <AirlineForm/>
                ):<></>}
                {user.account_role === 'Customer' ? (<>
                    <CustomerForm/></>
                ):<></>}
                {!user.account_role==='Admin' ?(<>{!user.is_superuser? (<>
                    <AdminForm/>
                  </>
                ):<></>}  
                  </>):<></>}
                  <br/>
        <input type="submit"/>
    </form>
)

}

export default UpdatePage