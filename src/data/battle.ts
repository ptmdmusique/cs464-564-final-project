import { Move, Pokemon } from "pokenode-ts";

export interface TurnHistory {
  turnPokemonIndex: 0 | 1;
  move: Move;
  resultPokemon1: Pokemon;
  resultPokemon2: Pokemon;
}

export interface BattleResult {
  history: TurnHistory[];
  winner: 0 | 1 | null;
}
