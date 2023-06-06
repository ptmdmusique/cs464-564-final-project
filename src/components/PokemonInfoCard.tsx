"use-client"
import { capitalizeFirstLetter } from "@/utils/functional";
import { ReactNode  } from "react";
import Image from "next/image";
import { Accordion, Card, ListGroup, Row, Col, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { PokemonTypeTag } from "./PokemonTypeTag";
import { PokemonType } from "@/utils/pokemon-type";
import { Pokemon } from "pokenode-ts";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { LoadingSpinner } from "./LoadingSpinner";

const IMAGE_SIZE = 300;

interface Props {
    pokemon: Pokemon | null;
    pokemonInfo: Map<string, any>;
    types: string[];
    abilities: Map<string, string>;
    games: string[];
    isLoading: boolean;
}

export default function PokemonInfoCard ({
    pokemon: pokemon,
    pokemonInfo,
    types, 
    abilities,
    games,
    isLoading
}: Props) {    
    return (
        <div>
            {!pokemon && !isLoading && (
                <h2 className="text-danger">Error loading pokemon....</h2>
            )}
            {pokemon && !isLoading ? (
            <Container className="mt-2 mr-5">
                <Row>
                    <PokemonCard
                        pokemon={pokemon}
                        pokemonInfo={pokemonInfo}
                        types={types}
                        abilities={abilities}
                        games = {games}
                        isLoading={isLoading}
                    />
                    <Col className="mx-lg-3">

                        <h3 className="mt-4">Abilities:</h3>
                        {Array.from(abilities.entries()).map(([name, def]) => (
                            <Accordion key={name} defaultActiveKey={name}>
                                <Accordion.Header>
                                    {name}
                                </Accordion.Header>
                                <Accordion.Body>{def}</Accordion.Body>
                            </Accordion>
                        ))}

                        <h3 className="mt-4">Stats:</h3>
                        <div className="mx-lg-3 mx-sm-2">
                            <h4 className="fs-5">HP:</h4>
                            <h4 className="fs-5">Attack:</h4>
                            <h4 className="fs-5">Special-Attack:</h4>
                            <h4 className="fs-5">Defense:</h4>
                            <h4 className="fs-5">Special-Defense:</h4>
                        </div>
                    </Col>
                    <Col>
                        <h3 className="mt-4">Games Appeared In:</h3>
                        <ul>
                        {games.map((game, index) => (
                            <li key={index}>{game}</li>
                        ))}  
                        </ul>
                    </Col>
                </Row>      
            </Container>
            ): (<LoadingSpinner/>)}
            
        </div>
    )

};

const PokemonCard = ({
    pokemon: pokemon,
    pokemonInfo,
    types, 
    abilities,
    games,
    isLoading
}: Props) => {
    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title className="fs-2">{pokemonInfo.get("name")} - {pokemonInfo.get('id')}</Card.Title>
                        <Image
                            src={pokemonInfo.get('sprite')}
                            alt={pokemonInfo.get('name')}
                            width={IMAGE_SIZE}
                            height={IMAGE_SIZE}
                            priority
                        />
                    </Col>
                    <Col className="mx-lg-5">
                        <h3 className="mt-4">Basic Info:</h3>
                        <div className="mx-lg-3 mx-sm-2">
                            <h4 className="fs-5">Height:</h4>
                            <div className="mx-2 ">{pokemonInfo.get('height')} dm</div>
                            <h4 className="fs-5">Weight:</h4>
                            <div className="mx-2">{pokemonInfo.get('weight')} hg</div>
                            <h4 className="fs-5">Species:</h4>
                            <div className="mx-2">{pokemonInfo.get('species')}</div>
                        </div>
                    </Col>
                    <Col>
                        <h3 className="mb-3 mt-4">Types:</h3>
                        {types.map((arrayItem, index) => (
                            <PokemonTypeTag
                            key={index}
                            typeName={arrayItem as PokemonType}
                            className="w-25 text-center mx-1 d-inline"
                            />
                        ))}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}