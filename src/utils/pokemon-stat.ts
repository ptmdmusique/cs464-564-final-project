import { Pokemon } from 'pokenode-ts';
import { capitalizeFirstLetter } from './functional';
import { DoughnutDataType } from '@/data/chart-type';

//Next 2 methods are used to filter/sort data for the weight charts
export const getHeaviest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList.sort((a, b) => (a.weight > b.weight ? -1 : 1)).slice(0, 10);
  return getBarAttributeData(sorted, 'weight');
};

export const getLightest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList.sort((a, b) => (a.weight < b.weight ? -1 : 1)).slice(0, 10);
  return getBarAttributeData(sorted, 'weight');
};

//Next 2 methods are used to filter/sort data for the height charts
export const getTallest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList.sort((a, b) => (a.height > b.height ? -1 : 1)).slice(0, 10);
  return getBarAttributeData(sorted, 'height');
};

export const getShortest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList.sort((a, b) => (a.height < b.height ? -1 : 1)).slice(0, 10);
  return getBarAttributeData(sorted, 'height');
};

//Next 2 methods are used to filter/sort data for the speed charts
export const getFastest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList
    .sort((a, b) => (a.stats[5].base_stat > b.stats[5].base_stat ? -1 : 1))
    .slice(0, 10);
  return getBarAttributeData(sorted, 'speed');
};

export const getSlowest = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList
    .sort((a, b) => (a.stats[5].base_stat < b.stats[5].base_stat ? -1 : 1))
    .slice(0, 10);
  return getBarAttributeData(sorted, 'speed');
};

//Next 2 methods are used to filter/sort data for the highest HP chart
export const getHighestHP = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList
    .sort((a, b) => (a.stats[0].base_stat > b.stats[0].base_stat ? -1 : 1))
    .slice(0, 10);
  return getBarAttributeData(sorted, 'hp');
};

//Next 2 methods are used to filter/sort data for the highest attack chart
export const getHighestAttack = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList
    .sort((a, b) => (a.stats[1].base_stat > b.stats[1].base_stat ? -1 : 1))
    .slice(0, 10);
  return getBarAttributeData(sorted, 'attack');
};

//Next 2 methods are used to filter/sort data for the highest defense chart
export const getHighestDefense = (pokemonList: Pokemon[]) => {
  const sorted = pokemonList
    .sort((a, b) => (a.stats[2].base_stat > b.stats[2].base_stat ? -1 : 1))
    .slice(0, 10);
  return getBarAttributeData(sorted, 'defense');
};

//Extract the ids, stats, and labels for the sorted data
const getBarAttributeData = (
  sorted: Pokemon[],
  attribute: 'height' | 'weight' | 'speed' | 'hp' | 'attack' | 'defense'
) => {
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
      case 'hp':
        stat = pokemon.stats[0].base_stat;
        break;
      case 'attack':
        stat = pokemon.stats[1].base_stat;
        break;
      case 'defense':
        stat = pokemon.stats[2].base_stat;
        break;
      default:
        console.error('ERROR: Unexpected Attribute');
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
export const getDoughnutAttributeData = (attributeList: DoughnutDataType[]) => {
  let labels: string[] = [];
  const data: number[] = [];
  const id: number[] = [];

  attributeList.forEach((attribute) => {
    labels.push(capitalizeFirstLetter(attribute.name));
    data.push(attribute.pokemon_species.length);
    id.push(attribute.id);
  });
  return { id: id, data: data, labels: labels };
};

//Get the IDs of all Pokemon with the clicked on shape
export const getPokemonIDs = (index: number, list: DoughnutDataType[]) =>
  list[index].pokemon_species.map((pokemon) => {
    return +pokemon.url.split(/\//)[6];
  });
