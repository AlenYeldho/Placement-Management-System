import React from 'react'
import Profile from "../profile/Profile"
import Applied from "../applied/Applied"
import Current from "../current/Current"
import { Route, Routes } from 'react-router-dom'
import Chart from '../performance/Chart'
import PssdS from '../../PSR/PssdS'
import Resume from '../Resume/Resume'

function Router() {
  return (
    <div>
       <Routes>
        <Route path='profile' element={<Profile/>}/>
        <Route path='applied' element={<Applied/>}/>
        <Route path='current' element={<Current/>}/>
        <Route path='performance' element={<Chart/>}/> 
        <Route path='resume' element={<Resume/>}/>
        <Route path='changepssdS' element={<PssdS/>}/> 
       </Routes>
    </div>
  )
}

export default Router