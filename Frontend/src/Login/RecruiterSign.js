import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Login.scss";

function RecruiterSign() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const recruiterData = {
            cname: companyName,
            cemail: email,
            cphno: phone,
            cpassword: password,
        };

        try {
            const response = await axios.post('http://localhost:3001/recruitercreate', recruiterData);
            alert('Registration successful!');
            console.log(response.data);
        } catch (error) {
            console.error('Registration failed:', error);
            if (error.response) {
                alert(error.response.data.msg);
            } else {
                alert('Error submitting form!');
            }
        }
    }

    return (
        <div className='login-container'>
            <div className='login-section'>
                <div className='login-form'>
                    <h1>Register now!</h1>
                    <form onSubmit={handleSubmit} className='form registerRecuiter'>
                        <div className='input-group'>
                            <label>Company Name</label><br />
                            <input type='text' value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" /><br />
                        </div>
                        <div className='input-group'>
                            <label>Email</label><br />
                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br />
                        </div>
                        <div className='input-group'>
                            <label>Phone No.</label><br />
                            <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone No." /><br />
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
                        Already a user? Please <Link to="/recruiterlogin">Login!</Link>
                    </p>
                </div>
            </div>
            <div className="info-section2">
              <div className="info-card">
              <img src='Sign up-bro.png'/>
              </div>
          </div>
        </div>
    )
}

export default RecruiterSign;
