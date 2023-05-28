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
  units: string;
}

export const DoughnutChart = ({ dataset, title, label, units }: DoughnutChartProps) => {
  const colorScheme = getRandomColors(dataset.labels.length);

  //TODO: On click render a chart on the bottom with pictures of all the Pokemon with that body shape
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
