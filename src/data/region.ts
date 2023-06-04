export const regionList = [
  'kanto',
  'johto',
  'hoenn',
  'sinnoh',
  'unova',
  'kalos',
  'alola',
  'galar',
  'paldea',
] as const;

export type Region = (typeof regionList)[number];
export type RegionToggle = Record<Region, boolean>;
