import React from 'react'
import "./student.scss"
import { Link} from 'react-router-dom';
import Router from './Router/Router'
import Chart from './performance/Chart'
function Student() {

  return (
    <div className='students'>
      
      <Router/>
      <Chart/>
        <div className='nav'>
            <h2>Student</h2>
            <button><Link to="/"><h6>Logout</h6></Link></button>
        </div>
        <div className='sidebar'>
        <div className='img'>
          </div>
            <div className='cont'>
                <div className='txt'><Link to="performance">My Performance</Link></div>
                <div className='txt'><Link to="profile">My Profile</Link></div>
                <div className='txt'><Link to="current">Current Recruitments</Link></div>
                <div className='txt'><Link to="applied">Applied Recruitments</Link></div>
                <div className='txt'><Link to="resume">View Resume</Link></div>
                {/* <div className='txt'><Link to="changepssdS">Change Password</Link></div> */}
            </div>
        </div>
    </div>
  )
}

export default Student