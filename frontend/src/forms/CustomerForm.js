const CustomerForm = (userData)=>{
    let classchange = 'form-input'
    userData = userData.userData
    let set = null
    let set2 = null
    if (userData!==undefined){
        set = true
        if (userData.address!==undefined){
            set2 = true       
        }
    
        }
    // fixes the class formatting clash when accessing the component from anony and profile update  
    else{classchange = 'login-form-input'}
    return(
        <>
        <input id="customer-input1"  className={classchange} type="text" name="first_name" placeholder="First Name" required defaultValue={set?userData.first_name:null}/>
        <input id="customer-input2" className={classchange} type="text" name="last_name" placeholder="Last Name" required defaultValue={set?userData.last_name:null}/>
        <input id="customer-input3" className={classchange} type="text" name="address" placeholder="Address" required defaultValue={set2?userData.address:null}/>
        <input id="customer-input4" className={classchange} type="tel" name="phone_number" placeholder="Phone Number" pattern='(0\d{1,2})(\d{7})$' required defaultValue={set2?userData.phone_number:null}/>
        <input id="customer-input5" className={classchange}type="tel" name="credit_card_no" placeholder="Credit Card Number" required defaultValue={set2?userData.credit_card_no:null}/>
        </>
    )
}


export default CustomerForm