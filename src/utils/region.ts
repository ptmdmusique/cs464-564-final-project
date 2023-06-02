import { Pokemon } from 'pokenode-ts';
import { regionList } from '@/data/region';
type Region = (typeof regionList)[number];
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
