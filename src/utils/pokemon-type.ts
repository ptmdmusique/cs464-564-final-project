export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

// https://github.com/filipekiss/pokemon-type-chart/blob/master/types.json
export const pokemonTypeInfoList: {
  name: PokemonType;
  immunes: PokemonType[];
  strengths: PokemonType[];
  weaknesses: PokemonType[];
}[] = [
  {
    name: "normal",
    immunes: ["ghost"],
    strengths: [],
    weaknesses: ["rock", "steel"],
  },
  {
    name: "fire",
    immunes: [],
    strengths: ["grass", "ice", "bug", "steel"],
    weaknesses: ["fire", "water", "rock", "dragon"],
  },
  {
    name: "water",
    immunes: [],
    strengths: ["fire", "ground", "rock"],
    weaknesses: ["water", "grass", "dragon"],
  },
  {
    name: "electric",
    immunes: ["ground"],
    strengths: ["water", "flying"],
    weaknesses: ["electric", "grass", "dragon"],
  },
  {
    name: "grass",
    immunes: [],
    strengths: ["water", "ground", "rock"],
    weaknesses: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"],
  },
  {
    name: "ice",
    immunes: [],
    strengths: ["grass", "ground", "flying", "dragon"],
    weaknesses: ["fire", "water", "ice", "steel"],
  },
  {
    name: "fighting",
    immunes: ["ghost"],
    strengths: ["normal", "ice", "rock", "dark", "steel"],
    weaknesses: ["poison", "flying", "psychic", "bug", "fairy"],
  },
  {
    name: "poison",
    immunes: ["steel"],
    strengths: ["grass", "fairy"],
    weaknesses: ["poison", "ground", "rock", "ghost"],
  },
  {
    name: "ground",
    immunes: ["flying"],
    strengths: ["fire", "electric", "poison", "rock", "steel"],
    weaknesses: ["grass", "bug"],
  },
  {
    name: "flying",
    immunes: [],
    strengths: ["grass", "fighting", "bug"],
    weaknesses: ["electric", "rock", "steel"],
  },
  {
    name: "psychic",
    immunes: ["dark"],
    strengths: ["fighting", "poison"],
    weaknesses: ["psychic", "steel"],
  },
  {
    name: "bug",
    immunes: [],
    strengths: ["grass", "psychic", "dark"],
    weaknesses: [
      "fire",
      "fighting",
      "poison",
      "flying",
      "ghost",
      "steel",
      "fairy",
    ],
  },
  {
    name: "rock",
    immunes: [],
    strengths: ["fire", "ice", "flying", "bug"],
    weaknesses: ["fighting", "ground", "steel"],
  },
  {
    name: "ghost",
    immunes: ["normal"],
    strengths: ["psychic", "ghost"],
    weaknesses: ["dark"],
  },
  {
    name: "dragon",
    immunes: ["fairy"],
    strengths: ["dragon"],
    weaknesses: ["steel"],
  },
  {
    name: "dark",
    immunes: [],
    strengths: ["psychic", "ghost"],
    weaknesses: ["fighting", "dark", "fairy"],
  },
  {
    name: "steel",
    immunes: [],
    strengths: ["ice", "rock", "fairy"],
    weaknesses: ["fire", "water", "electric", "steel"],
  },
  {
    name: "fairy",
    immunes: [],
    strengths: ["fighting", "dragon", "dark"],
    weaknesses: ["fire", "poison", "steel"],
  },
];

// https://www.epidemicjohto.com/t882-type-colors-hex-colors with some tweak to make it more readable
export const pokemonTypeColorMap = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#7199F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#FF7C78",
  poison: "#CC7ECB",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#9276B8",
  dragon: "#8A5DFC",
  dark: "#A39286",
  steel: "#B7B7CE",
  fairy: "#D685AD",
} as const satisfies Record<PokemonType, string>;
