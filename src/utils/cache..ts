// An extremely dumb cache implementation
// It's just a map stored in session storage

import { Move, Pokemon } from "pokenode-ts";

type CacheType = "move" | "pokemon";

const customCache: Record<
  CacheType,
  Record<number, Promise<Move | Pokemon>>
> = {
  move: {},
  pokemon: {},
};

export const fromCache = <
  T extends CacheType,
  R extends Promise<GetReturnType<T>> = Promise<GetReturnType<T>>,
>(
  type: T,
  getter: () => R,
  id: number,
): R => {
  const cached = customCache[type][id];
  if (cached) {
    return cached as R;
  }

  const typeCache = customCache[type];
  typeCache[id] = getter();

  return typeCache[id] as R;
};

type GetReturnType<T extends CacheType> = T extends "move" ? Move : Pokemon;
