import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Company.scss"

function Company() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Viewcompanys');
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/deletecompany/${id}`);
      // If deletion is successful, fetch data again to update the list
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='company'>
      <button><h6>Add Company</h6></button>
      <div className='table'>
        <div className='thead'>
          <div className='contain'><h5>Name</h5></div>
          <div className='contain'><h5>Email</h5></div>
          <div className='contain'><h5>Phone No.</h5></div>
          <div className='contain'><h5>Action</h5></div>
        </div>
        {userData.map((post, index) => (
          <div className='tbody' key={index}>
            <div className='contain'><h6>{post.cname}</h6></div>
            <div className='contain'><h6>{post.cemail}</h6></div>
            <div className='contain'><h6>{post.cphno}</h6></div>
            <div className='contain'>
              <button onClick={() => handleRemove(post._id)}><h6>Remove</h6></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Company;
