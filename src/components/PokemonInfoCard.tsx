"use-client"
import Image from "next/image";
import { Accordion, Card, Row, Col, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { PokemonTypeTag } from "./PokemonTypeTag";
import { PokemonType } from "@/utils/pokemon-type";
import { LoadingSpinner } from "./LoadingSpinner";
import { PokemonInfo } from "@/data/pokemon-info";
import PokemonSearch from "./PokemonSearch";

const IMAGE_SIZE = 300;

interface Props {
    pokemonInfo: PokemonInfo | null
    isLoading: boolean;
}

export default function PokemonInfoCard ({
    pokemonInfo,
    isLoading
}: Props) {    
    return (
        <div>
            {!pokemonInfo && !isLoading && (
                <h2 className="text-danger">Error loading pokemon....</h2>
            )}
            {pokemonInfo && !isLoading ? (
            <Container className="mt-2 mr-5">
                <Row>
                    <PokemonCard
                        pokemonInfo={pokemonInfo}
                        isLoading={isLoading}
                    />
                    <Col className="mx-lg-3">
                        <h3 className="mt-4">Abilities:</h3>
                        
                        {pokemonInfo.abilities.map((ability, index) => {
                            return (
                                <Accordion key={ability.name} defaultActiveKey={ability.name}>
                                    <Accordion.Header>
                                        {ability.name}
                                    </Accordion.Header>
                                    {ability.definition && (<Accordion.Body>{ability.definition}</Accordion.Body>)}
                                </Accordion>
                        )})}

                        <h3 className="mt-4">Stats:</h3>
                        <div className="mx-lg-3 mx-sm-2">
                            <h4 className="fs-5">HP:</h4>
                            <div className="mx-2 ">{pokemonInfo.hp}</div>
                            <h4 className="fs-5">Attack:</h4>
                            <div className="mx-2 ">{pokemonInfo.attack}</div>
                            <h4 className="fs-5">Special Attack:</h4>
                            <div className="mx-2 ">{pokemonInfo.specialAttack}</div>
                            <h4 className="fs-5">Defense:</h4>
                            <div className="mx-2 ">{pokemonInfo.defense}</div>
                            <h4 className="fs-5">Special Defense:</h4>
                            <div className="mx-2 ">{pokemonInfo.specialDefense}</div>
                        </div>
                    </Col>
                    <Col>
                        <h3 className="mt-4">Games Appeared In:</h3>
                        <ul>
                        {pokemonInfo.gamesIn.map((game, index) => (
                            <li key={index}>{game}</li>
                        ))}  
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <h2 className="text-center mt-5">View other Pokemon:</h2>
                    <PokemonSearch
                        numOfPokemon={3}
                    />
                </Row>
            </Container>
            ): (<LoadingSpinner/>)}
            
        </div>
    )

};

const PokemonCard = ({
    pokemonInfo,
    isLoading
}: Props) => {
    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title className="fs-2">{pokemonInfo?.name} - {pokemonInfo?.id}</Card.Title>
                        <Image
                            src={pokemonInfo?.sprite ?? "src/data/pikachu.jpg"}
                            alt={pokemonInfo?.name ?? "Error loading image"}
                            width={IMAGE_SIZE}
                            height={IMAGE_SIZE}
                            priority
                        />
                    </Col>
                    <Col className="mx-lg-5">
                        <h3 className="mt-4">Basic Info:</h3>
                        <div className="mx-lg-3 mx-sm-2">
                            <h4 className="fs-5">Height:</h4>
                            <div className="mx-2 ">{pokemonInfo?.height} dm</div>
                            <h4 className="fs-5">Weight:</h4>
                            <div className="mx-2">{pokemonInfo?.weight} hg</div>
                            <h4 className="fs-5">Species:</h4>
                            <div className="mx-2">{pokemonInfo?.species}</div>
                        </div>
                    </Col>
                    <Col>
                        <h3 className="mb-3 mt-4">Types:</h3>
                        {pokemonInfo?.types.map((arrayItem, index) => (
                            <PokemonTypeTag
                            key={index}
                            typeName={arrayItem as PokemonType}
                            className="text-center mx-1 d-inline"
                            />
                        ))}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}