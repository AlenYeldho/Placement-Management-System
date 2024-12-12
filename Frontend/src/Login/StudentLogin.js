import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Login.scss";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [regno, setRegno] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const studentData = {
      sregno: regno,
      semail: email,
      spassword: password,
    };

    try {
        const response = await axios.post('http://localhost:3001/studentlogin', studentData);
        if (response.data.msg === "Login successful!") {
          alert('Login successfull');
          localStorage.setItem('userId', response.data.data); // Store user ID in localStorage
          window.location.href = `/student/${response.data.data}`; // Redirect to profile page with user ID
        }
      } catch (error) {
        console.error('Login failed:', error);
        
        if (error.response) {
            alert(error.response.data);
        } else {
          alert('Error submitting form!');
        }
      }
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-section">
                <div className="login-form">
                    <h1>student sign-in</h1>
                    <p>Not registered yet? <Link to="/studentreg">register here</Link></p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="example@gmail.com" 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="regno">Register-no</label>
                            <input 
                                type="regno" 
                                id="regno" 
                                name="regno" 
                                value={regno}  
                                onChange={(e) => setRegno(e.target.value)}
                                placeholder="Register-no" 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id="password" 
                                name="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password" 
                                required 
                            />
                            <span className="toggle-password" onClick={togglePasswordVisibility}>
                                {showPassword ? '🙈' : '👁️'}
                            </span>
                        </div>
                       
                        <button type="submit">Sign in</button>
                    </form>
                </div>
            </div>
            <div className="info-section">
                <div className="info-card">
                    <img src='Mobile login-bro.png'></img>
                </div>
            </div>
        </div>
    );
}

export default StudentLogin;
