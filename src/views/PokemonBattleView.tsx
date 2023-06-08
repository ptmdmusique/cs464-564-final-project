"use client";

import { CompactPokemonInfoCard } from "@/components/CompactPokemonInfoCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PokemonSearchBar } from "@/components/PokemonSearchBar";
import { BattleResult } from "@/data/battle";
import { usePokemonSpecies } from "@/hook/useAllPokemonNameList";
import { useQueryParams } from "@/hook/useQueryParams";
import { battle } from "@/utils/battle";
import { getRandomNumber } from "@/utils/functional";
import { getPokemonById, getRandomPokemonId } from "@/utils/pokemon";
import { Pokemon } from "pokenode-ts";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";

interface Props {
  onBattleResultChange: (battleResult: BattleResult | null) => void;
  onIsBattlingChange: (isBattling: boolean) => void;
}

// ! Export default function because this component needs to be dynamically imported since we're NOT using SSR
export default function PokemonBattleView({
  onIsBattlingChange,
  onBattleResultChange,
}: Props) {
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

  /** Loading state per pokemon */
  const [isLoading, setIsLoading] = useState<[boolean, boolean] | null>(null);
  const [battlePokemonList, setBattlePokemonList] = useState<
    [Pokemon, Pokemon] | null
  >(null);

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

    const id1Changed = battlePokemonList?.[0].id !== newId1;
    const id2Changed = battlePokemonList?.[1].id !== newId2;

    if ((!id1Changed && !id2Changed) || isLoading) {
      return;
    }

    // Fetch the Pokemon
    setIsLoading([id1Changed, id2Changed]);
    Promise.all([newId1, newId2].map(getPokemonById))
      .then(([pokemon1, pokemon2]) => {
        setBattlePokemonList([pokemon1, pokemon2]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(null);
      });
  }, [queryParams, battlePokemonList, isLoading]);

  // * Search bar related stuff
  const { isLoading: isFetchingAllPokemonNames } = usePokemonSpecies();

  // * Battle stuff
  const [isBattling, setIsBattling] = useState(false);
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [isFrenzyMode, setIsFrenzyMode] = useState(false);

  const startBattle = async () => {
    if (!battlePokemonList) {
      return;
    }

    const [pokemon1, pokemon2] = battlePokemonList;

    setIsBattling(true);
    onIsBattlingChange(true);
    setBattleResult(null);

    const battleResult = await battle(pokemon1, pokemon2, isFrenzyMode);

    setIsBattling(false);
    onIsBattlingChange(false);
    setBattleResult(battleResult);

    onBattleResultChange(battleResult);
  };

  const onIdChange = (id: number, index: 0 | 1) => {
    const newPokemonIdList = [...pokemonIdList];
    newPokemonIdList[index] = id;
    setPokemonIdList(newPokemonIdList);
    setBattleResult(null);
    onBattleResultChange(null);
  };

  if (isFetchingAllPokemonNames) {
    return <LoadingSpinner />;
  }

  const { winner, history } = battleResult ?? {};
  const [pokemon1, pokemon2] = battlePokemonList ?? [];

  const renderPokemonCard = (index: 0 | 1) => {
    const fainted = winner == undefined ? null : winner !== index;

    let battleResultPokemon: Pokemon | undefined = undefined;
    if (history) {
      const { resultPokemonList } = history[history.length - 1];
      battleResultPokemon = resultPokemonList[index];
    }

    return (
      <PokemonCard
        isBattling={isBattling}
        pokemon={index === 0 ? pokemon1 : pokemon2}
        isLoading={index === 0 ? isLoading?.[0] : isLoading?.[1]}
        onIdChange={(id) => onIdChange(id, index)}
        fainted={fainted}
        battleResultPokemon={battleResultPokemon}
      />
    );
  };

  return (
    <Row>
      {renderPokemonCard(0)}

      <Col
        className="d-flex flex-column align-items-center justify-content-center my-4 my-lg-0"
        lg={2}
      >
        <p className="h3">⚔️ VS ⚔️</p>

        <Button
          className="mt-3 w-100"
          disabled={isBattling || !battlePokemonList}
          onClick={startBattle}
        >
          {isBattling ? "Battling..." : "Battle!"}
        </Button>

        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Pokemons will choose all moves randomly!</Tooltip>}
        >
          <Form.Group className="mt-2">
            <Form.Label className="d-flex mb-0">
              <Form.Check
                type="switch"
                onChange={(e) => setIsFrenzyMode(e.target.checked)}
              />
              Frenzy Mode 🔥
            </Form.Label>
          </Form.Group>
        </OverlayTrigger>
      </Col>

      {renderPokemonCard(1)}
    </Row>
  );
}

interface PokemonCardRowProps {
  pokemon: Pokemon | undefined;
  isLoading: boolean | undefined;
  isBattling: boolean;
  onIdChange: (id: number) => void;
  fainted: boolean | null;
  battleResultPokemon: Pokemon | undefined;
}

const PokemonCard = ({
  pokemon,
  isBattling,
  isLoading,
  onIdChange,
  fainted,
  battleResultPokemon,
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
                  <PokemonSearchBar
                    selectedName={pokemon.name}
                    onSelected={(_, id) => {
                      onIdChange(id);
                    }}
                    disabled={isLoading || isBattling}
                    battle={true}
                  />
                </Col>

                <Col className="mt-2 mt-md-0 ms-md-2 d-flex">
                  <Button
                    variant="outline-primary mt-auto w-100"
                    onClick={() => onIdChange(getRandomPokemonId())}
                    disabled={isLoading || isBattling}
                  >
                    Randomize
                  </Button>
                </Col>
              </Row>
            }
            defaultActiveSection={null}
            pokemon={pokemon}
            isLoading={isLoading}
            fainted={fainted ?? false}
            battleResultPokemon={battleResultPokemon}
          />
        )}
      </Row>
    </Col>
  );
};
