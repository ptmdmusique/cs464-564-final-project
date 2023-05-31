"use client";

import { usePokemonSpecies } from "@/hook/useAllPokemonNameList";
import { capitalizeFirstLetter, getRandomNumber } from "@/utils/functional";
import { useEffect, useMemo, useRef, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Hint, Typeahead } from "react-bootstrap-typeahead";

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
      renderInput={({
        inputRef,
        referenceElementRef,
        value,
        ...inputProps
      }) => {
        return (
          <Form.Label className="w-100 mb-0">
            <p className="h6 mb-1">Pokemon</p>
            <Form.Control
              {...inputProps}
              value={value as string[]}
              ref={(node: HTMLInputElement) => {
                inputRef(node);
                referenceElementRef(node);
              }}
            />
          </Form.Label>
        );
      }}
    />
  );
};
