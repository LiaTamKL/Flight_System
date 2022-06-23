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

export const UpdateUser=async(e, authToken)=>{
    var csrftoken = GetCookie('csrftoken')
    let response = 'needs to be built, dont forget authtokens'
    //backend not tested yet so make sure to test it with this with all 4 user types.
    //make sure to test with bad data of existing users.
    //remember to return the data and status
}

export const PassWordUpdate=async(e, authToken)=>{
    var csrftoken = GetCookie('csrftoken')
    let response = 'needs to be built, dont forget authtokens'
    //build a password checker first
    //build second response from server to updated password if the checker confirms its the correct password
}

export default UserForm