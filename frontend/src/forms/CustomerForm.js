const CustomerForm = (userData)=>{
    userData = userData.userData
    let set = null
    let set2 = null
    if (userData!==undefined){
        set = true
        if (userData.address!==undefined){
            set2 = true
            
        }
    }
    return(
        <>
        <input className='form-input' type="text" name="first_name" placeholder="First Name" required defaultValue={set?userData.first_name:null}/>
        <input className='form-input' type="text" name="last_name" placeholder="Last Name" required defaultValue={set?userData.last_name:null}/>
        <input className='form-input' type="text" name="address" placeholder="Address" required defaultValue={set2?userData.address:null}/>
        <input className='form-input' type="tel" name="phone_number" placeholder="Phone Number" pattern='(0\d{1,2})(\d{7})$' required defaultValue={set2?userData.phone_number:null}/>
        <input className='form-input' type="tel" name="credit_card_no" placeholder="Credit Card Number" required defaultValue={set2?userData.credit_card_no:null}/>
        </>
    )
}


export default CustomerForm