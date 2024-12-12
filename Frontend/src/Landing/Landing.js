import React from 'react'
import Navbar from './navbar/navbar'
import Home from './home/Home'
import Recruiter from './home/Recruiter'
import Contact from './home/Contact'
function Landing() {
  return (
    <div className='landing'>
      
        <section id="Home">
        <Navbar/>
        <Home/>
        </section>
        <section id="Recruiters">
        <div style={{height:0.01}}></div>
        <div className='hello' style={{ 
          marginTop:80,
          alignContent:'center',
          textAlign:"center",
          backgroundColor:'#2F6EC5',
          height:250,
          width:1550
        }}>
          <h2 style={{fontSize:50,color:"#FFFFFF "}}>Training and Placement Cell</h2>
          <h6 style={{fontSize:20,marginTop:20,color:"#FFFFFF "}}>A fully-fledged Training & Placement Cell is working towards better opportunities for its students and bridges the gap between prospective employer and candidate.
          </h6>
        </div>
           <Recruiter/>
      </section>
      <section id="Contact">
      <div style={{height:90}}></div>
       <h1 style={{marginLeft:230,marginTop:20,color: "rgb(71, 73, 74)"}}><b>Contact Us</b></h1>
        <Contact/>
      </section>
      
    </div>
  )
}

export default Landing