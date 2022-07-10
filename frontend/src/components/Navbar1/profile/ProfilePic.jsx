import React from 'react'
import '../Navbar.css'
import prof from "./fma_profile.jpg";

const ProfilePic = () => {
  
    return (
    <img className='profile_img' src= { prof } alt="profile" />
  )
}


export default ProfilePic