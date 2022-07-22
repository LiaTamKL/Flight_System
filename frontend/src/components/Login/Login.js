import './Login.css'
import React, {useContext , useState , useEffect} from "react";
import AuthContext from "../../context/authentication";
import { useLocation , useNavigate} from 'react-router-dom';
import AccountForm from '../../forms/AccountForm'
import CustomerForm from '../../forms/CustomerForm'
import  { Register } from '../../methods/Register';

const LoginPage = () => {
let navigate = useNavigate()
const [errors, setErrors] = useState([]);
const [message, setMessege] = useState("");

let location = useLocation();
    if (location.state===null){
        var url = '/'
    }
    else{
        var url = location.state
        }
        
    let {loginUser, user} = useContext(AuthContext)


useEffect(() => {
	
}, [message, errors]);

/**
* redirects if register went fine, sets error messages otherwise
*/
let	RegisterRedirect= async(e) =>{
    e.preventDefault();
	let result = await Register(e)

 	if(result.errors.length === 0 && result.message.length === 0 ){
		navigate('/')
	}else{
	
	setMessege(result.message)
	setErrors(result.errors)

	}
	
}

	// change button label
	const [toggle, settoggle] = useState(true);
	const [text, setText] = useState("Next");

	/**
	* changes the button text between back and next and sets toggle as the opposite of what it currently is
	*/
	let textchange = () => {
		toggle? setText("Back") :setText("Next")
		settoggle(!toggle)
	}


  return (

	// <div>
    //     {user? <h1>Hello {user.main_name}, logout if you wish to login as a different user</h1>:<>
	<div className ="signup-login">
		<div className="main">  	
			<input className='login-form-label' type="checkbox" id="chk" aria-hidden="true" />
			<input className='login-form-label' type="checkbox" id="chkk" aria-hidden="true"  />
				<div className="login">
					<form onSubmit={(e)=>loginUser(e, url)}>
						<label className='login-form-label' htmlFor="chk" aria-hidden="true">Login</label>
						<input className='login-form-input' type="email" name="email" placeholder="Email" required/>
						<input className='login-form-input' type="password" name="password" placeholder="Password" required/>
						<input type="submit" className='login-form-button' value = "Login" />
					</form>
				</div>


				<div className="signup">
					<form onSubmit={(e)=> RegisterRedirect(e)}>
						<label className='login-form-label' htmlFor="chk" aria-hidden="true">Sign up</label>
						<AccountForm/>
						<label className='login-form-label' htmlFor="chkk" aria-hidden="true" onClick={textchange}> { text } </label>
						<CustomerForm/>
						{/* {console.log(message, errors)} */}
						<div className='error-list'>{message}</div>
     						<ul className='error-list' >{errors?.map((e)=>(
         					<li>{e}</li>
                         ))}</ul>

						<input type="submit" className='login-form-button' value = "Sign up" />	
					</form>
					
				</div>
		</div>
	</div>

	// </>}</div>
  	)
}



 export default LoginPage


//  import { useNavigate } from 'react-router-dom'
//  import {useState} from 'react'
//  import AccountForm from '../forms/AccountForm'
//  import { CheckPasswords } from '../forms/AccountForm'
//  import CustomerForm from '../forms/CustomerForm'
//  import UserForm from '../methods/UserMethods'
 
//  const Register= () => {
// 	 let nav = useNavigate()
// 	 let [message, setMessage] = useState(null)
// 	 const [errors, setErrors] = useState([])
 
// 	 let register = async (e) =>{
// 		 e.preventDefault()
// 		 setErrors([])
// 		 if (CheckPasswords(e)===false){
// 			 setMessage('Passwords must match and be 8 characters long')
// 		 }
// 		 else{
// 		 setMessage('')
 
// 		 //change the url when final package
// 		 let result = await UserForm(e, 'Customer', 'POST', '/backend/api/user_api')
// 		 let data =  result.data
// 		 let status = result.status
		 
// 		 if (status ===200){
// 			 console.log('successful registration, ', {data})
// 			 setMessage(`successful registration of ${e.target.username.value}`)
// 			 nav('/login')
// 		 }
// 		 else{
// 			 setMessage(`Something went wrong. Status: ${status}.`)
// 			 setErrors(data)
// 			 }
 
// 	 }}
 
// 	 return (
// 	 <>
// 	 <form onSubmit={(e)=>register(e)}>
// 		 <AccountForm/>
// 		 <CustomerForm/>
// 		 <br/>
// 		 <input type="submit"/>
// 	 </form>
// 	 <br/>
// 	 <div id='message'>{message}</div>
// 	 <ul>{errors.map((e)=>(
// 		 <li>{e}</li>
// 						 ))}</ul>
// 	 </>
	 
// 	 )
// 	 }
 
//  export default Register