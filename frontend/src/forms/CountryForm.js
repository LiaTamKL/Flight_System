import React, { useRef ,useState  } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import { MdClear } from 'react-icons/md';


const CountryForm = (country)=>{
    const [selectedFile, setSelectedFile] = useState(null);

    const changeHandler = (event) => {setSelectedFile(event.target.files[0]);}
    const clearSelected = () => {setSelectedFile(null);}

    country = country.country
    let set = null
    if (country!==undefined){
        set = true
    }
    return(
        <>
        {/* <input type="text" name="country_name" className="mb-3" placeholder="Country Name" defaultValue = {set?country.country_name:null} required /> */}

        <input className="form-input" type="text" name="country_name"  placeholder="Country Name" defaultValue = {set?country.country_name:null} required />
        
        <label  id="file-upload-label">
            <i id="photo-icon" ><BsFillCameraFill /></i>
            <span id="selected-file" > {!selectedFile? 'Select File' :selectedFile.name }</span>
            <input className="file-input" type="file"  id="flag" name="flag" accept="image/*"  required onChange={changeHandler} />     
        </label>
        <label id='clear-label' hidden={!selectedFile?.name}  onClick={clearSelected}> Clear </label>

        </>
    )
}

export default CountryForm
