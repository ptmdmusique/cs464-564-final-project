import { Pokemon, PokemonShape } from 'pokenode-ts';
import { DoughnutData } from '@/app/statistics/page';
import { json } from 'stream/consumers';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

//Sort pokemon by id
export const sortById = (pokemonList: Pokemon[]) => {
  return pokemonList.sort((a, b) => (a.id < b.id ? -1 : 1));
};

//Filter PokemonList array by regions
export const getKanto = (pokemonList: Pokemon[]) => {
  return pokemonList.slice(0, 150);
};
export const getJohto = (pokemonList: Pokemon[]) => {
  return pokemonList.slice(151, 250);
};
export const getHoenn = (pokemonList: Pokemon[]) => {
  return pokemonList.slice(251, 385);
};
export const getSinnoh = (pokemonList: Pokemon[]) => {
  return pokemonList.slice(386, 492);
};
export const getUnova = (pokemonList: Pokemon[]) => {
  return pokemonList.slice(493, 648);
};
export const getKalos = (pokemonList: Pokemon[]) => {
  return pokemonList.slice(649, 720);
};
export const getAlola = (pokemonList: Pokemon[]) => {
  return pokemonList.slice(721, 808);
};
export const getGalar = (pokemonList: Pokemon[]) => {
  return pokemonList.slice(809, 904);
};
export const getPaldea = (pokemonList: Pokemon[]) => {
  return pokemonList.slice(905, 1009);
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

//Next 3 methods are used to filter/sort data for the weight charts
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

//Next 3 methods are used to filter/sort data for the height charts
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

//Next 3 methods are used to filter/sort data for the speed charts
export const getFastest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList
    .sort((a, b) => (a.stats[5].base_stat > b.stats[5].base_stat ? -1 : 1))
    .slice(0, 10);
  return getSpeedData(sorted);
};

export const getSlowest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList
    .sort((a, b) => (a.stats[5].base_stat < b.stats[5].base_stat ? -1 : 1))
    .slice(0, 10);
  return getSpeedData(sorted);
};

const getSpeedData = (sorted: Pokemon[]) => {
  let sortedData: number[] = [];
  let sortedLabels: string[] = [];
  let id: number[] = [];
  sorted.forEach((pokemon) => sortedData.push(pokemon.stats[5].base_stat));
  sorted.forEach((pokemon) => sortedLabels.push(pokemon.name));
  sorted.forEach((pokemon) => id.push(pokemon.id));

  return {
    id: id,
    data: sortedData,
    labels: sortedLabels,
  };
};

//Filter/Sort Data for body shape chart
export const getShape = (shapeList: PokemonShape[]) => {
  let labels: string[] = [];
  let data: number[] = [];
  let id: number[] = [];
  shapeList.forEach((shapeType) => labels.push(shapeType.name));
  shapeList.forEach((shapeType) => data.push(shapeType.pokemon_species.length));
  shapeList.forEach((shapeType) => id.push(shapeType.id));
  return { id: id, data: data, labels: labels };
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
