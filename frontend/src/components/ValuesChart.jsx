import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ValuesChart = ({ values }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!values.length) return;

    const ctx = chartRef.current.getContext('2d');
    
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: values.map(v => v.value.name),
        datasets: [{
          data: values.map(v => v.points),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    return () => chart.destroy();
  }, [values]);

  return <canvas ref={chartRef} />;
};

export default ValuesChart;