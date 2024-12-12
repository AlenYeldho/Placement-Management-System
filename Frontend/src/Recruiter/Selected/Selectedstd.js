import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './selectedstd.scss';
import { Link } from 'react-router-dom';
import RouterRec from '../RouterRec/RouterRec';

function Selectedstd() {
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        const fetchSelectedStudents = async () => {
            try {
                const recruiterId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:3001/recruiter/${recruiterId}/selectedstudents`);
                setSelectedStudents(response.data);
            } catch (error) {
                console.error('Error fetching selected students:', error);
            }
        };

        fetchSelectedStudents();
    }, []);

    const handleResume = async (studentId) => {
        try {
            localStorage.setItem('resumeStudentId', studentId);
            const recruiterId = localStorage.getItem('userId');
            // Assuming there's an endpoint to fetch the resume of a student
            const response = await axios.get(`http://localhost:3001/recruiter/${recruiterId}/student/${studentId}/resume`);
            // Process the response to display the resume, such as opening it in a new tab
            window.open(response.data.resumeUrl, '_blank');
        } catch (error) {
            console.error('Error fetching student resume:', error);
        }
    };

    return (
        <div className='selected'>
            <RouterRec/>
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
                        <div className='contain'><h6>{student.stdid.profile.firstName}</h6></div>
                        <div className='contain'><h6>{student.stdid.profile.email}</h6></div>
                        <div className='contain'><h6>{student.stdid.profile.phone}</h6></div>
                        <div className='contain'><h6>{student.stdid.profile.regno}</h6></div>
                        <div className='contain'>
                        <button onClick={() => handleResume(student.stdid._id)}>
                          <Link to={`details`}><h6>View</h6></Link>
                        </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Selectedstd;
