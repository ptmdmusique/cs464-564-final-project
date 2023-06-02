import { Pokemon, PokemonShape } from 'pokenode-ts';
import { DoughnutData } from '@/app/statistics/page';
import { json } from 'stream/consumers';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getRandomArrayElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

//Sort pokemon by id
export const sortById = (pokemonList: Pokemon[]) => {
  return pokemonList.sort((a, b) => (a.id < b.id ? -1 : 1));
};

//Extract Pokemon ID, name, and sprite image based on pokemon ID
export const getPokemonData = (pokemonList: Pokemon[], pokemonIDs: number[]) => {
  let result: DoughnutData[] = [];
  for (let i = 0; i < pokemonIDs.length; i++) {
    let id = pokemonIDs[i];
    let name = pokemonList[pokemonIDs[i] - 1].name;
    let sprite = pokemonList[pokemonIDs[i] - 1].sprites.other?.['official-artwork'].front_default;
    result.push({ id: id, name: name, sprite: sprite });
  }
  return result;
};

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
