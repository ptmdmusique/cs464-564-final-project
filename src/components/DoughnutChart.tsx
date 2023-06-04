'use client';
import React from 'react';
import { getColors, getRandomColors } from '@/utils/functional';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  title: string;
  label: string;
  dataset: { id: number[]; labels: string[]; data: number[] };
  handleClick: (index: number) => void;
}

interface ChartProps {
  options: ChartOptions<'doughnut'>;
  data: ChartData<'doughnut'>;
}

export const DoughnutChart = (
  { dataset, title, label, handleClick }: DoughnutChartProps,
  { data, options }: ChartProps
) => {
  let colorScheme: {
    backgroundColors: string[];
    borderColors: string[];
  };
  label === 'Color'
    ? (colorScheme = getColors(dataset.labels))
    : (colorScheme = getRandomColors(dataset.labels.length));

  data = {
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

  options = {
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
