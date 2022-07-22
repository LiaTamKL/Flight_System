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
import "./Navbar.css"



const UserLinks = () => {
    const {user, logout} = useContext(AuthContext)


    return (
        <NavDropdown 
        // title={<AiOutlineUser/ >}
        title="Profile"

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

    <Nav.Link href="/admin">All Customers</Nav.Link>

    <Nav.Link href="/admin/view_admins">View All Admins</Nav.Link>
    <Nav.Link href="/admin/view_airlines">View All Airlines</Nav.Link>
    <Nav.Link href="/admin/make_country">Add A Country</Nav.Link>
    <Nav.Link href="/admin/view_specific">Search For Users</Nav.Link>


        <UserLinks />               
            </>
            )


        case 'Customer':
           return (    
            <>    
            <Nav.Link href="/customer">Home</Nav.Link>
            <Nav.Link href="/Home">Add Tickets</Nav.Link>
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
        <NavDropdown.Item href="/airline/add_flight">
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
        
          <Nav.Link id='login-register' href="/login">Login / Sign In</Nav.Link>
        </>
        )
    
    
      }
}

export default ContextMenu