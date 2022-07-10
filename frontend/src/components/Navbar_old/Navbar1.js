import { NavLink, useNavigate} from "react-router-dom";
import ProfilePic from './profile/ProfilePic';
// import './Navbar.css';
import { GrLogout } from "react-icons/gr";
import React, { useState, useEffect, useRef, useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as FlightLogo } from "./icons/flight_logo.svg";
import AuthContext from '../../context/authentication'

import { LoggedDropdownMenu, FlightDropdownMenu } from './components/DropDownLists';


const Navbar = (props) => {
  // const { state } = useLocation();

  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}



const NavLogo = () => {
  return (
    <NavLink to="home" className="nav-logo">
      <FlightLogo className="logo-icon" />
      <span className="logo-name" >Flight App</span>
    </NavLink>
 
)}



const SigninRegister = (props) => {
  let msg

  props.navaddress === "/login" ? msg = "Login" : msg = "Register"

  return (

    <li className="nav-item">
      <NavLink to= { props.navaddress } className="signinregister-link"> { msg }</NavLink>
    </li>

  )
}




// handles the single item  list
// if open true , opens the a menu

const NavItem = (props) => {
  const [open, setOpen] = useState(false);
  const [desAddress, setDestAddress] = useState("#");
  

// useEffect(() => {
  
// }, [open]);



  
  const HandleClick = (naviLink) => {
    if (!naviLink){naviLink = "#"}
    setDestAddress(naviLink)
}


  return (

    <li className="nav-item">    
      <NavLink to={ desAddress }
          className="icon-button"

          onClick={() =>{ setOpen(!open)
          HandleClick(props.naviLink)
          console.log(props.open);

          ;}} 

          >

       {props.icon}
      </NavLink>
        
      {open && props.children}
    </li>
  );
}

<>
<LoggedDropdownMenu />
<FlightDropdownMenu />
</>




export  {Navbar, NavItem ,LoggedDropdownMenu ,NavLogo , SigninRegister, FlightDropdownMenu};

// handles the dropodown list

// const LoggedDropdownMenu = () => {
//   const [activeMenu, setActiveMenu] = useState('main');
//   const [menuHeight, setMenuHeight] = useState(null);
//   const dropdownRef = useRef(null);
//   const {user, logout} = useContext(AuthContext)
//   const [desAddress, setDestAddress] = useState("#");
//   const navigate = useNavigate()


//   const HandleClick = (navLink) => {
//       if ( navLink === "logout") {
//         logout()
//         navigate('/')
//       }
//       setDestAddress(navLink)
//   }


// // alligns dropdown with hight of the column 
//   useEffect(() => {
//     setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
//   }, [])


// // calculate the hight of the dropdown menu
//   const calcHeight = (el) => {
//     const height = el.offsetHeight;
//     setMenuHeight(height);
//   }

// // menu item 
//   const DropdownItem = (props) => {
    
//     return (
//         <NavLink to={ desAddress }
//           className="menu-item" 
//           onClick={() => {
//           props.goToMenu && setActiveMenu(props.goToMenu)
//           HandleClick(props.naviLink)
//           }}> 
 
//           <span className="icon-button">{props.leftIcon}</span>
//             {props.children}
//           <span className="icon-right">{props.rightIcon}</span>
//         </NavLink>
//       );
//     }

//     return (

//       <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

//         <CSSTransition
//           in={activeMenu === 'main'}
//           timeout={500}
//           classNames="menu-primary"
//           unmountOnExit
//           onEnter={calcHeight}>

//           <div className="menu">
//             <DropdownItem
//               leftIcon = { <ProfilePic /> }
//               naviLink = "/update"
//               open = 'false'
//               // goToMenu="settings"
//               >
//               Update Profile   
//             </DropdownItem>
            

//             <DropdownItem
//             leftIcon = { <GrLogout /> }
//             naviLink = "logout"
//             open = 'false'
//             >
//               Log Out
//           </DropdownItem>
//           </div>
//         </CSSTransition>
//       </div>


//   );
// }




  





{/* 
            <DropdownItem
              leftIcon={<CogIcon />}
              // rightIcon={<ChevronIcon />}
              goToMenu="settings">
              Settings
            </DropdownItem>

            <DropdownItem
              leftIcon="🦧"
              // rightIcon={<ChevronIcon />}
              goToMenu="animals">
              Animals
            </DropdownItem> */}



            

        {/* <CSSTransition
          in={activeMenu === 'settings'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
              <h2>My Tutorial</h2>
            </DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
            <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
          </div>
        </CSSTransition> */}


  {/* 
        <CSSTransition
          in={activeMenu === 'animals'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div className="menu">
            <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
              <h2>Animals</h2>
            </DropdownItem>
            <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
            <DropdownItem leftIcon="🐸">Frog</DropdownItem>
            <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
            <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
          </div>
        </CSSTransition> */}