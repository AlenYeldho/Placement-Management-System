import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './resume.scss';

function Resume() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      axios.get(`http://localhost:3001/View/${userIdFromStorage}`)
        .then(response => {
          console.log("response:", response.data);
          setUserData(response.data);
        })
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <div className='resume'>
      {userData && (
        <>
          <h6><b>{userData.profile.firstName}</b></h6>
          <h6>{userData.profile.state},{userData.profile.city},{userData.profile.pin}</h6>
          <h6>{userData.profile.phone}</h6>
          <h6>{userData.profile.email}</h6>
          <p>LinkedIn Profile:{userData.profile.linkedin}</p>
          
          <h6><b>Objective:</b></h6>
          <p>A dynamic and enthusiastic BTech student seeking opportunities to apply academic knowledge and technical skills in a professional setting. Eager to contribute to this post through innovative problem-solving, collaboration, and continuous learning. Seeking a challenging role where I can utilize my passion for this post to contribute to the growth and success of the organization while gaining valuable experience and furthering my career development.</p>
          
          <h6><b>Education:</b></h6>
          <h6>Bachelor of Technology (BTech) , KTU, Expected Graduation Year {userData.profile.expectedGraduation}</h6>
          
          <h6><b>Skills:</b></h6>
          <h6>Technical Skills:</h6>
          <ul>
            {userData.profile.technicalskill.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h6>Soft Skills:</h6>
          <ul>
            {userData.profile.softskill.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          
          <h6>Language Skills:</h6>
          <ul>
            {userData.profile.languageskill.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>

          <h6><b>Projects:</b></h6>
          <h6>{userData.profile.prijectTopic}</h6>
          <p>{userData.profile.prijectdesc}</p>

          <h6><b>Certifications:</b></h6>
          <h6>{userData.profile.certificate},{userData.profile.certificatedesc} </h6>


          <h6><b>Extracurricular Activities:</b></h6>
          <p>{userData.profile.extracariculam}</p>
        </>
      )}
    </div>
  );
}

export default Resume;
