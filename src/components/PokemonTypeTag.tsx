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
      style={{
        border: `2px solid ${pokemonTypeColorMap[typeName]}`,
      }}
      className={`px-2 rounded ${className}`}
    >
      {capitalizeFirstLetter(displayName ?? typeName)}
    </div>
  );
};
