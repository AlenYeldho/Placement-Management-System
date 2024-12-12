import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./profile.scss";

function Profile() {
  const [fname, setFname] = useState('');
  const [regno, setRegno] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [branch, setBranch] = useState('');
  const [twelve, setTwelve] = useState('');
  const [diploma, setDiploma] = useState('');
  const [graduation, setGraduation] = useState('');
  const [exp, setExp] = useState('');
  const [pin, setPin] = useState('');
  const [ts, setTs] = useState('');
  const [ss, setSs] = useState('');
  const [ls, setLs] = useState('');
  const [projectt, setProjectt] = useState('');
  const [projectd, setProjectd] = useState('');
  const [certificate, setCertificate] = useState('');
  const [certidesc, setCertidesc] = useState('');
  const [extra, setExtra] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
      fetchUserData(userIdFromStorage);
    }
  }, []);

  const fetchUserData = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:3001/View/${studentId}`);
      const data = response.data.profile;

      setFname(data.firstName || '');
      setRegno(data.regno || '');
      setCity(data.city || '');
      setState(data.state || '');
      setEmail(data.email || '');
      setGender(data.gender || '');
      setPhone(data.phone || '');
      setBirth(data.dateOfBirth || '');
      setBranch(data.branch || '');
      setTwelve(data.twelve || '');
      setDiploma(data.diploma || '');
      setGraduation(data.graduation || '');
      setExp(data.expectedGraduation || '');
      setPin(data.pin || '');
      setTs((data.technicalskill || []).join(', '));
      setSs((data.softskill || []).join(', '));
      setLs((data.languageskill || []).join(', '));
      setProjectt(data.prijectTopic || '');
      setProjectd(data.prijectdesc || '');
      setCertificate(data.certificate || '');
      setCertidesc(data.certificatedesc || '');
      setExtra(data.extracariculam || '');
      setLinkedin(data.linkedin || '');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const technicalSkillsArray = ts.split(',').map(skill => skill.trim());
    const softskillsArray = ss.split(',').map(skill => skill.trim());
    const languageskillArray = ls.split(',').map(skill => skill.trim());

    const profileData = {
      firstName: fname,
      regno: regno,
      email: email,
      gender: gender,
      phone: phone,
      twelve: twelve,
      diploma: diploma,
      graduation: graduation,
      branch: branch,
      dateOfBirth: birth,
      state: state,
      city: city,
      pin: pin,
      prijectTopic: projectt,
      prijectdesc: projectd,
      extracariculam: extra,
      certificate: certificate,
      certificatedesc: certidesc,
      expectedGraduation: exp,
      linkedin: linkedin,
      technicalskill: technicalSkillsArray,
      softskill: softskillsArray,
      languageskill: languageskillArray,
    };

    try {
      const response = await axios.post(`http://localhost:3001/studentprofile/${userId}`, profileData);
      console.log('Profile updated successfully:', response.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile!');
    }
  };

  return (
    <div className='profile'>
      <form onSubmit={handleSubmit}>
        <div className='h1'>
          <h1>My Profile</h1>
        </div>
        <div className='content'>
          <input className="input" placeholder='Name' value={fname} onChange={(e) => setFname(e.target.value)} />
          <input className="input" placeholder='Register No' value={regno} onChange={(e) => setRegno(e.target.value)} />
          <input className="input" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
          <input className="input" placeholder='State' value={state} onChange={(e) => setState(e.target.value)} />
          <input className="input" placeholder='Pin Code' value={pin} onChange={(e) => setPin(e.target.value)} />
          <input className="input" type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="input" placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input className="input" placeholder='Gender' value={gender} onChange={(e) => setGender(e.target.value)} />
          <input className="input" type="date" placeholder='Date of Birth' value={birth} onChange={(e) => setBirth(e.target.value)} />
          <input className="input" placeholder='Branch' value={branch} onChange={(e) => setBranch(e.target.value)} />
          <input className="input" placeholder='Enter your 12th Percentage' value={twelve} onChange={(e) => setTwelve(e.target.value)} />
          <input className="input" placeholder='Enter your Diploma CGPA' value={diploma} onChange={(e) => setDiploma(e.target.value)} />
          <input className="input" placeholder='Enter your Graduation CGPA' value={graduation} onChange={(e) => setGraduation(e.target.value)} />
          <input className="input" placeholder='Expected Graduation Year' value={exp} onChange={(e) => setExp(e.target.value)} />
          <input className="input" placeholder='Technical Skills' value={ts} onChange={(e) => setTs(e.target.value)} />
          <input className="input" placeholder='Soft Skills' value={ss} onChange={(e) => setSs(e.target.value)} />
          <input className="input" placeholder='Language Skills' value={ls} onChange={(e) => setLs(e.target.value)} />
          <input className="input" placeholder='Extracurricular Activities' type='textarea' value={extra} onChange={(e) => setExtra(e.target.value)} />
          <input className="input" placeholder='Project Topic' type='textarea' value={projectt} onChange={(e) => setProjectt(e.target.value)} />
          <input className="input" placeholder='[Brief Description], [Tools/Technologies Used] [Your Role]' type='textarea' value={projectd} onChange={(e) => setProjectd(e.target.value)} />
          <input className="input" placeholder='Certificates' type='textarea' value={certificate} onChange={(e) => setCertificate(e.target.value)} />
          <input className="input" placeholder='[Issuing Organization], [Date Earned]' type='textarea' value={certidesc} onChange={(e) => setCertidesc(e.target.value)} />
          <input className="input" placeholder='LinkedIn Link' value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
          <br />
          <br />
          <div className='button'>
            <button type='submit'>Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
