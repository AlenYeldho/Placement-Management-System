import React from 'react'
import "./recruiter.scss"
import { Link, useLocation } from 'react-router-dom';
import RouterRec from './RouterRec/RouterRec'
import Applicants from './Applicants/Applicants'
function Recruiter() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className='recruiter'>
       <RouterRec/>
       {path !== "/recruiter/Addrecruitments" && (
  <>
    <Applicants/>
  </>
)}
       
       <div className='nav'>
            <h2>Recruiter</h2>
            <button><Link to="/"><h6>Logout</h6></Link></button>
        </div>
        <div className='sidebar'>
          <div className='img'>
          </div>
          
            <div className='cont'>
                <div className='txt'><Link to="applicants">Applicants</Link></div>
                <div className='txt' ><Link to="selectedstudents">Selected Students</Link></div>
                <div className='txt'><Link to="Addrecruitments">Add Recruitments</Link></div>
                <div className='txt'><Link to="posts">View Posts</Link></div>
                {/* <div className='txt'><Link to="changepssdR">Change Password</Link></div> */}
            </div>  
        </div> 
    </div>
  )
}

export default Recruiter