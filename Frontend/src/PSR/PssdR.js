import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Pssd.scss"
function PssdR() {

  const [email, setEmail] = useState('');
  const [rpassword, setRpassword] = useState('');
  const [newpassword, setNewpassword] = useState("");

  return (
    <div className='main'>
          <div className='form loginRecuiter'>
          <form >
            <div className='heading'>
              <h2>Update</h2>
            </div>
              <div className='body'>
                <label>Email</label><br/>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                <label>Old Password</label><br/>
                <input type='password'value={rpassword} onChange={(e) => setRpassword(e.target.value)}/><br/>
                <label>New Password</label><br/>
                <input type='password'value={newpassword} onChange={(e) => setNewpassword(e.target.value)}/><br/>
              </div>
              <button type='submit'>Save</button>
  
  
          </form>
      </div>
      </div>
  )
}

export default PssdR