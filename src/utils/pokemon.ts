import { MoveClient, PokemonClient, Pokemon } from 'pokenode-ts';
import { DoughnutData } from '@/app/statistics/page';
import { fromCache } from './cache.';
import { capitalizeFirstLetter, getRandomNumber } from './functional';

const MIN_POKEMON_ID = 1;
export const MAX_POKEMON_ID = 1010; // The max is 1010 but we should be nice to the API...
export const MAX_SHAPES = 14;
export const MAX_COLORS = 10;
export const MAX_HABITATS = 9;

const pokemonClient = new PokemonClient();
const moveClient = new MoveClient();

export const getPokemonById = (id: number) =>
  fromCache('pokemon', () => pokemonClient.getPokemonById(id), id);

export const getRandomPokemonId = () => getRandomNumber(MIN_POKEMON_ID, MAX_POKEMON_ID);

export const getRandomPokemon = () => getPokemonById(getRandomPokemonId());

export const getMoveByName = (name: string) =>
  fromCache('move', () => moveClient.getMoveByName(name), name);

export const getAllPokemonList = () => pokemonClient.listPokemonSpecies(0, MAX_POKEMON_ID);

export const getPokemonByName = (name: string) =>
  fromCache('pokemon', () => pokemonClient.getPokemonByName(name), name);

export const getPokemonShapes = (id: number) => pokemonClient.getPokemonShapeById(id);

export const getPokemonColors = (id: number) => pokemonClient.getPokemonColorById(id);

export const getPokemonHabitats = (id: number) => pokemonClient.getPokemonHabitatById(id);

//Sort pokemon by id
export const sortById = (pokemonList: Pokemon[]) => {
  return pokemonList.sort((a, b) => (a.id < b.id ? -1 : 1));
};

//Extract Pokemon ID, name, and sprite image based on pokemon ID
export const getPokemonData = (pokemonList: Pokemon[], pokemonIDs: number[]) => {
  const sorted = sortById(pokemonList);
  const result: DoughnutData[] = [];
  for (let i = 0; i < pokemonIDs.length; i++) {
    const id = pokemonIDs[i];
    const name = capitalizeFirstLetter(sorted[pokemonIDs[i] - 1].name);
    const sprite = sorted[pokemonIDs[i] - 1].sprites.other?.['official-artwork'].front_default;
    result.push({ id: id, name: name, sprite: sprite });
  }
  return result;
};
