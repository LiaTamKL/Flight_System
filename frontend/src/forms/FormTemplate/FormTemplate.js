import React from 'react'
import './FormTemplate.css'




const FormTemplate = (props) => {
  return (
    <div id="card">
        <div id="card-text">
            <div id="portada"></div>
            <div id="input-fileds">   
                <div id="title"></div>
                <h2 id='form-type' >{props? props.formName:""}</h2>

                {props.formFields? props.formFields:""}

                <div id="form-errors">{props? props.formErrors:""}</div>
                {props.additionalButtons? props.additionalButtons:""}
                
                <input type="submit" id="submit-button" value={props?props.btnDesc:'Submit'}  />
                <input type="reset" id="clear-button" value="Reset"  />
            </div>
        
        </div>

    </div>
  )
}

export default FormTemplate

