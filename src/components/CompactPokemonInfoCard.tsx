"use client";

import { capitalizeFirstLetter } from "@/utils/functional";
import { getRandomPokemon } from "@/utils/pokemon";
import { PokemonType } from "@/utils/pokemon-type";
import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "pokenode-ts";
import { ReactNode, useEffect, useState } from "react";
import { Accordion, Card, ListGroup, Row } from "react-bootstrap";
import style from "./CompactPokemonInfoCard.module.css";
import { LoadingSpinner } from "./LoadingSpinner";
import { PokemonTypeTag } from "./PokemonTypeTag";

interface Props {
  pokemon?: Pokemon;
  customCardTitle?: ReactNode;
  defaultActiveSection?: AccordionType | null;
  isLoading?: boolean;

  // * --- Battle stuff
  fainted?: boolean;
  /** Used to render stat after a battle */
  battleResultPokemon?: Pokemon;
}

/**
 * Display a compact version of the Pokemon info card.
 *
 * Will randomly fetch a Pokemon if none is provided.
 */
export const CompactPokemonInfoCard = ({
  pokemon: _pokemon,
  customCardTitle,
  defaultActiveSection = "basic-info",
  isLoading,
  fainted,
  battleResultPokemon,
}: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(_pokemon ?? null);

  useEffect(() => {
    if (!pokemon && !isLoading) {
      getRandomPokemon().then(setPokemon);
    }
  }, [pokemon, isLoading]);

  useEffect(() => {
    _pokemon && setPokemon(_pokemon);
  }, [_pokemon]);

  return (
    <Card className="shadow-sm">
      <Card.Body>
        {customCardTitle ?? (
          <Card.Title className="text-center">Pokemon Info</Card.Title>
        )}

        {pokemon && !isLoading ? (
          <>
            <PokemonInfoCard
              pokemon={pokemon}
              defaultActiveSection={defaultActiveSection}
              fainted={fainted}
              battleResultPokemon={battleResultPokemon}
            />

            <div className="text-center mt-4">
              <Link
                href={`/pokedex?pokemon=${pokemon.id}`}
                className="btn btn-outline-primary"
              >
                Find out more
              </Link>
            </div>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </Card.Body>
    </Card>
  );
};

const PokemonInfoCard = ({
  pokemon,
  defaultActiveSection,
  fainted,
  battleResultPokemon,
}: { pokemon: Pokemon } & Props) => {
  const { sprites, name, id, height, weight, species, types, stats } = pokemon;
  const resultStats = battleResultPokemon?.stats;
  const capitalizedName = capitalizeFirstLetter(name);

  return (
    <>
      <Row className="position-relative">
        <div className="d-flex align-items-center justify-content-center">
          <Image
            src={sprites.other?.["official-artwork"].front_default ?? ""}
            alt={capitalizedName}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
            className={fainted ? style["fainted-img"] : undefined}
            priority
          />
        </div>

        {fainted && (
          <div
            className={`
              d-flex align-items-center justify-content-center
              position-absolute top-0 start-0
              w-100 h-100
            ${style.fainted}`}
          >
            <p className="h2">x FAINTED! x</p>
          </div>
        )}
      </Row>

      <Row className="mt-2">
        <Accordion defaultActiveKey={defaultActiveSection}>
          <Accordion.Item eventKey={"basic-info" satisfies AccordionType}>
            <Accordion.Header>Basic info</Accordion.Header>

            <Accordion.Body>
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
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={"stats" satisfies AccordionType}>
            <Accordion.Header>Stats</Accordion.Header>

            <Accordion.Body>
              <ListGroup as="ol" variant="flush">
                {stats.map(({ base_stat, stat }, statIndex) => {
                  const resultBaseStat = resultStats?.[statIndex].base_stat;

                  return (
                    <StatItem
                      key={stat.name}
                      name={capitalizeFirstLetter(stat.name)}
                      value={
                        // Currently only support HP
                        resultBaseStat && stat.name === "hp" ? (
                          <div className={style["result-stats"]}>
                            <span className="text-decoration-line-through text-secondary me-2">
                              {base_stat}
                            </span>

                            <span
                              className={
                                resultBaseStat > 0
                                  ? "text-success"
                                  : "text-danger"
                              }
                            >
                              {Math.round(resultBaseStat)}
                            </span>
                          </div>
                        ) : (
                          base_stat
                        )
                      }
                    />
                  );
                })}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
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

type AccordionType = "basic-info" | "stats";
