"use client";

import { CompactPokemonInfoCard } from "@/components/CompactPokemonInfoCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useQueryParams } from "@/hook/useQueryParams";
import { getPokemonById, getRandomPokemonId } from "@/utils/pokemon";
import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function PokemonBattleView() {
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

  const [isLoading, setIsLoading] = useState(true);
  const [battlePokemonList, setBattlePokemonList] = useState<{
    pokemon1: Pokemon;
    pokemon2: Pokemon;
  } | null>(null);

  useEffect(() => {
    const queryChanged =
      pokemonIdList[0].toLocaleString() !== queryParams?.pokemon1 ||
      pokemonIdList[1].toLocaleString() !== queryParams?.pokemon2;
    if (!queryChanged && !!battlePokemonList) {
      return;
    }

    // Re-update the query params when the pokemonIdList changes
    if (queryChanged) {
      setQueryParams({
        pokemon1: pokemonIdList[0].toString(),
        pokemon2: pokemonIdList[1].toString(),
      });
    }

    // Fetch the Pokemon
    setIsLoading(true);
    Promise.all(pokemonIdList.map(getPokemonById))
      .then(([pokemon1, pokemon2]) => {
        setBattlePokemonList({ pokemon1, pokemon2 });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pokemonIdList, setQueryParams, battlePokemonList, queryParams]);

  if (isLoading || !battlePokemonList) {
    return <LoadingSpinner />;
  }

  return (
    <Row>
      <Col xs={12} lg={5}>
        <Row className="gx-0">
          <CompactPokemonInfoCard
            usePokemonNameAsCardTitle
            defaultActiveSection="stats"
            pokemon={battlePokemonList.pokemon1}
          />
        </Row>
      </Col>

      <Col
        className="d-flex align-items-center justify-content-center h3 my-4 my-lg-0"
        lg={2}
      >
        ⚔️ VS ⚔️
      </Col>

      <Col>
        <Row className="gx-0">
          <CompactPokemonInfoCard
            usePokemonNameAsCardTitle
            defaultActiveSection="stats"
            pokemon={battlePokemonList.pokemon2}
          />
        </Row>
      </Col>
    </Row>
  );
}
