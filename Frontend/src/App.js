import React from "react";
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./Landing/Landing"
import RecruiterSign from "./Login/RecruiterSign";
import RecruiterLogin from "./Login/RecruiterLogin";
import StudentLogin from "./Login/StudentLogin";
import StudentSign from "./Login/StudentSign";
import AdminLogin from "./Login/AdminLogin";
import "./app.scss"
import Student from "./student/Student";
import Recruiter from "./Recruiter/Recruiter"
import Admin from "./Admin/Admin"
function App() {
  return (
    <div className="app">
       <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='studentreg' element={<StudentSign/>}/>
          <Route path='recruiterreg' element={<RecruiterSign/>}/>
          <Route path='studentlogin' element={<StudentLogin/>}/>
          <Route path='recruiterlogin' element={<RecruiterLogin/>}/>
          <Route path='adminlogin' element={<AdminLogin/>}/>
          <Route path="student/*" element={<Student/>}/> 
          <Route path="recruiter/*" element={<Recruiter/>}/>
          <Route path="admin/*" element={<Admin/>}/>
          
        </Routes>
    </div>
  );
}

export default App;
