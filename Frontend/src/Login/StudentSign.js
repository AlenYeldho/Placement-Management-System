import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import "./Login.scss"
function StudentSign() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [studentName,setStudentName] = useState("");
    const [regno, setRegno] = useState("");
    const [branch, setBranch] = useState("");
    const [sem, setSem] = useState("");


    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submit behavior
  
      const studentData = {
        semail: email,
        spassword: password,
        sphno: phone,
        sname: studentName,
        sregno: regno,
        sbranch: branch,
        ssem: sem
      };
  
      try {
        // Post data to the server
        const response = await axios.post('http://localhost:3001/studentsignup', studentData);
        alert('Registration successful!'); 
        console.log(response.data);
      } catch (error) {
        console.error('Registration failed:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert(error.response.data.msg);
        } else {
          alert('Error submitting form!');
        }
      }
    };


    return (
      <div className='login-container'>
          <div className='login-section'>
              <div className='login-form'>
                  <h1>Register now!</h1>
                  <form onSubmit={handleSubmit} className='form registerStudent'>
                      <div className='input-group'>
                          <label>Student name</label><br />
                          <input type='text' value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Student Name" /><br />
                      </div>
                      <div className='input-group'>
                          <label>Register No.</label><br />
                          <input type='text' value={regno} onChange={(e) => setRegno(e.target.value)} placeholder="Reg-no" /><br />
                      </div>
                      <div className='input-group'>
                          <label>Semester.</label><br />
                          <input type='text' value={sem} onChange={(e) => setSem(e.target.value)} placeholder="semester." /><br />
                      </div>
                      <div className='input-group'>
                          <label>Branch.</label><br />
                          <input type='text' value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="branch." /><br />
                      </div>
                      <div className='input-group'>
                          <label>Email</label><br />
                          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e-mail." /><br />
                      </div>
                      <div className='input-group'>
                          <label>Phone No</label><br />
                          <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone-no." /><br />
                      </div>
                      <div className='input-group'>
                          <label>Password</label><br />
                          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <button type='submit' className='btn-register'>Register</button>
                      </div>
                  </form>
                  <p>
                      Already a user? Please <Link to="/studentlogin">Login!</Link>
                  </p>
              </div>
          </div>
          <div className="info-section2">
              <div className="info-card">
               <img src='Sign up-amico.png'/>
              </div>
          </div>
      </div>
    )
 }

export default StudentSign