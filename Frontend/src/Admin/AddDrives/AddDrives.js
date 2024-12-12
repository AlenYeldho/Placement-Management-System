import React from 'react'
import "../../Recruiter/AddRecruitment/Addrecruitments.scss"
import { useState, useEffect } from 'react';
import axios from 'axios';
function AddDrives(){
const [cname, setCname] = useState('');
const [criteria, setCriteria] = useState('');
const [role, setRole] = useState('');
const [date, setDate] = useState('');
const [time, setTime] = useState('');


const handleSubmit = async (event) => {
  event.preventDefault();

  const jobData = {
    companyName: cname,
    criteria: criteria,
    role: role,
    date: date,
    time: time,
  };

  try {
    const response = await axios.post(`http://localhost:3001/adminposts`, jobData);
    console.log('Post updated successfully:', response.data);
    alert('Post updated successfully'); 
  } catch (error) {
    console.error('Error updating post:', error);
    alert('Error updating post!');
  }
};

return (
  <div className='post'>
      <form onSubmit={handleSubmit}>
        <label>Company Name</label><br/>
        <input className='input'  value={cname} onChange={(e) => setCname(e.target.value)} /><br/>
        <label>Criteria</label><br/>
        <input className='input'  value={criteria} onChange={(e) => setCriteria(e.target.value)}/><br/>
        <label>Role</label><br/>
        <input className='input' value={role} onChange={(e) => setRole(e.target.value)}/><br/>
        <label>Date</label><br/>
        <input className='input' type='date' value={date} onChange={(e) => setDate(e.target.value)}/><br/>
        <label>Time</label><br/>
        <input className='input' value={time} onChange={(e) => setTime(e.target.value)}/><br/>
        <button><h6>submit</h6></button>
      </form>
  </div>
)
}


export default AddDrives