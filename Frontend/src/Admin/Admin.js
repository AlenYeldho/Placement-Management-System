import React from 'react'
import "./admin.scss"
import RouterAdmin from './RouterAdmin/RouterAdmin'
import ChartAdmin from './Chart/ChartAdmin'
import { Link, useLocation } from 'react-router-dom';
import "./Chart/chart.scss"
function Admin() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className='admin'>
        <RouterAdmin/>
        <div className='containerchart'>
        
        {path === "/admin" && (
  <>
    <h1>Yearly Based Placement Status</h1>
    <ChartAdmin />
  </>
)}

        </div>
        
        
        <div className='nav'>
            <h2>Admin</h2>
            <button><Link to="/"><h6>Logout</h6></Link></button>
        </div>
        <div className='sidebar'>   
        <div className='img'>     
          </div>
            <div className='cont'>
                <div className='txt'><Link to="viewstd">View students</Link></div>
                <div className='txt'><Link to="companys">View Companys</Link></div>
                <div className='txt'><Link to="AddDrives">Add Drives</Link></div>
                <div className='txt'><Link to="Drives">View Drives</Link></div>
                <div className='txt'><Link to="Placed">Placed Students</Link></div>
                {/* <div className='txt'><Link to="changepssdA">Change Password</Link></div> */}
            </div> 
        </div>
    </div>
  )
}

export default Admin