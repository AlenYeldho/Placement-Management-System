import React from 'react';
import "./recruiter.scss";
import Carousel from 'react-bootstrap/Carousel';

function Recruiter() {
    return (
        <div className='div'>
            <h1 style={{marginLeft:20,color: "rgb(71, 73, 74)",}} ><b>PLACEMENT RECRUITERS</b></h1>
                        <img
                            
                            src="pls1.png"
                            alt="First slide"
                            style={{ height: "380px", width: "300px",marginTop:"5px"}}
                        />
                      
                        <img
                            
                            src="pls2.png"
                            alt="First slide"
                            style={{ height: "380px", width: "300px",marginTop:"5px"}}
                        />
                       
                        <img
                           
                            src="pls3.png"
                            alt="First slide"
                            style={{ height: "380px", width: "300px",marginTop:"5px"}}
                        />
                      
                        <img
                          
                            src="pls4.png"
                            alt="First slide"
                            style={{ height: "380px", width: "300px",marginTop:"5px"}}
                        />
                       
                      
           
        </div>
    );
}

export default Recruiter;
