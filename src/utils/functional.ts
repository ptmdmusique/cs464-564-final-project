import { Pokemon, PokemonShape } from 'pokenode-ts';

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Weight Charts
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

// Height Charts
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

// Speed Charts
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
  // sortedData = sortedData.map((x) => (x / 10) * 3.28084);

  return {
    id: id,
    data: sortedData,
    labels: sortedLabels,
  };
};

//Shape Chart
export const getShape = (shapeList: PokemonShape[]) => {
  let labels: string[] = [];
  let data: number[] = [];
  let id: number[] = [];
  shapeList.forEach((shapeType) => labels.push(shapeType.name));
  shapeList.forEach((shapeType) => data.push(shapeType.pokemon_species.length));
  shapeList.forEach((shapeType) => id.push(shapeType.id));
  return { id: id, data: data, labels: labels };
};

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
