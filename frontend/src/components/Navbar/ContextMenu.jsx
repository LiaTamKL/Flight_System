import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AiOutlineHome , AiOutlineUser } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import React, { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '../../context/authentication'
import { BsPlusCircleFill } from "react-icons/bs";
import { MdFlight } from "react-icons/md";
import { RiAdminLine , RiUserSearchFill } from "react-icons/ri";



const UserLinks = () => {
    const {user, logout} = useContext(AuthContext)


    return (
        <NavDropdown 
        title={<AiOutlineUser/ >}
        id="collasible-nav-dropdown" 
        className="custom-style"
        >
        <NavDropdown.Item href="/update">
        <AiOutlineUser/ > Update Profile
        </NavDropdown.Item>
          <NavDropdown.Item href="/" onClick={logout}>
          <GrLogout /> Logout 
            </NavDropdown.Item>         
          </NavDropdown>

    )
}






 const ContextMenu = () => {
    let {user, logout} = useContext(AuthContext)

    switch (user?.account_role)
    {
        case 'Admin':
            return ( 
            <>

    <Nav.Link href="/admin">Home</Nav.Link>

    <NavDropdown 
        title='User Options'
        id="collasible-nav-dropdown" 
        className="custom-style"
        >
        <NavDropdown.Item href="#">
            <BsPlusCircleFill/ >  Add User

        </NavDropdown.Item>
            <NavDropdown.Item href="/admin/view_specific" >
                <RiAdminLine /> Search For Users
            </NavDropdown.Item>         
    </NavDropdown>



    <NavDropdown 
        title='Admin Options'
        id="collasible-nav-dropdown" 
        className="custom-style"
        >
        <NavDropdown.Item href="#">
            <BsPlusCircleFill/ >  Add Admin

        </NavDropdown.Item>
            <NavDropdown.Item href="/admin/view_admins" >
                <RiAdminLine /> View All Admins
            </NavDropdown.Item>         
    </NavDropdown>

    <NavDropdown 
        title='Flight Options'
        id="collasible-nav-dropdown" 
        className="custom-style"
        >
        <NavDropdown.Item href="#">
            <BsPlusCircleFill/ >  Add Airline
        </NavDropdown.Item>
            <NavDropdown.Item href="/admin/view_airlines" >
                <MdFlight /> View All Airlines 
            </NavDropdown.Item>         
    </NavDropdown>
        <UserLinks />               
            </>
            )


        case 'Customer':
           return (    
            <>    
            <Nav.Link href="/customer">Home</Nav.Link>
                <UserLinks /> 
            </>
            )
        case 'Airline':
        return (   
            <>

<       Nav.Link href="/airline">Home</Nav.Link>

        <NavDropdown 
        title='Airline Options'
        id="collasible-nav-dropdown" 
        className="custom-style"
        >
        <NavDropdown.Item href="airline/add_fli">
            <BsPlusCircleFill/ >  Add Flight

        </NavDropdown.Item>
            <NavDropdown.Item href="/airline" >
                <MdFlight /> View My Flights
            </NavDropdown.Item>         
        </NavDropdown>


                <UserLinks /> 
            </> 
          )
        default: 
        return (  
        <>
          <Nav.Link href="/">Home </Nav.Link>
          <Nav.Link href="/login">Login </Nav.Link>
        </>
        )
    
    
      }
}

export default ContextMenu