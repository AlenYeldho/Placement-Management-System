import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../Recruiter/Selected/selectedstd.scss';
import RouterAdmin from '../RouterAdmin/RouterAdmin';


function Placedstd() {
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        const fetchSelectedStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/admin/Placed/selectedstudents`);
                setSelectedStudents(response.data);
            } catch (error) {
                console.error('Error fetching selected students:', error);
            }
        };

        fetchSelectedStudents();
    }, []);

    const handleResume = async (studentId) => {
        try {
          localStorage.setItem('resumeStudentId', studentId); // Set the selected student ID in local storage
          const recruiterId = localStorage.getItem('userId');
          await axios.post(`http://localhost:3001/recruiter/${recruiterId}/student/${studentId}/details`);
        } catch (error) {
          console.error('Error marking view student:', error);
        }
      };
    return (
        <div className='selected'>
            <RouterAdmin/>
            <h2>Selected Students</h2>
            <div className='table'>
                <div className='thead'>
                    <div className='contain'> <h5>Name</h5></div>
                    <div className='contain'><h5>Email</h5></div>
                    <div className='contain'> <h5>Phone No</h5></div>
                    <div className='contain'><h5>Register No.</h5></div>
                    <div className='contain'><h5>Resume</h5></div>
                </div>
                {selectedStudents.map(student => (
                    <div key={student._id} className='tbody'>
                        <div className='contain'><h6>{student.stdid.profile.firstName}</h6></div> {/* Updated to access profile directly */}
                        <div className='contain'><h6>{student.stdid.profile.email}</h6></div>
                        <div className='contain'><h6>{student.stdid.profile.phone}</h6></div>
                        <div className='contain'><h6>{student.stdid.profile.regno}</h6></div>
                        <div className='contain'><button onClick={() => handleResume(student.stdid._id)}>
                          <Link to={`resume`}><h6>View</h6></Link>
                        </button></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Placedstd;
