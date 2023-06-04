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
  ChartOptions,
  ChartData,
} from 'chart.js';
import { useRouter } from 'next/navigation';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  title: string;
  label: string;
  dataset: { id: number[]; labels: string[]; data: number[] };
  units: string;
}

interface ChartProps {
  options: ChartOptions<'bar'>;
  data: ChartData<'bar'>;
}

export const BarChart = (
  { dataset, title, label, units }: BarChartProps,
  { options, data }: ChartProps
) => {
  const router = useRouter();
  data = {
    labels: dataset.labels,
    datasets: [
      {
        label: label,
        data: dataset.data,
        backgroundColor: 'rgb(255, 99, 132)',
        stack: 'Stack 0',
        hoverBackgroundColor: 'rgb(155, 99, 132)',
      },
    ],
  };

  options = {
    maintainAspectRatio: false,
    onClick: (event, element, chart) => {
      if (element.length > 0) {
        router.push(`/pokedex?pokemon=${dataset.id[element[0].index]}`);
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
