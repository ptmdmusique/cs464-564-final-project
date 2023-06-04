export type ChartType = (typeof chartType)[Tag];

export type Tag =
  | 'heaviest'
  | 'lightest'
  | 'shortest'
  | 'tallest'
  | 'fastest'
  | 'slowest'
  | 'shape';

export type Type = 'bar' | 'doughnut';

export type Units = 'lb' | 'ft' | 'pts' | 'none';

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
  shape: {
    tag: 'shape',
    title: 'Pokemon by Body Shape',
    label: 'Body Shape',
    units: 'none',
    type: 'doughnut',
  },
};
