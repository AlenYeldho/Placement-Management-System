import React from 'react'
import ReactApexChart from 'react-apexcharts';
import "./chart.scss"

function ChartAdmin() {

    const state = {
        series: [
            {
                name: 'Number of Companys',
                type: 'column',
                data:[29,42,43,20,32,42,42,32,45,45,30]
            },
            {
                name: 'Number of Placed Students',
                type: 'column',
                data:[100,158,78,105,203,156,408,127,138,252,173]
            },
           
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
            categories: ["2012-13","2013-14","2014-15","2015-16","2016-17","2017-18","2018-19","2019-20","2020-21","2021-22","2022-23","2023-24"],
            title:{
                text: '( Year )'
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
    <div className='container'>
    
            <div id="chart">
              <ReactApexChart options={state.options} series={state.series} type="bar" height={500}  />
            </div>z
         </div>
  )
}

export default ChartAdmin