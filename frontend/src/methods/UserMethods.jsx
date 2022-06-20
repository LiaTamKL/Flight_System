import GetCookie from "../utilities/csrf_token";


let UserForm = async (e, account_role, method, url) =>{
    var csrftoken = GetCookie('csrftoken')
    let response = await fetch(url,{
        method:method,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
            },
            body:JSON.stringify({'username': e.target.username.value,
                                'email':e.target.email.value, 
                                'password':e.target.password.value,
                                'password2': e.target.password2.value,
                                'first_name': e.target.first_name.value,
                                'last_name': e.target.last_name.value,
                                'address':e.target.address.value,
                                'phone_number':e.target.phone_number.value,
                                'credit_card_no': e.target.credit_card_no.value},
                                    )
        })
    let data = await response.json()
    return {'data':data, 'status':response.status}}

export default UserForm