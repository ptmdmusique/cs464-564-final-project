"use client";

import { usePokemonSpecies } from "@/hook/useAllPokemonNameList";
import { capitalizeFirstLetter } from "@/utils/functional";
import { useMemo } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

interface Props {
  onSelected: (pokemonName: string, id: number) => void;
  defaultSelectedName?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export const PokemonSearchBar = ({
  defaultSelectedName,
  onSelected,
  disabled,
  isLoading,
}: Props) => {
  const { allSpecies, isLoading: isFetchingAllPokemon } = usePokemonSpecies();
  const displayNameList = useMemo(
    () => allSpecies.map(({ name }) => capitalizeFirstLetter(name)),
    [allSpecies],
  );

  const nameToIdLookup = useMemo(
    () =>
      allSpecies.reduce((acc, { name, id }) => {
        acc[name.toLocaleLowerCase()] = id;
        return acc;
      }, {} as Record<string, number>),
    [allSpecies],
  );

  return (
    <Typeahead
      id="basic-typeahead-single"
      labelKey="name"
      isLoading={isFetchingAllPokemon || isLoading}
      disabled={disabled}
      onChange={(selected) => {
        const firstEle = selected[0];
        if (typeof firstEle === "string") {
          onSelected(
            firstEle.toLocaleLowerCase(),
            nameToIdLookup[firstEle.toLocaleLowerCase()],
          );
        }
      }}
      options={displayNameList}
      placeholder="Choose a pokemon..."
      defaultSelected={
        defaultSelectedName
          ? [capitalizeFirstLetter(defaultSelectedName)]
          : undefined
      }
    />
  );
};
