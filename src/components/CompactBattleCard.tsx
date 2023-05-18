"use client";

import { getRandomNumber } from "@/utils/functional";
import Image from "next/image";
import { Pokemon, PokemonClient } from "pokenode-ts";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";

export const CompactBattleCard = () => {
  const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
  const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);

  useEffect(() => {
    Promise.all([getRandomPokemon(), getRandomPokemon()]).then(
      ([pokemon1, pokemon2]) => {
        setPokemon1(pokemon1);
        setPokemon2(pokemon2);
      },
    );
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">Battle simulation!</Card.Title>

        <div>
          <Row className="gx-0">
            {pokemon1 && pokemon2 ? (
              <>
                <PokemonCard pokemon={pokemon1} />

                <Col
                  xs={12}
                  md={2}
                  className="d-flex align-items-center justify-content-center h2"
                >
                  ⚔️
                </Col>

                <PokemonCard pokemon={pokemon2} />
              </>
            ) : (
              <Col className="text-center mt-3">
                <Spinner animation="border" role="status" />
                <p>Loading ...</p>
              </Col>
            )}
          </Row>
        </div>

        {/* // TODO redirect the user to the battle page with the 2 pokemon here */}
        <div className="text-center mt-4">
          <Button variant="outline-primary">Battle!</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const { sprites, name } = pokemon;

  return (
    <Col xs={12} md={5} className="text-center">
      <Image
        src={sprites.front_default ?? ""}
        alt={capitalizeFirstLetter(name)}
        width={200}
        height={200}
      />

      <p className="h6 mt-1">{capitalizeFirstLetter(name)}</p>
    </Col>
  );
};

const MIN_POKEMON_ID = 1;
const MAX_POKEMON_ID = 1000;

const api = new PokemonClient();
const getRandomPokemon = () =>
  api.getPokemonById(getRandomNumber(MIN_POKEMON_ID, MAX_POKEMON_ID));

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
