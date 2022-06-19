const CustomerForm = ()=>{

    return(
        <>
        <input type="text" name="first_name" placeholder="First Name" required />
        <input type="text" name="last_name" placeholder="Last Name" required />
        <input type="text" name="address" placeholder="Address" required/>
        <input type="tel" name="phone_number" placeholder="Phone Number" pattern='(0\d{1,2})(\d{7})$' required/>
        <input type="tel" name="credit_card_no" placeholder="Credit Card Number" required/>
        </>
    )
}


export default CustomerForm