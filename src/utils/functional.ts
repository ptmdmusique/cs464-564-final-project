import { Pokemon } from 'pokenode-ts';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const capitalizeFirstLetter = (str: string) => 
  str.charAt(0).toUpperCase() + str.slice(1);

export const sortByWeight = (pokemonList: Pokemon[]) => {
  return pokemonList.sort((a, b) => (a.weight > b.weight ? -1 : 1)).slice(0, 10);
};

export const formatWeight = (data: number[]) => {
  return data.map((x) => x / 10);
};
