import { ColorRGB, LabelColor, HabitatChartColors, ShapeChartColors } from '@/data/doughnut-colors';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getRandomArrayElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

//Used for doughnut charts to generate random colors for the cell background and borders
export const getColors = (labels: string[], label: string) => {
  if (label === 'Habitat') return HabitatChartColors;
  if (label === 'Body Shape') return ShapeChartColors;
  let backgroundColors: string[] = [];
  let borderColors: string[] = [];
  for (let i = 0; i < labels.length; i++) {
    backgroundColors.push(`rgba(${ColorRGB[labels[i].toLowerCase() as LabelColor]}, 0.7)`);
    borderColors.push(`rgba(${ColorRGB[labels[i].toLowerCase() as LabelColor]}, 0.9)`);
  }
  return { backgroundColors: backgroundColors, borderColors: borderColors };
};
