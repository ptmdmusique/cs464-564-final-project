import { PokemonColor, PokemonHabitat, PokemonShape } from 'pokenode-ts';

export type ChartType = (typeof chartType)[Tag];

export type Tag =
  | 'heaviest'
  | 'lightest'
  | 'shortest'
  | 'tallest'
  | 'fastest'
  | 'slowest'
  | 'hp'
  | 'attack'
  | 'defense'
  | 'shape'
  | 'color'
  | 'habitat';

export type Type = 'bar' | 'doughnut';

export type Units = 'lb' | 'ft' | 'pts' | 'none';

export type DoughnutDataType = PokemonShape | PokemonColor | PokemonHabitat;

export const chartType: Record<
  Tag,
  { tag: Tag; title: string; label: string; units: Units; type: Type }
> = {
  heaviest: {
    tag: 'heaviest',
    title: 'Top 10 Heaviest',
    label: 'Weight',
    units: 'lb',
    type: 'bar',
  },
  lightest: {
    tag: 'lightest',
    title: 'Top 10 Lightest',
    label: 'Weight',
    units: 'lb',
    type: 'bar',
  },
  tallest: { tag: 'tallest', title: 'Top 10 Tallest', label: 'Height', units: 'ft', type: 'bar' },
  shortest: {
    tag: 'shortest',
    title: 'Top 10 Shortest',
    label: 'Height',
    units: 'ft',
    type: 'bar',
  },
  fastest: { tag: 'fastest', title: 'Top 10 Fastest', label: 'Speed', units: 'pts', type: 'bar' },
  slowest: { tag: 'slowest', title: 'Top 10 Slowest', label: 'Speed', units: 'pts', type: 'bar' },
  hp: { tag: 'hp', title: 'Top 10 Highest HP', label: 'HP', units: 'pts', type: 'bar' },
  attack: {
    tag: 'attack',
    title: 'Top 10 Highest Attack',
    label: 'Attack',
    units: 'pts',
    type: 'bar',
  },
  defense: {
    tag: 'defense',
    title: 'Top 10 Highest Defense',
    label: 'Defense',
    units: 'pts',
    type: 'bar',
  },

  shape: {
    tag: 'shape',
    title: 'Pokemon by Body Shape',
    label: 'Body Shape',
    units: 'none',
    type: 'doughnut',
  },
  color: {
    tag: 'color',
    title: 'Pokemon by Color',
    label: 'Color',
    units: 'none',
    type: 'doughnut',
  },
  habitat: {
    tag: 'habitat',
    title: 'Pokemon by Habitat',
    label: 'Habitat',
    units: 'none',
    type: 'doughnut',
  },
};
