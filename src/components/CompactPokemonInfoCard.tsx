"use client";

import { capitalizeFirstLetter } from "@/utils/functional";
import { getRandomPokemon } from "@/utils/pokemon";
import { PokemonType } from "@/utils/pokemon-type";
import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "pokenode-ts";
import { ReactNode, useEffect, useState } from "react";
import { Card, ListGroup, Row } from "react-bootstrap";
import { LoadingSpinner } from "./LoadingSpinner";
import { PokemonTypeTag } from "./PokemonTypeTag";

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

        {pokemon && (
          <div className="text-center mt-4">
            <Link
              href={`/pokedex?pokemon=${pokemon.id}`}
              className="btn btn-outline-primary"
            >
              Find out more!
            </Link>
          </div>
        )}
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
            value={types.map(({ type }) => (
              <PokemonTypeTag
                key={type.name}
                typeName={type.name as PokemonType}
                className="me-2"
              />
            ))}
          />
        </ListGroup>
      </Row>
    </>
  );
};

const StatItem = ({ name, value }: { name: string; value: ReactNode }) => (
  <ListGroup.Item
    as="li"
    className="d-flex justify-content-between align-items-start"
  >
    <div className="ms-2 me-auto">
      <div className="fw-bold mb-1">{name}</div>

      <div className="d-flex">{value}</div>
    </div>
  </ListGroup.Item>
);

const IMAGE_SIZE = 300;
