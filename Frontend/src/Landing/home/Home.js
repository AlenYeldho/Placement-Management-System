import React from 'react'
import "./home.scss"
function Home() {
  return (
    <div className='home'>
        <div className='image'>
        <div className='logosub'>
                <img src='mbits.png' alt=''/>
                <img src='nac-logo.png' alt=''/>      
          </div>   
          <img src='institute.png'alt=''/>
        </div>
        <div className='text'>
          <h1 style={{color: "rgb(71, 73, 74)"}}>TRAINING AND PLACEMENT CELL</h1>
          <p>The MBITS Corporate Relations and Placements team provides all the modern and latest techniques to ensure and satisfy the requirements of the modern organisations. The aim of the placement cell is to pick and place all our students with quality recruiters based on their talent and skill. As a social commitment to the society, MBITS Placement cell takes initiatives to host and coordinate pooled campus recruitment drives of different companies for the students of various colleges in the state of Kerala.</p>
          <h1  style={{color: "rgb(71, 73, 74)"}}>ABOUT PLACEMENT CELL</h1>
          <p>A full time experienced placement officer together with two other faculty members of the college along with a team of trained students is working towards realising the objective.</p>
          <h2>objective</h2>
          <p>To make students competent for the dynamic requirement of the society/industry.</p>
        </div>
    </div>
  )
}

export default Home