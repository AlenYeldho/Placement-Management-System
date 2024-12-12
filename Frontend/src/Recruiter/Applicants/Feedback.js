import React, { useState } from 'react';
import axios from 'axios';
import "./Feedback.scss";

function Feedback() {
    const [technicalSkills, setTechnicalSkills] = useState("");
    const [communicationSkills, setCommunicationSkills] = useState("");
    const [problemSolvingSkills, setProblemSolvingSkills] = useState("");
    const [knowledgeOfCompany, setKnowledgeOfCompany] = useState("");
    const [planningSkills, setPlanningSkills] = useState("");
    


const handleSubmit = async (event) => {
    event.preventDefault();
    const studentId = localStorage.getItem('feedbackStudentId');
    if (!studentId) {
        console.error('Selected student ID not found');
        return;
    }
    const feedbackData = {
        stdid: studentId,
        skills: {
            technical: parseInt(technicalSkills),
            communication: parseInt(communicationSkills),
            problem: parseInt(problemSolvingSkills),
            knowledge: parseInt(knowledgeOfCompany),
            planning: parseInt(planningSkills)
        }
    };

    try {
        await axios.post('http://localhost:3001/feedback', feedbackData);
        alert("Feedback submitted successfully");
    } catch (error) {
        console.error('Error submitting feedback:', error);
    }
}


    return (
        <div className='feedback'>
            <h2>Student Feedback Form</h2>
            <div className='line'></div>
            <div className='labels'>
                <h4>Give feedback to students based on their Performance</h4>
                <label>Very Good</label>
                <label>Good</label>
                <label>Fair</label>
                <label>Poor</label>
                <label>Very Poor</label>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className='body'>
                    <div className='raw'>
                        <label>Technical Skills</label>
                        <div className='inputs'>
                            {[1, 2, 3, 4, 5].map(option =>(
                                <input
                                    key={option}
                                    type="radio"
                                    value={option}
                                    checked={technicalSkills === option.toString()}
                                    onChange={(event) => setTechnicalSkills(event.target.value)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='raw'>
                        <label>Communication Skills</label>
                        <div className='inputs'>
                            {[1, 2, 3, 4, 5].map(option => (
                                <input
                                    key={option}
                                    type="radio"
                                    value={option}
                                    checked={communicationSkills === option.toString()}
                                    onChange={(event) => setCommunicationSkills(event.target.value)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='raw'>
                        <label>Problem Solving Skills</label>
                        <div className='inputs'>
                            {[1, 2, 3, 4, 5].map(option => (
                                <input
                                    key={option}
                                    type="radio"
                                    value={option}
                                    checked={problemSolvingSkills === option.toString()}
                                    onChange={(event) => setProblemSolvingSkills(event.target.value)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='raw'>
                        <label>Knowledge of Company</label>
                        <div className='inputs'>
                            {[1, 2, 3, 4, 5].map(option => (
                                <input
                                    key={option}
                                    type="radio"
                                    value={option}
                                    checked={knowledgeOfCompany === option.toString()}
                                    onChange={(event) => setKnowledgeOfCompany(event.target.value)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='raw'>
                        <label>Planning, Organizing and Decision making skills</label>
                        <div className='inputs'>
                            {[1, 2, 3, 4, 5].map(option => (
                                <input
                                    key={option}
                                    type="radio"
                                    value={option}
                                    checked={planningSkills === option.toString()}
                                    onChange={(event) => setPlanningSkills(event.target.value)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <button type="submit"><h6>Submit</h6></button>
            </form>
        </div>
    );
}

export default Feedback;
