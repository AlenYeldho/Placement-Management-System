import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Viewstd.scss"

function ViewStd() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Viewstudents');
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response=await axios.delete(`http://localhost:3001/deleteuser/${id}`);
      // If deletion is successful, fetch data again to update the list
      fetchData();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='viewstd'>
      <button><h6>Add Student</h6></button>
      <div className='table'>
        <div className='thead'>
          <div className='contain'><h5>Name</h5></div>
          <div className='contain1'><h5>Reg No.</h5></div>
          <div className='contain1'><h5>Branch</h5></div>
          <div className='contain1'><h5>Semester</h5></div>
          <div className='contain'><h5>Email</h5></div>
          <div className='contain'><h5>Phone No.</h5></div>
          <div className='contain1'><h5>Action</h5></div>  
        </div>
        {userData.map((post, index) => (
          <div className='tbody' key={index}>
            <div className='contain'><h6>{post.sname}</h6></div>
            <div className='contain1'><h6>{post.sregno}</h6></div>
            <div className='contain1'><h6>{post.sbranch}</h6></div>
            <div className='contain1'><h6>{post.ssem}</h6></div>
            <div className='contain'><h6>{post.semail}</h6></div>
            <div className='contain'><h6>{post.sphno}</h6></div>
            <div className='contain1'>
              <button onClick={() => handleRemove(post._id)}><h6>Remove</h6></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewStd;
