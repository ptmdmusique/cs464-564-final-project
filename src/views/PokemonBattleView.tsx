"use client";

import { CompactPokemonInfoCard } from "@/components/CompactPokemonInfoCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PokemonSearchBar } from "@/components/PokemonSearchBar";
import { usePokemonSpecies } from "@/hook/useAllPokemonNameList";
import { useQueryParams } from "@/hook/useQueryParams";
import { getPokemonById, getRandomPokemonId } from "@/utils/pokemon";
import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

// ! Export default function because this component needs to be dynamically imported since we're NOT using SSR
export default function PokemonBattleView() {
  // * Main pokemon data
  /**
   * The flow is as follows:
   * 1. pokemonIdList changed -> trigger useEffect which possibly changes queryParams
   * 2. queryParams changed -> trigger useEffect which possibly fetches the Pokemon
   * This is to avoid infinite loop and also makes it easier to follow since it's linear
   */

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

    if (!queryChanged) {
      return;
    }

    setQueryParams({
      pokemon1: pokemonIdList[0].toString(),
      pokemon2: pokemonIdList[1].toString(),
    });
  }, [pokemonIdList, setQueryParams, queryParams]);

  useEffect(() => {
    const queryId1 = queryParams?.pokemon1;
    const queryId2 = queryParams?.pokemon2;

    if (!queryId1 || !queryId2) {
      return;
    }

    const newId1 = parseInt(queryId1 ?? "");
    const newId2 = parseInt(queryId2 ?? "");

    const id1Changed = battlePokemonList?.pokemon1.id !== newId1;
    const id2Changed = battlePokemonList?.pokemon2.id !== newId2;

    if (!id1Changed && !id2Changed) {
      return;
    }

    // Fetch the Pokemon
    setIsLoading({ pokemon1: id1Changed, pokemon2: id2Changed });
    Promise.all([newId1, newId2].map(getPokemonById))
      .then(([pokemon1, pokemon2]) => {
        setBattlePokemonList({ pokemon1, pokemon2 });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(null);
      });
  }, [queryParams, battlePokemonList]);

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
      <Row className="gx-0">
        {/* // ! On first render, the pokemon won't be available
            // ! so we need to disable the card at that time to make sure it render properly
        */}
        {pokemon && (
          <CompactPokemonInfoCard
            customCardTitle={
              <Row className="gx-0 mb-5">
                <Col md={9} lg={7} xl={9}>
                  <Form.Group>
                    <Form.Label className="h6 mb-0">Pokemon</Form.Label>
                    <PokemonSearchBar
                      selectedName={pokemon.name}
                      onSelected={(_, id) => {
                        onIdChange(id);
                      }}
                      disabled={isLoading}
                    />
                  </Form.Group>
                </Col>

                <Col className="mt-2 mt-md-0 ms-md-2 d-flex">
                  <Button
                    variant="outline-primary mt-auto w-100"
                    onClick={() => onIdChange(getRandomPokemonId())}
                    disabled={isLoading}
                  >
                    Randomize
                  </Button>
                </Col>
              </Row>
            }
            defaultActiveSection="stats"
            pokemon={pokemon}
            isLoading={isLoading}
          />
        )}
      </Row>
    </Col>
  );
};
