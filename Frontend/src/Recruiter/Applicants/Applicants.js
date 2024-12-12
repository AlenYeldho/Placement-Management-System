import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './applicants.scss';
import RouterRec from '../RouterRec/RouterRec';


function Applicants() {
    const [appliedStudents, setAppliedStudents] = useState([]);

    useEffect(() => {
        const fetchAppliedStudents = async () => {
            try {
                const recruiterId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:3001/recruiter/${recruiterId}/applied`);
                setAppliedStudents(response.data);
            } catch (error) {
                console.error('Error fetching applied students:', error);
            }
        };

        fetchAppliedStudents();
    }, []);

    const handleSelected = async (studentId) => {
      try {
        localStorage.setItem('selectedStudentId', studentId); // Set the selected student ID in local storage
        const recruiterId = localStorage.getItem('userId');
        await axios.post(`http://localhost:3001/recruiter/${recruiterId}/student/${studentId}/selected`);
        alert("Selected the student...")
      } catch (error) {
        console.error('Error marking student as selected:', error);
      }
    };

    const handleResume = async (studentId) => {
      try {
        localStorage.setItem('resumeStudentId', studentId); // Set the selected student ID in local storage
        const recruiterId = localStorage.getItem('userId');
        await axios.post(`http://localhost:3001/recruiter/${recruiterId}/student/${studentId}/details`);
      } catch (error) {
        console.error('Error marking view student:', error);
      }
    };

    const handleFeedback = (studentId) => {
      localStorage.setItem('feedbackStudentId', studentId);  // Set the selected student ID in local storage for feedback
  };

  return (
    
    <div className="applicants">
      <RouterRec/>
      <div className="table">
        <div className="thead">
          <div className="mark">
            <h5>Name</h5>
          </div>
          <div className="mark">
            <h5>Register No.</h5>
            </div>
            <div className='mark'><h5>12th</h5></div>
            <div className='mark'> <h5>Diploma</h5></div>
            <div className='mark'><h5>Degree</h5></div>
            <div className='mark'><h5>Branch</h5></div>
            <div className='mark'><h5><h5>Resume</h5></h5></div>
          <div className="action">
            <h5>Action</h5>
          </div>
        </div>
        {appliedStudents.map((student) => (
        <div className="tbody">
          
            <div key={student._id} className="student">
              <div className="mark">
                <h6>{student.sname}</h6>
              </div>
              <div className="mark">
                <h6>{student.sregno}</h6>
              </div>
              <div className="mark">
                <h6>{student.profile.twelve}</h6>
              </div>
              <div className='mark'>
                 <h6>{student.profile.diploma}</h6>
              </div>
                
                <div className='mark'>
                 <h6>{student.profile.graduation}</h6>
                </div>
                <div className='mark'>
                    <h6>{student.profile.branch}</h6>
                </div>        
              <div className="action">
                <button onClick={() =>{ handleResume(student._id)
                }}>
                  <Link to={`details`}><h6>View</h6></Link>
                </button>
                <button onClick={() =>{ handleSelected(student._id)
                }}><h6>Select</h6></button>
                <button onClick={() => handleFeedback(student._id)}>
                <Link to={`feedback`}><h6>Feedback</h6></Link>



                </button>
              </div>
            </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Applicants;
