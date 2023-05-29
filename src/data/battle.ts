import { Move, Pokemon } from "pokenode-ts";

export interface TurnHistory {
  turnPokemonIndex: 0 | 1;
  move: Move;
  damageDeal: number;
  resultPokemon1: Pokemon;
  resultPokemon2: Pokemon;
}

export interface BattleResult {
  history: TurnHistory[];
  winner: 0 | 1 | null;
}

export type DamageClass = "physical" | "special";

export const isDamageMove = (
  move: Move,
): move is Move & { damage_class: { name: DamageClass } } =>
  (move.damage_class?.name as MoveClass) !== "status";

export type MoveClass = DamageClass | "status";
