import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import "./chart.scss";

function Chart() {
    const [feedbackData, setFeedbackData] = useState({
        technical: [],
        problem: [],
        planning: [],
        communication: [],
        knowledge: []
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:3001/feedback/${userId}`);
                setFeedbackData(response.data);
            } catch (error) {
                console.error('Error fetching feedback data:', error);
            }
        }
        fetchData();
    }, []);

    const state = {
        series: [
            {
                name: 'Technical Skill',
                type: 'column',
                data: feedbackData.technical
            },
            {
                name: 'Problem Solving Skill',
                type: 'column',
                data: feedbackData.problem
            },
            {
                name: 'Planning,Organizing and Decision Making',
                type: 'column',
                data: feedbackData.planning
            },
            {
                name: 'Communication Skill',
                type: 'column',
                data: feedbackData.communication
            },
            {
                name: 'Knowledge of the Company',
                type: 'column',
                data: feedbackData.knowledge
            }
        ],
        options: {
          colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800'],
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '90%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: [1,2,3,4,5,6,7],
            title:{
                text: '( Interview Attempted )'
            }
          },
          yaxis: {
            title: {
              text: '( Performance )'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$ " + val 
              }
            }
          }
        }
    };

    return (
      <div className='perform'>
      <div className='chart'>
         <h1>Performance Chart</h1>
         <div className='container'>
            <div id="chart">
              <ReactApexChart options={state.options} series={state.series} type="bar" height={500} />
            </div>
         </div>
         <div className='value'>
            <table>
               <thead>
                 <tr>         
                 <th>Value</th>
                 <th>Performance</th>
                 </tr>
               </thead>
               <tbody>
                <tr>
                <td>1</td>
                <td>Very Poor</td>
               </tr>
                <tr>
                 <td>2</td>
                 <td>Poor</td>
               </tr>
                <tr>
                 <td>3</td>
                  <td colSpan={2}>Fair</td>
                 </tr>
                 <tr>
                 <td>4</td>
                 <td>Good</td>
               </tr>
               <tr>
                 <td>5</td>
                 <td>Excellent</td>
               </tr>
            </tbody>
          </table>
         </div>
    </div>
  </div>
    );
}

export default Chart;
