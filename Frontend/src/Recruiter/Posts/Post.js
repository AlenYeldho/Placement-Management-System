import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./post.scss";

function Post() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      axios.get(`http://localhost:3001/Viewpost/${userIdFromStorage}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(err => console.log(err));
    }
  }, []);

  const handleDelete = (postId) => {
    axios.delete(`http://localhost:3001/deletePost/${postId}`)
      .then(response => {
        console.log(response.data);
        // Assuming the response indicates successful deletion, update the state to reflect the changes
        setUserData(prevState => ({
          ...prevState,
          posts: prevState.posts.filter(post => post._id !== postId)
        }));
      })
      .catch(err => console.log(err));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className='Post'>
      <div className='table'>
        <div className='thead'>
          <h5>Company</h5>
          <h5>Criteria</h5>
          <h5>Role</h5>
          <h5>Date</h5>
          <h5>Time</h5>
          <h5>Action</h5>
        </div>
        {userData && userData.posts && userData.posts.map((post, index) => (
          <div className='tbody' key={index}>
            <div className='container1'><h6>{post.companyName}</h6></div>
            <div className='container2'><h6>{post.criteria}</h6></div>
            <div className='container3'><h6>{post.role}</h6></div>
            <div className='container4'><h6>{formatDate(post.date)}</h6></div>
            <div className='container5'><h6>{post.time}</h6></div>
            <button onClick={() => handleDelete(post._id)}><h6>Delete</h6></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
