const PasswordForm = ()=>{

    return(
        <>
        <input type="password" name="old_password" placeholder="Old Password" required/>
        <input type="password" name="password" minLength="8" maxLength='8' placeholder="New Password" required/>
        <input type="password" name="password2" placeholder="Confirm New Password" required/>
        </>
    )
}


export default PasswordForm