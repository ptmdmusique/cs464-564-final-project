import { PokemonClient } from "pokenode-ts";
import { getRandomNumber } from "./functional";

const MIN_POKEMON_ID = 1;
const MAX_POKEMON_ID = 1000;

const api = new PokemonClient();
export const getRandomPokemon = () =>
  api.getPokemonById(getRandomNumber(MIN_POKEMON_ID, MAX_POKEMON_ID));

export const getPokemon = (id: number) => api.getPokemonById(id);
