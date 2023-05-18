"use client";

import { capitalizeFirstLetter } from "@/utils/functional";
import { getRandomPokemon } from "@/utils/pokemon";
import Image from "next/image";
import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { LoadingSpinner } from "./LoadingSpinner";

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
        <Card.Title className="text-center">Battle Simulation!</Card.Title>

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
              <Col>
                <LoadingSpinner />
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
  const capitalizedName = capitalizeFirstLetter(name);

  return (
    <Col xs={12} md={5} className="text-center">
      <Image
        src={sprites.front_default ?? ""}
        alt={capitalizedName}
        width={200}
        height={200}
      />

      <p className="h6 mt-1">{capitalizedName}</p>
    </Col>
  );
};
