import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../assets/add.svg'


const AddCreateButton = () => {


    
    return (
        <Link to="/flights/create" className="floating-button">
            <AddIcon />
        </Link>
    )
}

export default AddCreateButton
