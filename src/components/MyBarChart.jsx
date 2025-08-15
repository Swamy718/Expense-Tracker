import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MyBarChart = ({ labels, values }) => {
  const colors = [
    "rgba(130, 35, 219, 0.8)", 
    "rgba(178, 116, 236, 0.8)",   
  ];
  const barColors = values.map((_, index) => colors[index % colors.length]);
  const data = {
    labels: labels || [],
    datasets: [
      {
        label: "Amount Spent on Recent Purchase Days",
        data: values || [],
        backgroundColor: barColors,
        borderRadius: { topLeft: 20, topRight: 20 }
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display:true}
    },
    scales: {
      x: {
        grid: { display: false }
      },
      y: {
        grid: { display: false }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default MyBarChart;
