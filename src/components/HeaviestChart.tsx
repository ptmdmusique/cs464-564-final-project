'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { Pokemon } from 'pokenode-ts';
import { sortByWeight, formatWeight } from '@/utils/functional';
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

interface HeaviestChartProps {
  pokemonList: Pokemon[];
}

export const HeaviestChart = ({ pokemonList }: HeaviestChartProps) => {
  const [sortedByWeight, setSortedByWeight] = useState<Pokemon[]>([]);

  useEffect(() => {
    setSortedByWeight(sortByWeight(pokemonList));
  }, [pokemonList]);
  let sortedData: number[] = [];
  let sortedLabels: string[] = [];
  sortedByWeight.forEach((pokemon) => sortedData.push(pokemon.weight));
  sortedByWeight.forEach((pokemon) => sortedLabels.push(pokemon.name));
  sortedData = formatWeight(sortedData);

  const data = {
    labels: sortedLabels,
    datasets: [
      {
        label: 'Weight in killigrams',
        data: sortedData,
        backgroundColor: 'rgb(255, 99, 132)',
        stack: 'Stack 0',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          callback: function (value: any, index: any, ticks: any) {
            return value + 'kg';
          },
        },
      },
    },
  };

  return (
    <>
      <h2 className="text-center">Top 10 Heaviest Pokemon</h2>
      <div>
        <Bar options={options} data={data} />
      </div>
    </>
  );
};
