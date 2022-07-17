import React from 'react'
import './FormTemplate.css'
import {ReactComponent as Profile} from './image.svg';
import AirlineForm from '../AirlineForm';
import AdminForm from '../AdminForm';
import CountryForm from '../CountryForm';
import NewFlightForm from '../NewFlightForm';
import UpdateAccountForm from '../UpdateAccountForm';
import UpdatePasswordForm from '../UpdatePasswordForm';




const FormTemplate = (props) => {
  // console.log(props.refrence)
  return (
<>

    <div id="card">
        {/* <div id="img-avatar">
                <Profile />
        </div> */}
        <div id="card-text">
            <div id="portada"></div>
            <div id="input-fileds">   
                <div id="title"></div>
                <h2 id='form-type' >{props? props.formName:""}</h2>

                {props.formFields? props.formFields:""}

                <div id="form-errors">{props? props.formErrors:""}</div>
                {props.additionalButtons? props.additionalButtons:""}

                {/* <AirlineForm /> */}
                {/* <AdminForm /> */}
                {/* <CountryForm /> */}
                {/* <NewFlightForm /> */}
                {/* <UpdateAccountForm /> */}
                {/* <UpdatePasswordForm /> */}
                <input type="submit" id="submit-button" value={props?props.btnDesc:'Submit'}  />
                <input type="reset" id="clear-button" value="Reset"  />
            </div>
        
        </div>

    </div>
</>
  )
}

export default FormTemplate

