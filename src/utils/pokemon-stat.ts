import { Pokemon, PokemonShape } from 'pokenode-ts';
import { capitalizeFirstLetter } from './functional';

//Next 2 methods are used to filter/sort data for the weight charts
export const getHeaviest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList.sort((a, b) => (a.weight > b.weight ? -1 : 1)).slice(0, 10);
  return getAttributeData(sorted, 'weight');
};

export const getLightest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList.sort((a, b) => (a.weight < b.weight ? -1 : 1)).slice(0, 10);
  return getAttributeData(sorted, 'weight');
};

//Next 2 methods are used to filter/sort data for the height charts
export const getTallest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList.sort((a, b) => (a.height > b.height ? -1 : 1)).slice(0, 10);
  return getAttributeData(sorted, 'height');
};

export const getShortest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList.sort((a, b) => (a.height < b.height ? -1 : 1)).slice(0, 10);
  return getAttributeData(sorted, 'height');
};

//Next 2 methods are used to filter/sort data for the speed charts
export const getFastest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList
    .sort((a, b) => (a.stats[5].base_stat > b.stats[5].base_stat ? -1 : 1))
    .slice(0, 10);
  return getAttributeData(sorted, 'speed');
};

export const getSlowest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList
    .sort((a, b) => (a.stats[5].base_stat < b.stats[5].base_stat ? -1 : 1))
    .slice(0, 10);
  return getAttributeData(sorted, 'speed');
};

//Extract the ids, stats, and labels for the sorted data
const getAttributeData = (sorted: Pokemon[], attribute: 'height' | 'weight' | 'speed') => {
  const sortedData: number[] = [];
  const sortedLabels: string[] = [];
  const id: number[] = [];

  sorted.forEach((pokemon) => {
    let stat = 0;
    switch (attribute) {
      case 'weight':
        stat = pokemon.weight;
        break;
      case 'height':
        stat = pokemon.height;
        break;
      case 'speed':
        stat = pokemon.stats[5].base_stat;
        break;
      default:
        stat = pokemon[attribute];
        console.log('ERROR');
        break;
    }

    sortedData.push(stat);
    sortedLabels.push(capitalizeFirstLetter(pokemon.name));
    id.push(pokemon.id);
  });

  return {
    id: id,
    data: sortedData,
    labels: sortedLabels,
  };
};

//Filter/Sort Data for body shape chart
export const getShape = (shapeList: PokemonShape[]) => {
  let labels: string[] = [];
  const data: number[] = [];
  const id: number[] = [];

  shapeList.forEach((shapeType) => {
    labels.push(capitalizeFirstLetter(shapeType.name));
    data.push(shapeType.pokemon_species.length);
    id.push(shapeType.id);
  });
  return { id: id, data: data, labels: labels };
};
