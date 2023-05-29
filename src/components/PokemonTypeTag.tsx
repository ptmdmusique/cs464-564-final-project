"use client";

import { capitalizeFirstLetter } from "@/utils/functional";
import { PokemonType, pokemonTypeColorMap } from "@/utils/pokemon-type";

interface Props {
  typeName: PokemonType;
  className?: string;
  displayName?: string;
}

export const PokemonTypeTag = ({ typeName, className, displayName }: Props) => {
  return (
    <div
      style={{ backgroundColor: pokemonTypeColorMap[typeName] }}
      className={`px-2 py-1 rounded h6 mb-0 ${className}`}
    >
      {capitalizeFirstLetter(displayName ?? typeName)}
    </div>
  );
};
