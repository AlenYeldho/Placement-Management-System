import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./current.scss";

function Current() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Viewcurrent');
        console.log("response:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleApply = async (post) => {
    const studentId = localStorage.getItem('userId');
    const job = {
      companyName: post.companyName,
      criteria: post.criteria,
      role: post.role,
      date: post.date,
      time: post.time,
      recid:post.recid,
    };

    try {
      // Send job application request to the server
      const response = await axios.post(`http://localhost:3001/student/${studentId}/apply`, job);
      alert(response.data); // Show success message
    } catch (error) {
      console.error('Error applying for job:', error);
      if (error.response) {
        alert(error.response.data); // Show error message from server
      } else {
        alert('Error applying for job!'); // Show generic error message
      }
    }
  };

  // Function to format the date to "YYYY-MM-DD"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className='current'>
      <div className='table'>
        <div className='thead'>
        <div className='container'><h5>Company</h5></div>
        <div className='container'><h5>Criteria</h5></div>
        <div className='container'><h5>Role</h5></div>
        <div className='container'><h5>Date</h5></div>
        <div className='container'><h5>Time</h5></div> 
        <div className='container'><h5>Action</h5></div>      
        </div>

        {userData.map((post, index) => (
          <div className='tbody' key={index}>
            <div className='container'><h6>{post.companyName}</h6></div>
            <div className='container'><h6>{post.criteria}</h6></div>
            <div className='container'><h6>{post.role}</h6></div>
            <div className='container'><h6>{formatDate(post.date)}</h6></div>
            <div className='container'><h6>{post.time}</h6></div>
            <div className='container'>
              <button onClick={() => handleApply(post)}>
                <h6>Apply</h6>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Current;
