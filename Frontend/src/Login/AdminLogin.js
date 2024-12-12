import React ,{useState}from 'react'
import axios from 'axios'
import "./Login.scss"
function AdminLogin(){
    const [admin,setAdmin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
    
    
      const adminData = {
          
          aname:admin,
          apassword:password,
      };
    
      try {
        // Post data to the server
        const response = await axios.post('http://localhost:3001/adminlogin', adminData) .then((response) => {
          console.log("response:",response.data)
          if(response.data === "admin logged in")
          {
               alert('Login successfull');
               window.location.href = '/admin';
          }
        }
      );
        
      } catch (error) {
        console.error('login failed:', error);
        if (error.response) {
          alert("Invalid Admin.")
          // alert(error.response.data.msg);
        } else {
          alert('Error submitting form!');
        }
      }
    
    }
    return (
      <div className="login-container">
          <div className="login-section">
              <div className="login-form">
                  <h1>Admin Sign in</h1>
                  <form onSubmit={handleSubmit}>
                      <div className="input-group">
                          <label htmlFor="user_name">user-name</label>
                          <input 
                              type="text" 
                              id="admin" 
                              name="admin" 
                              value={admin} 
                              onChange={(e) => setAdmin(e.target.value)} 
                              placeholder="admin-name" 
                              required 
                          />
                      </div>
                      <div className="input-group">
                          <label htmlFor="password">Password</label>
                          <input 
                              id="password" 
                              name="password" 
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)} 
                              placeholder="Password" 
                              required 
                          />
                          
                      </div>
                      
                      <button type="submit">Log in</button>
                  </form>
              </div>
          </div>
          <div className="info-section">
              <div className="info-card">
              <img src='Visual data-bro.png'/>
              </div>
          </div>
          </div>
    );
 }

export default AdminLogin