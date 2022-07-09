import { NavLink, useNavigate} from "react-router-dom";
import ProfilePic from '../profile/ProfilePic';
import '../Navbar.css';
import { GrLogout } from "react-icons/gr";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdFlight } from "react-icons/md";

import React, { useState, useEffect, useRef, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import AuthContext from '../../../context/authentication'




const LoggedDropdownMenu = (props) => {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    const {user, logout} = useContext(AuthContext)
    const [desAddress, setDestAddress] = useState("#");
    const navigate = useNavigate()
  
  
    const HandleClick = (navLink) => {
        if ( navLink === "logout") {
            //navigate('/')
            logout()
          
        }
        setDestAddress(navLink)
    }
  
  
  // alligns dropdown with hight of the column 
    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])
  
  
  // calculate the hight of the dropdown menu
    const calcHeight = (el) => {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }
  
  // menu item 
    const DropdownItem = (props) => {

      return (
          <NavLink to={ desAddress }
            className="menu-item" 
            onClick={() => {
            props.goToMenu && setActiveMenu(props.goToMenu)
            HandleClick(props.naviLink)
            }}> 
   
            <span className="icon-button">{props.leftIcon}</span>
              {props.children}
            <span className="icon-right">{props.rightIcon}</span>
          </NavLink>
        );
      }
  
      return (
  
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
  
          <CSSTransition
            in={activeMenu === 'main'}
            timeout={500}
            classNames="menu-primary"
            unmountOnExit
            onEnter={calcHeight}>
  
            <div className="menu">
              <DropdownItem
                leftIcon = { <ProfilePic /> }
                naviLink = "/update"
                open = 'true'
                // goToMenu="settings"
                >
                Update Profile   
              </DropdownItem>
              
  
              <DropdownItem
              leftIcon = { <GrLogout /> }
              naviLink = "logout"
              open = 'false'
              >
                Log Out
            </DropdownItem>
            </div>
          </CSSTransition>
        </div>
  
  
    );
  }
  


const FlightDropdownMenu = () => {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    const [desAddress, setDestAddress] = useState("#");
  
  
    const HandleClick = (navLink) => {
        setDestAddress(navLink)
    }
  
  
  // alligns dropdown with hight of the column 
    useEffect(() => {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])
  
  
  // calculate the hight of the dropdown menu
    const calcHeight = (el) => {
      const height = el.offsetHeight;
      setMenuHeight(height);
    }
  
  // menu item 
const DropdownItem = (props) => {
      
    return (
          <NavLink to={ desAddress }
            className="menu-item" 
            onClick={() => {
            props.goToMenu && setActiveMenu(props.goToMenu)
            HandleClick(props.naviLink)
            }}> 
   
            <span className="icon-button">{props.leftIcon}</span>
              {props.children}
            <span className="icon-right">{props.rightIcon}</span>
          </NavLink>
        );
      }
  
      return (
  
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
  
          <CSSTransition
            in={activeMenu === 'main'}
            timeout={500}
            classNames="menu-primary"
            unmountOnExit
            onEnter={calcHeight}>
  
            <div className="menu">
              <DropdownItem
                leftIcon = { <BsPlusCircleFill /> }
                naviLink = "admin/make_country"

                // goToMenu="settings"
                >
                Add Country
              </DropdownItem>
              
  
              <DropdownItem
              leftIcon = { <MdFlight /> }
              naviLink = "admin/view_airlines"

              >
                Show Airlines
            </DropdownItem>
            </div>
          </CSSTransition>
        </div>
  
  
    );
  }
  

  export { LoggedDropdownMenu, FlightDropdownMenu }