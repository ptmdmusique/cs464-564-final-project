export const chartType: Record<
  string,
  { tag: string; title: string; label: string; units: string; type: string }
> = {
  Heaviest: {
    tag: 'Heaviest',
    title: 'Top 10 Heaviest',
    label: 'Weight',
    units: 'lb',
    type: 'bar',
  },
  Lightest: {
    tag: 'Lightest',
    title: 'Top 10 Lightest',
    label: 'Weight',
    units: 'lb',
    type: 'bar',
  },
  Tallest: { tag: 'Tallest', title: 'Top 10 Tallest', label: 'Height', units: 'ft', type: 'bar' },
  Shortest: {
    tag: 'Shortest',
    title: 'Top 10 Shortest',
    label: 'Height',
    units: 'ft',
    type: 'bar',
  },
  Fastest: { tag: 'Fastest', title: 'Top 10 Fastest', label: 'Speed', units: 'pts', type: 'bar' },
  Slowest: { tag: 'Slowest', title: 'Top 10 Slowest', label: 'Speed', units: 'pts', type: 'bar' },
  Shape: {
    tag: 'Shape',
    title: 'Pokemon by Body Shape',
    label: 'Body Shape',
    units: 'none',
    type: 'Doughnut',
  },
};
