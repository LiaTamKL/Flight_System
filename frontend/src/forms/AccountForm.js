

export const CheckPasswords = (e)=>{
    if (e.target.password.value===e.target.password2.value && e.target.password.value.length === 8){
        return true
    }
    else{return false}
}

const AccountForm = ()=>{

    return(
        <>
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required/>
        <input type="password" name="password" minLength="8" maxLength='8' placeholder="Password" required/>
        <input type="password" name="password2" placeholder="Confirm Password" required/>
        </>
    )
}


export default AccountForm