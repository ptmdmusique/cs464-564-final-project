"use client";

import { CompactPokemonInfoCard } from "@/components/CompactPokemonInfoCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PokemonSearchBar } from "@/components/PokemonSearchBar";
import { usePokemonSpecies } from "@/hook/useAllPokemonNameList";
import { useQueryParams } from "@/hook/useQueryParams";
import { getPokemonById, getRandomPokemonId } from "@/utils/pokemon";
import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function PokemonBattleView() {
  // * Main pokemon data
  const { queryParams, setQueryParams } = useQueryParams<{
    pokemon1: string;
    pokemon2: string;
  }>();

  const [pokemonIdList, setPokemonIdList] = useState([
    queryParams.pokemon1
      ? parseInt(queryParams.pokemon1)
      : getRandomPokemonId(),
    queryParams.pokemon2
      ? parseInt(queryParams.pokemon2)
      : getRandomPokemonId(),
  ]);

  const [isLoading, setIsLoading] = useState<{
    pokemon1: boolean;
    pokemon2: boolean;
  } | null>(null);
  const [battlePokemonList, setBattlePokemonList] = useState<{
    pokemon1: Pokemon;
    pokemon2: Pokemon;
  } | null>(null);

  useEffect(() => {
    const id1Changed =
      pokemonIdList[0].toLocaleString() !== queryParams?.pokemon1;
    const id2Changed =
      pokemonIdList[1].toLocaleString() !== queryParams?.pokemon2;
    const queryChanged = id1Changed || id2Changed;

    if ((!queryChanged && !!battlePokemonList) || isLoading) {
      return;
    }

    // Re-update the query params when the pokemonIdList changes
    if (queryChanged) {
      setQueryParams({
        pokemon1: pokemonIdList[0].toString(),
        pokemon2: pokemonIdList[1].toString(),
      });
    }

    debugger;

    // Fetch the Pokemon
    setIsLoading({ pokemon1: id1Changed, pokemon2: id2Changed });
    Promise.all(pokemonIdList.map(getPokemonById))
      .then(([pokemon1, pokemon2]) => {
        setBattlePokemonList({ pokemon1, pokemon2 });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(null);
      });
  }, [
    pokemonIdList,
    setQueryParams,
    battlePokemonList,
    queryParams,
    isLoading,
  ]);

  // * Search bar related stuff
  const { isLoading: isFetchingAllPokemonNames } = usePokemonSpecies();

  if (isFetchingAllPokemonNames) {
    return <LoadingSpinner />;
  }

  return (
    <Row>
      <PokemonCard
        pokemon={battlePokemonList?.pokemon1}
        isLoading={isLoading?.pokemon1}
        onIdChange={(id) => setPokemonIdList([id, pokemonIdList[1]])}
      />

      <Col
        className="d-flex align-items-center justify-content-center h3 my-4 my-lg-0"
        lg={2}
      >
        ⚔️ VS ⚔️
      </Col>

      <PokemonCard
        pokemon={battlePokemonList?.pokemon2}
        isLoading={isLoading?.pokemon2}
        onIdChange={(id) => setPokemonIdList([pokemonIdList[0], id])}
      />
    </Row>
  );
}

interface PokemonCardRowProps {
  pokemon: Pokemon | undefined;
  isLoading: boolean | undefined;
  onIdChange: (id: number) => void;
}

const PokemonCard = ({
  pokemon,
  isLoading,
  onIdChange,
}: PokemonCardRowProps) => {
  return (
    <Col xs={12} lg={5}>
      <Row className="gx-0 mb-2">
        {/* // ! On first render, the pokemon won't be available
            // ! so we need to disable the search bar until it is
        */}
        {pokemon && (
          <PokemonSearchBar
            defaultSelectedName={pokemon.name}
            onSelected={(_, id) => {
              !isLoading && onIdChange(id);
            }}
            disabled={isLoading}
          />
        )}
      </Row>

      <Row className="gx-0">
        <CompactPokemonInfoCard
          usePokemonNameAsCardTitle
          defaultActiveSection="stats"
          pokemon={pokemon}
          isLoading={isLoading}
        />
      </Row>
    </Col>
  );
};
