"use client";

import { capitalizeFirstLetter } from "@/utils/functional";
import { getRandomPokemon } from "@/utils/pokemon";
import Image from "next/image";
import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import { Button, Card, ListGroup, Row } from "react-bootstrap";
import { LoadingSpinner } from "./LoadingSpinner";

export const CompactPokemonInfoCard = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    getRandomPokemon().then((pokemon) => {
      setPokemon(pokemon);
    });
  }, []);

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="text-center">Pokemon Info</Card.Title>

        {pokemon ? <PokemonInfoCard pokemon={pokemon} /> : <LoadingSpinner />}

        {/* // TODO redirect the user to the battle page with the pokemon here */}
        <div className="text-center mt-4">
          <Button variant="outline-primary" disabled={pokemon === null}>
            Find out more!
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const PokemonInfoCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const { sprites, name, id, height, weight, species, types } = pokemon;
  const capitalizedName = capitalizeFirstLetter(name);

  return (
    <>
      <Row className="d-flex align-items-center justify-content-center">
        <Image
          src={sprites.other?.["official-artwork"].front_default ?? ""}
          alt={capitalizedName}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
        />
      </Row>

      <Row className="mt-2">
        <ListGroup as="ol" variant="flush">
          <StatItem name="Name" value={capitalizedName} />
          <StatItem name="ID" value={id} />

          <StatItem name="Height" value={`${height} dm`} />
          <StatItem name="Weight" value={`${weight} hg`} />

          <StatItem
            name="Species"
            value={capitalizeFirstLetter(species.name)}
          />
          <StatItem
            name="Types"
            value={types
              .map(({ type }) => capitalizeFirstLetter(type.name))
              .join(", ")}
          />
        </ListGroup>
      </Row>
    </>
  );
};

const StatItem = ({
  name,
  value,
}: {
  name: string;
  value: number | string;
}) => (
  <ListGroup.Item
    as="li"
    className="d-flex justify-content-between align-items-start"
  >
    <div className="ms-2 me-auto">
      <div className="fw-bold">{name}</div>
      {value}
    </div>
  </ListGroup.Item>
);

const IMAGE_SIZE = 300;
