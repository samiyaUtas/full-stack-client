import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';
import plane from "../Images/plane.png";
import { FiLogOut } from "react-icons/fi";
import {NavItem,NavLink} from 'reactstrap';

 
function Header(){
    //state variable
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
 
    return(
          <Navbar className='navigation' light expand="md">
            <img src={plane}/>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ms-auto" navbar>
 
              <NavItem>
          <NavLink className='navs'>
            <FiLogOut />
            </NavLink>
        </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
    );
}
export default Header;