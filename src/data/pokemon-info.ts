// interfaces used to organize information returned from the pokeapi

export interface PokemonInfo {
    name: string;
    id: number;
    sprite: string | null;
    height: number;
    weight: number;
    species: string;
    hp: number;
    attack: number;
    specialAttack: number;
    defense: number;
    specialDefense: number;
    abilities: Ability[];
    types: string[];
    gamesIn: string[];
}

export interface Ability {
    name: string;
    definition: string | null;
}