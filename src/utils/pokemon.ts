import { MoveClient, PokemonClient } from "pokenode-ts";
import { fromCache } from "./cache.";
import { getRandomNumber } from "./functional";

const MIN_POKEMON_ID = 1;
const MAX_POKEMON_ID = 1000;

const pokemonClient = new PokemonClient();
const moveClient = new MoveClient();

export const getPokemonById = (id: number) =>
  fromCache("pokemon", () => pokemonClient.getPokemonById(id), id);

export const getRandomPokemon = () =>
  getPokemonById(getRandomNumber(MIN_POKEMON_ID, MAX_POKEMON_ID));

export const getMoveById = (id: number) =>
  fromCache("move", () => moveClient.getMoveById(id), id);
