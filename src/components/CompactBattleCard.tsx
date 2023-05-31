"use client";

import { capitalizeFirstLetter } from "@/utils/functional";
import { getRandomPokemon } from "@/utils/pokemon";
import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
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
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="text-center">Battle Simulator!</Card.Title>

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

        {pokemon1 && pokemon2 && (
          <div className="text-center mt-4">
            <Link
              href={`/simulator?pokemon1=${pokemon1.id}&pokemon2=${pokemon2.id}`}
              className="btn btn-outline-primary"
            >
              Battle!
            </Link>
          </div>
        )}
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
        src={sprites.other?.["official-artwork"].front_default ?? ""}
        alt={capitalizedName}
        width={200}
        height={200}
        className="w-100 h-auto"
        // ! Bootstrap 5.2.3 doesn't support object-fit-contain
        style={{ objectFit: "contain" }}
        priority
      />

      <p className="h6 mt-1">{capitalizedName}</p>
    </Col>
  );
};
