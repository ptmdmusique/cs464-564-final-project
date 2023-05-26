import { Pokemon } from 'pokenode-ts';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getHeaviest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList.sort((a, b) => (a.weight > b.weight ? -1 : 1)).slice(0, 10);
  return getWeightData(sorted);
};

export const getLightest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList.sort((a, b) => (a.weight < b.weight ? -1 : 1)).slice(0, 10);
  return getWeightData(sorted);
};

const getWeightData = (sorted: Pokemon[]) => {
  let sortedData: number[] = [];
  let sortedLabels: string[] = [];
  let id: number[] = [];
  sorted.forEach((pokemon) => sortedData.push(pokemon.weight));
  sorted.forEach((pokemon) => sortedLabels.push(pokemon.name));
  sorted.forEach((pokemon) => id.push(pokemon.id));
  sortedData = sortedData.map((x) => (x / 10) * 2.20462);

  return {
    id: id,
    data: sortedData,
    labels: sortedLabels,
  };
};

export const getTallest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList.sort((a, b) => (a.height > b.height ? -1 : 1)).slice(0, 10);
  return getHeightData(sorted);
};

export const getShortest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList.sort((a, b) => (a.height < b.height ? -1 : 1)).slice(0, 10);
  return getHeightData(sorted);
};

const getHeightData = (sorted: Pokemon[]) => {
  let sortedData: number[] = [];
  let sortedLabels: string[] = [];
  let id: number[] = [];
  sorted.forEach((pokemon) => sortedData.push(pokemon.height));
  sorted.forEach((pokemon) => sortedLabels.push(pokemon.name));
  sorted.forEach((pokemon) => id.push(pokemon.id));
  sortedData = sortedData.map((x) => (x / 10) * 3.28084);

  return {
    id: id,
    data: sortedData,
    labels: sortedLabels,
  };
};
