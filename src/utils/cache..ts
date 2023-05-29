// An extremely dumb cache implementation
// It's just a map stored in session storage

import { Move, Pokemon } from "pokenode-ts";

type CacheType = "move" | "pokemon" | "species";
type CacheId = string | number;
type CacheObject = Record<CacheId, Promise<Move | Pokemon>>;

const customCache: Record<CacheType, CacheObject> = {
  move: {},
  pokemon: {},
  species: {},
};

export const fromCache = <
  T extends CacheType,
  R extends Promise<GetReturnType<T>> = Promise<GetReturnType<T>>,
>(
  type: T,
  getter: () => R,
  key: CacheId,
): R => {
  const cached = customCache[type][key];
  if (cached) {
    return cached as R;
  }

  const typeCache: CacheObject = customCache[type];
  typeCache[key] = getter();

  return typeCache[key] as R;
};

type GetReturnType<T extends CacheType> = T extends "move" ? Move : Pokemon;
