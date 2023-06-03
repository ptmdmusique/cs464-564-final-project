import { MoveClient, PokemonClient } from 'pokenode-ts';
import { fromCache } from './cache.';
import { getRandomNumber } from './functional';

const MIN_POKEMON_ID = 1;
export const MAX_POKEMON_ID = 100; // The max is 1010 but we should be nice to the API...
export const MAX_SHAPES = 14;

const api = new PokemonClient();
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

export const getPokemonShapes = (id: number) => api.getPokemonShapeById(id);
