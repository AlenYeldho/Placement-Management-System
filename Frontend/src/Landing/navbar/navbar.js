import React from 'react'
import Links from '../../link'
import "./navbar.scss"
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar() {
  return (
  
    <div className='navbars'>
        <div className='logo'>
          <img src='logo.png' alt=''/>
        </div>
        <div className='textlink'>
            <Links/>
        </div>
        <div className='login'>
        <Dropdown>
      <Dropdown.Toggle style={{background:"#0d0d1f",width:"110px"}} id="dropdown-basic">
        Login
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item ><Link to="adminlogin">Admin</Link></Dropdown.Item>
        <Dropdown.Item ><Link to="studentlogin">Student</Link></Dropdown.Item>
        <Dropdown.Item ><Link to="recruiterlogin">Recruiter</Link></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </div>
    </div>
  )
}

export default Navbar