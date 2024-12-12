import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./applied.scss";

function Applied() {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3001/student/${userId}/applied`);
        console.log("Applied Jobs:", response.data);
        setAppliedJobs(response.data);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };
  
    fetchAppliedJobs();
  }, []);

  // Function to format the date to "YYYY-MM-DD"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className='applied'>
      <div className='table'>
        <div className='thead'>
        <div className='container2'><h5>Name</h5></div>
        <div className='container'><h5>Criteria</h5></div>
        <div className='container'><h5>Role</h5></div>
        <div className='container2'><h5>Date</h5></div>
        <div className='container2'><h5>Time</h5></div>
        </div>
        {appliedJobs.map((job, index) => (
          <div className='tbody' key={index}>
            <div className='container2'><h6>{job.companyName}</h6></div>
            <div className='container'><h6>{job.criteria}</h6></div>
            <div className='container'><h6>{job.role}</h6></div>
            <div className='container2'><h6>{formatDate(job.date)}</h6></div>
            <div className='container2'><h6>{job.time}</h6></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applied;
