'use client';
import React from 'react';
import { getRandomColors } from '@/utils/functional';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  title: string;
  label: string;
  dataset: { id: number[]; labels: string[]; data: number[] };
  handleClick: (index: number) => void;
}

export const DoughnutChart = ({ dataset, title, label, handleClick }: DoughnutChartProps) => {
  const colorScheme = getRandomColors(dataset.labels.length);
  const data = {
    labels: dataset.labels,
    datasets: [
      {
        label: label,
        data: dataset.data,
        backgroundColor: colorScheme.backgroundColors,
        borderColor: colorScheme.borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    onClick: (event: any, element: any, chart: any) => {
      handleClick(element[0].index);
    },
  };

  return (
    <>
      <h2 className="text-center">{title}</h2>
      <div>
        <Doughnut options={options} data={data} />
      </div>
    </>
  );
};
