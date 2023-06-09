import {
  BattleResult,
  DamageEffectiveness,
  TurnHistory,
  isDamageMove,
} from "@/data/battle";
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

 * @param frenzyMode If true, the pokemons will use random moves instead of the best ones
 */
export const battle = async (
  pokemon1: Pokemon,
  pokemon2: Pokemon,
  frenzyMode = false,
): Promise<BattleResult> => {
  const USE_RANDOM_MOVE_CHANCE = frenzyMode ? 1 : 0.1;

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
        battlePokemonList[getNextPokemonIndex(index)],
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
    const nextIndex = getNextPokemonIndex(turnPokemonIndex);

    const mainPokemon = structuredClone(battlePokemonList[turnPokemonIndex]);
    const otherPokemon = structuredClone(battlePokemonList[nextIndex]);

    const rankedMoveList = pokemonWithSortedRankedMoveList[turnPokemonIndex];

    // Randomly choose between all moves with USE_RANDOM_MOVE_CHANCE chance
    //  or get move with highest damage deal
    //  or randomly choose between the highest ranked moves if there are more than one
    const { damageDeal, move, damageEffectiveness } = getRandomArrayElement(
      Math.random() < USE_RANDOM_MOVE_CHANCE
        ? rankedMoveList
        : pokemonWithHighestRankedMoveList[turnPokemonIndex],
    );

    otherPokemon.stats.find(({ stat }) => stat.name === "hp")!.base_stat -=
      damageDeal;

    history.push({
      turnPokemonIndex,
      move,
      damageDeal,
      damageEffectiveness,
      resultPokemonList: [
        turnPokemonIndex === 0 ? mainPokemon : otherPokemon,
        turnPokemonIndex === 1 ? mainPokemon : otherPokemon,
      ],
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
): {
  move: Move;
  damageDeal: number;
  damageEffectiveness: DamageEffectiveness;
}[] => {
  const rankedMoveList = pokemon.moves
    .filter(({ move }) => !!moveInfoLookup[move.name])
    .map(({ move: moveInfo }) => {
      const move = moveInfoLookup[moveInfo.name];
      return { move, ...getMoveDamage(move, pokemon, otherPokemon) };
    })
    .sort((a, b) => b.damageDeal - a.damageDeal);

  return rankedMoveList;
};

const getMoveDamage = (
  move: Move,
  pokemon: Pokemon,
  otherPokemon: Pokemon,
): { damageEffectiveness: DamageEffectiveness; damageDeal: number } => {
  if (!isDamageMove(move)) {
    // Currently we don't care for this
    return { damageEffectiveness: "normal", damageDeal: 0 };
  }

  const moveElement = move.type.name as PokemonType;
  const otherPokemonElementList = otherPokemon.types.map((t) => t.type.name);

  let damageEffectiveness: DamageEffectiveness = "normal";
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
      damageEffectiveness = "immune";
      break;
    } else if (weaknesses.includes(moveElement)) {
      damageEffectiveness = "not-very";
      break;
    } else if (strengths.includes(moveElement)) {
      damageEffectiveness = "very";
      break;
    }
  }

  const isSpecialMove = move.damage_class.name === "special";
  const pokemonBaseAttack = getAtk(pokemon, isSpecialMove);
  const otherBaseDefense = getDef(otherPokemon, isSpecialMove);

  const movePower = move.power ?? 0;
  const damageDeal =
    Math.max(movePower + pokemonBaseAttack - otherBaseDefense, 1) *
    getDamageMultiplierFromEffectiveness(damageEffectiveness) *
    DAMAGE_MULTIPLIER;

  return { damageDeal, damageEffectiveness };
};

const getHp = (pokemon: Pokemon) =>
  pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat ?? 0;

const getDef = (pokemon: Pokemon, special: boolean) =>
  pokemon.stats.find((s) => (special ? "special-defense" : "defense"))
    ?.base_stat ?? 0;

const getAtk = (pokemon: Pokemon, special: boolean) =>
  pokemon.stats.find((s) => (special ? "special-attack" : "attack"))
    ?.base_stat ?? 0;

export const getNextPokemonIndex = (currentIndex: number) =>
  ((currentIndex + 1) % 2) as 0 | 1;

const getDamageMultiplierFromEffectiveness = (
  damageEffectiveness: DamageEffectiveness,
) => {
  switch (damageEffectiveness) {
    case "immune":
      return 0;
    case "not-very":
      return 0.5;
    case "very":
      return 2;
    case "normal":
      return 1;
  }
};

const MAX_NUMBER_OF_TURN = 100;
const MAX_MOVE_SEARCH_PER_POKEMON = 50; // Used to prevent being IP-blocked
const DAMAGE_MULTIPLIER = 0.2; // Used to make battle last longer
