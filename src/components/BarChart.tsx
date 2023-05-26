'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  id: number[];
  title: string;
  label: string;
  labels: string[];
  sortedData: number[];
  units: string;
}

export const BarChart = ({ id, title, label, labels, sortedData, units }: BarChartProps) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: sortedData,
        backgroundColor: 'rgb(255, 99, 132)',
        stack: 'Stack 0',
        hoverBackgroundColor: 'rgb(155, 99, 132)',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    onClick: (event: any, element: any, chart: any) => {
      if (element.length > 0) {
        window.location.href = `http://localhost:3000//pokedex?pokemon=${id[element[0].index]}`;
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: any, index: any, ticks: any) {
            return value + units;
          },
        },
      },
    },
  };

  return (
    <>
      <h2 className="text-center">{title}</h2>
      <div>
        <Bar options={options} data={data} />
      </div>
    </>
  );
};
