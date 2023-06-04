import { ColorRGB } from '@/data/color-type';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getRandomArrayElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

//Used for doughnut charts to generate random colors for the cell background and borders
export const getRandomColors = (numOfItems: number) => {
  let backgroundColors: string[] = [];
  let borderColors: string[] = [];
  for (let i = 0; i < numOfItems; i++) {
    const val1 = Math.random() * 255;
    const val2 = Math.random() * 255;
    const val3 = Math.random() * 255;
    backgroundColors.push(`rgba(${val1}, ${val2}, ${val3}, 0.8)`);
    borderColors.push(`rgba(${val1}, ${val2}, ${val3}, 1)`);
  }
  return { backgroundColors: backgroundColors, borderColors: borderColors };
};

//Used for doughnut charts to generate random colors for the cell background and borders
export const getColors = (labels: string[]) => {
  let backgroundColors: string[] = [];
  let borderColors: string[] = [];
  for (let i = 0; i < labels.length; i++) {
    backgroundColors.push(
      `rgba(${ColorRGB[labels[i].toLowerCase() as keyof typeof ColorRGB]}, 0.7)`
    );
    borderColors.push(`rgba(${ColorRGB[labels[i].toLowerCase() as keyof typeof ColorRGB]}, 0.9)`);
  }
  return { backgroundColors: backgroundColors, borderColors: borderColors };
};
