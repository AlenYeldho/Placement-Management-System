import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddDrives from '../AddDrives/AddDrives'
import Company from '../Company/Company'
import ViewStd from '../Students/ViewStd'
import ViewDrive from '../ViewDrive/ViewDrive'
import Placedstd from '../Placedstd/Placedstd'
import PssdA from '../../PSR/PssdA'
import Resume from '../../Resume/Resume'

function RouterAdmin() {
  return (
    <div>
        <Routes>
        <Route path='AddDrives' element={<AddDrives/>}/>
        <Route path='companys' element={<Company/>}/>
        <Route path='viewstd' element={<ViewStd/>}/>
        <Route path='Drives' element={<ViewDrive/>}/>
        <Route path='Placed/*' element={<Placedstd/>}/>
        <Route path='changepssdA' element={<PssdA/>}/>
        <Route path="resume" element={<Resume/>} />
       </Routes>
    </div>
  )
}

export default RouterAdmin