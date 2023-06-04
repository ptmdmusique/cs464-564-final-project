import { Pokemon } from 'pokenode-ts';
import { Region, RegionToggle } from '@/data/region';

const regionToPokemonRange: Record<Region, [number, number]> = {
  kanto: [0, 150],
  johto: [151, 250],
  hoenn: [251, 385],
  sinnoh: [386, 492],
  unova: [493, 648],
  kalos: [649, 720],
  alola: [721, 808],
  galar: [809, 904],
  paldea: [905, 1009],
};

export const getPokemonFromRegion = (pokemonList: Pokemon[], region: Region) => {
  const range = regionToPokemonRange[region];
  return pokemonList.filter(({ id }) => id <= range[1] && id > range[0]);
};

//Filter data by region
export const filterByRegion = (pokemonList: Pokemon[], filterRegion: RegionToggle) => {
  let filteredPokemonList: Pokemon[] = [];
  for (const region in filterRegion) {
    if (filterRegion[region as keyof RegionToggle]) {
      filteredPokemonList = [
        ...filteredPokemonList,
        ...getPokemonFromRegion(pokemonList, region as keyof RegionToggle),
      ];
    }
  }
  return filteredPokemonList.length !== 0 ? filteredPokemonList : pokemonList;
};
