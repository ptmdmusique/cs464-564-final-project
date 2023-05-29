import { BattleResult, TurnHistory } from "@/data/battle";
import { Move, Pokemon } from "pokenode-ts";
import { getRandomArrayElement } from "./functional";
import { getMoveByName } from "./pokemon";
import { PokemonType, pokemonTypeInfoList } from "./pokemon-type";

/**
 *
 * Simulate the battle between two pokemons and return the history of the battle. Inspired by https://pvpoke.com/
 *
 * The rules are
 * * Randomly choose a pokemon to move first
 * * Damage taken = Min((damage dealt - def) * effectiveness_multiplier, 1)
 * * Where `effectiveness_multiplier` is either
 * * * Super effective (counter elements): 2.0
 * * * Normal: 1
 * * * Not effective: 0.5
 * * * Immunes: 0
 * * * The counter chart is taken from pokemon-type-chart/types.json at master
 * * Moves are ranked naively by damage dealt
 * * Each turn, the Pokemon will use the move with the highest score, but will also randomly choose a move with some random chance
 * * The battle ends when one of the Pokemon has no HP left

 * @param frenziedMode If true, the pokemons will use random moves instead of the best ones
 */
export const battle = async (
  pokemon1: Pokemon,
  pokemon2: Pokemon,
  frenziedMode = false,
): Promise<BattleResult> => {
  const USE_RANDOM_MOVE_CHANCE = frenziedMode ? 1 : 0.2;

  const history: TurnHistory[] = [];

  // Deep clone to avoid side-effect
  const battlePokemonList = [
    structuredClone(pokemon1),
    structuredClone(pokemon2),
  ];

  // * First fetch and rank all the moves
  // Fetch list of all pokemon moves
  const moveSearchResults = await Promise.allSettled(
    battlePokemonList
      .map(({ moves }) =>
        moves
          .slice(0, MAX_MOVE_SEARCH_PER_POKEMON)
          .map(({ move }) => getMoveByName(move.name)),
      )
      .flat(),
  );

  // Ignore all the failed promises
  const moveInfoList = moveSearchResults
    .filter(
      (promiseResult): promiseResult is PromiseFulfilledResult<Move> =>
        promiseResult.status === "fulfilled" && promiseResult.value !== null,
    )
    .map(({ value }) => value);

  // Turn into a lookup for faster access
  const moveInfoLookup = Object.fromEntries(
    moveInfoList.map((moveInfo) => [moveInfo.name, moveInfo]),
  );

  const pokemonWithSortedRankedMoveList = battlePokemonList.map(
    (pokemon, index) =>
      getPokemonSortedRankedMoves(
        pokemon,
        moveInfoLookup,
        battlePokemonList[getNextIndex(index)],
      ),
  );

  // Also create a list of highest ranked moves for each pokemon
  const pokemonWithHighestRankedMoveList = pokemonWithSortedRankedMoveList.map(
    (sortedRankedMoveList) => {
      const highestDamageDeal = sortedRankedMoveList[0].damageDeal;
      return sortedRankedMoveList.filter(
        ({ damageDeal }) => damageDeal === highestDamageDeal,
      );
    },
  );

  let winner: 0 | 1 | null = null;

  // * Then simulate the battle
  let turnPokemonIndex: 0 | 1 = Math.round(Math.random()) as 0 | 1;
  for (let turn = 0; turn < MAX_NUMBER_OF_TURN; turn++) {
    const nextIndex = getNextIndex(turnPokemonIndex);

    const mainPokemon = structuredClone(battlePokemonList[turnPokemonIndex]);
    const otherPokemon = structuredClone(battlePokemonList[nextIndex]);

    const rankedMoveList = pokemonWithSortedRankedMoveList[turnPokemonIndex];

    // Randomly choose between all moves with USE_RANDOM_MOVE_CHANCE chance
    //  or get move with highest damage deal
    //  or randomly choose between the highest ranked moves if there are more than one
    const { damageDeal, move } = getRandomArrayElement(
      Math.random() < USE_RANDOM_MOVE_CHANCE
        ? rankedMoveList
        : pokemonWithHighestRankedMoveList[turnPokemonIndex],
    );

    otherPokemon.stats.find(({ stat }) => stat.name === "hp")!.base_stat -=
      damageDeal;

    history.push({
      turnPokemonIndex,
      move,
      resultPokemon1: turnPokemonIndex === 0 ? mainPokemon : otherPokemon,
      resultPokemon2: turnPokemonIndex === 1 ? mainPokemon : otherPokemon,
    });

    if (getHp(otherPokemon) <= 0) {
      winner = turnPokemonIndex;
      break;
    }

    battlePokemonList[turnPokemonIndex] = mainPokemon;
    battlePokemonList[nextIndex] = otherPokemon;
    turnPokemonIndex = nextIndex;
  }

  return { winner, history };
};

const getPokemonSortedRankedMoves = (
  pokemon: Pokemon,
  moveInfoLookup: Record<string, Move>,
  otherPokemon: Pokemon,
): { move: Move; damageDeal: number }[] => {
  const rankedMoveList = pokemon.moves
    .filter(({ move }) => !!moveInfoLookup[move.name])
    .map<{ move: Move; damageDeal: number }>(({ move: moveInfo }) => {
      const move = moveInfoLookup[moveInfo.name];
      return { move, damageDeal: getMoveDamage(move, otherPokemon) };
    })
    .sort((a, b) => b.damageDeal - a.damageDeal);

  return rankedMoveList;
};

const getMoveDamage = (move: Move, otherPokemon: Pokemon) => {
  const moveElement = move.type.name as PokemonType;
  const otherPokemonElementList = otherPokemon.types.map((t) => t.type.name);

  let moveEffectiveNessMultiplier = 1;
  for (const otherPokemonElement of otherPokemonElementList) {
    const otherTypeInfo = pokemonTypeInfoList.find(
      (typeInfo) => typeInfo.name === otherPokemonElement,
    );

    if (!otherTypeInfo) {
      console.error(`Cannot find type info for ${moveElement}`);
      continue;
    }

    const { immunes, strengths, weaknesses } = otherTypeInfo;

    // In priority order
    if (immunes.includes(moveElement)) {
      moveEffectiveNessMultiplier = 0;
      break;
    } else if (weaknesses.includes(moveElement)) {
      moveEffectiveNessMultiplier *= 2;
      break;
    } else if (strengths.includes(moveElement)) {
      moveEffectiveNessMultiplier *= 0.5;
      break;
    }
  }

  const movePower = move.power ?? 0;
  const damageDeal = Math.min(
    (movePower - getDef(otherPokemon)) * moveEffectiveNessMultiplier,
    1,
  );

  return damageDeal;
};

const getHp = (pokemon: Pokemon) =>
  pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0;

const getDef = (pokemon: Pokemon) =>
  pokemon.stats.find((s) => s.stat.name === "defense")?.base_stat ?? 0;

const getNextIndex = (currentIndex: number) =>
  ((currentIndex + 1) % 2) as 0 | 1;

const MAX_NUMBER_OF_TURN = 100;
const MAX_MOVE_SEARCH_PER_POKEMON = 10; // Used to prevent being IP-blocked
