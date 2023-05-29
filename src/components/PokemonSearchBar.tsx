"use client";

import { usePokemonSpecies } from "@/hook/useAllPokemonNameList";
import { capitalizeFirstLetter, getRandomNumber } from "@/utils/functional";
import { useEffect, useMemo, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

interface Props {
  onSelected: (pokemonName: string, id: number) => void;
  selectedName?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export const PokemonSearchBar = ({
  selectedName,
  onSelected,
  disabled,
  isLoading,
}: Props) => {
  const idRef = useRef(getRandomNumber(0, 9999));

  const [searchParam, setSearchParam] = useState(selectedName ?? "");
  useEffect(() => {
    selectedName && setSearchParam(selectedName ?? "");
  }, [selectedName]);

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
      id={`pokemon-search-bar-${idRef.current.toString()}`}
      isLoading={isFetchingAllPokemon || isLoading}
      disabled={disabled}
      onChange={(selected) => {
        const firstEle = selected[0];
        if (typeof firstEle === "string") {
          const newName = firstEle.toLocaleLowerCase();
          onSelected(newName, nameToIdLookup[firstEle.toLocaleLowerCase()]);
          setSearchParam(newName);
        }
      }}
      options={displayNameList}
      placeholder="Choose a pokemon..."
      selected={[capitalizeFirstLetter(searchParam)]}
      onInputChange={setSearchParam}
    />
  );
};
