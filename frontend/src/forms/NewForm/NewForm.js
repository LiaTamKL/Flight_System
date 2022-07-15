import React from 'react'
import './NewForm.css'
import {ReactComponent as Profile} from './image.svg';
import AirlineForm from '../AirlineForm';
import AccountForm from '../AccountForm';
import AdminForm from '../AdminForm';
import CountryForm from '../CountryForm';
import NewFlightForm from '../NewFlightForm';
import UpdateAccountForm from '../UpdateAccountForm';
import UpdatePasswordForm from '../UpdatePasswordForm';



const NewForm = () => {
  return (
<>

    <div className="card">
        <div className="img-avatar">
                <Profile />
        </div>
        <div className="card-text">
            <div className="portada"></div>
            <div className="title-total">   
                <div className="title">User ID </div>
                <h2 className='username-style' >User Name </h2>
                {/* <AirlineForm /> */}
                {/* <AdminForm /> */}
                {/* <CountryForm /> */}
                {/* <NewFlightForm /> */}
                {/* <UpdateAccountForm /> */}
                {/* <UpdatePasswordForm /> */}
                <input className="submit-button" type="submit"/>

            </div>
        
        </div>

    </div>
</>
  )
}

export default NewForm




// ("https://media.istockphoto.com/photos/passenger-airplane-flying-above-clouds-during-sunset-picture-id155439315");