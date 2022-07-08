import React , {useContext} from 'react'
import {NavItem , SigninRegister, LoggedDropdownMenu, FlightDropdownMenu } from "../Navbar";
import { ReactComponent as AirlineIcon } from '../icons/airline_icon.svg'
import ProfilePic from '../profile/ProfilePic'
import AuthContext from '../../../context/authentication'


import { FaUserAlt} from "react-icons/fa";
import { RiAdminLine , RiUserSearchFill } from "react-icons/ri";
import { TbPlaneInflight } from "react-icons/tb";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { MdFlight } from "react-icons/md";




// let admin_options = [
//     { value: 'admin/view_specific', label: 'Search User' },
//     { value: 'admin', label: 'All Customers' },
//     { value: 'admin/view_admins', label: 'All Admins' },
//     { value: 'admin/view_airlines', label: 'All Airlines' }
//   ]



const CommonLinks = () => {

    return (
    <NavItem icon={ <ProfilePic /> }>   
        <LoggedDropdownMenu></LoggedDropdownMenu>
    </NavItem>

    )
}


const ContextMenu = () => {
    let {user, logout} = useContext(AuthContext)

    switch (user?.account_role)
    {
        case 'Admin':
            return ( 
            <>

                <NavItem icon= {<AiOutlineHome /> } naviLink = '/admin'  />,
                <NavItem icon= {<RiUserSearchFill /> } naviLink = '/admin/view_specific' />,
                <NavItem icon= {<RiAdminLine /> } naviLink = 'admin/view_admins' />
                <NavItem icon= {<MdFlight />} >
                    <FlightDropdownMenu></FlightDropdownMenu>
                </NavItem>


                <CommonLinks />               
            </>
            )
        case 'Customer':
           return (    
            <>    
                <NavItem icon= {<AiOutlineHome /> }  naviLink = '/customer' />,
                <CommonLinks /> 
            </>
            )
        case 'Airline':
        return (   
            <>
                <NavItem icon= {<AiOutlineHome /> } naviLink = "/airline"  />,
                <CommonLinks /> 
            </> 
          )
        default: 
        return (  
        <>
            {/* <NavItem icon= {<AiOutlineHome /> } navaddress = "/"  />, */}
            <SigninRegister  navaddress = "/login" />
        </>
        )
    
    
      }
}

export default ContextMenu