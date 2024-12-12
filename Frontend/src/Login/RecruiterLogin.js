import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Login.scss";

function RecruiterLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const recruiterData = {
            cemail: email,
            cpassword: password,
        };

        try {
            const response = await axios.post('http://localhost:3001/recruiterLogin', recruiterData);
            console.log("response:", response.data);
            if (response.data.msg === "Login successful!") {
                alert('Login successfull');
                localStorage.setItem('userId', response.data.data);
                window.location.href = `/recruiter/${response.data.data}`;
            }
        } catch (error) {
            console.error('Login failed:', error);
            if (error.response) {
                alert('Invalid User');
                // alert(error.response.data.msg);
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
                    <h1>Sign in</h1>
                    <p>Not registered yet? <Link to="/recruiterreg">register here</Link></p>
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
                    <img src='At the office-bro.png'/>
                    </div>
            </div>
        </div>
    );
}

export default RecruiterLogin;
