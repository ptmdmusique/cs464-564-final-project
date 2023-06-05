"use-client"
import { capitalizeFirstLetter } from "@/utils/functional";
import { ReactNode  } from "react";
import Image from "next/image";
import { Accordion, Card, ListGroup, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { PokemonTypeTag } from "./PokemonTypeTag";
import { PokemonType } from "@/utils/pokemon-type";
import { Pokemon } from "pokenode-ts";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { LoadingSpinner } from "./LoadingSpinner";

const IMAGE_SIZE = 300;

interface Props {
    pokemon: Pokemon | null;
    stats: Map<string, any>;
    types: string[];
    abilities: Map<string, string>;
    games: string[];
    isLoading: boolean;
}

export default function PokemonInfoCard ({
    pokemon: pokemon,
    stats,
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
                <>
                <div>
                    <h2>{stats.get('name')}</h2> 
                    <p>{stats.get('id')}</p>
                </div>
                <Col>
                    <Image
                        src={stats.get('sprite')}
                        alt={stats.get('name')}
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                        style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                        priority
                    />
                    <h3>Types:</h3>
                    {types.map((arrayItem, index) => (
                        <PokemonTypeTag
                        key={index}
                        typeName={arrayItem as PokemonType}
                        className="me-2"
                        />
                    ))}
                </Col>
                <Col>
                    <h3>Basic Info:</h3>
                    <div className="label">Height:</div>
                    <div className="stat">{stats.get('height')} dm</div>
                    <div className="label">Weight:</div>
                    <div className="stat">{stats.get('weight')} hg</div>
                    <div className="label">Species:</div>
                    <div className="stat">{stats.get('species')}</div>

                    <h3>Abilities:</h3>
                    {Array.from(abilities.entries()).map(([name, def]) => (
                        <Accordion key={name} defaultActiveKey={name}>
                            <Accordion.Header>
                                {name}
                            </Accordion.Header>
                            <Accordion.Body>{def}</Accordion.Body>
                        </Accordion>
                    ))}
                </Col>
                <Col>
                    <h3>Games Appeared In:</h3>
                    <ul>
                    {games.map((game, index) => (
                        <li key={index}>{game}</li>
                    ))}  
                    </ul>
                </Col>
                </>
            ): (<LoadingSpinner/>)}
            
        </div>
    )

}