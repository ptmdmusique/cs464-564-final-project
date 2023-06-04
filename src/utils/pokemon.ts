import { MoveClient, PokemonClient } from "pokenode-ts";
import { fromCache } from "./cache.";
import { getRandomNumber } from "./functional";

const MIN_POKEMON_ID = 1;
const MAX_POKEMON_ID = 100; // The max is 1010 but we should be nice to the API...

const pokemonClient = new PokemonClient();
const moveClient = new MoveClient();

export const getPokemonById = (id: number) =>
  fromCache("pokemon", () => pokemonClient.getPokemonById(id), id);

export const getRandomPokemonId = () =>
  getRandomNumber(MIN_POKEMON_ID, MAX_POKEMON_ID);

export const getRandomPokemon = () => getPokemonById(getRandomPokemonId());

export const getMoveByName = (name: string) =>
  fromCache("move", () => moveClient.getMoveByName(name), name);

export const getAllPokemonList = () =>
  pokemonClient.listPokemonSpecies(0, MAX_POKEMON_ID);

export const getAbility = (name: string) =>
  pokemonClient.getAbilityByName(name);
