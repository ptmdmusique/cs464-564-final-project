import { MoveClient, PokemonClient } from "pokenode-ts";
import { fromCache } from "./cache.";
import { getRandomNumber } from "./functional";

const MIN_POKEMON_ID = 1;
const MAX_POKEMON_ID = 1000;

const pokemonClient = new PokemonClient();
const moveClient = new MoveClient();

export const getPokemonById = (id: number) =>
  fromCache("pokemon", () => pokemonClient.getPokemonById(id), id);

export const getRandomPokemonId = () =>
  getRandomNumber(MIN_POKEMON_ID, MAX_POKEMON_ID);

export const getRandomPokemon = () => getPokemonById(getRandomPokemonId());

export const getMoveByName = (name: string) =>
  fromCache("move", () => moveClient.getMoveByName(name), name);
