import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect, useRef, useContext } from 'react';
import ContextMenu from './ContextMenu'
import { ReactComponent as FlightLogo } from "./icons/flight_logo.svg";


// const NavLogo = () => {
//   return (
//     <NavLink to="home" className="nav-logo">
//       <FlightLogo className="logo-icon" />
//       <span className="logo-name" >Flight App</span>
//     </NavLink>
 
// )}



const  BrandExample = () => {



    return (



      <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark" sticky = "top">
        <Container>
          <Navbar.Brand href="/home">Flight App </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            
            <ContextMenu />

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

export default BrandExample;