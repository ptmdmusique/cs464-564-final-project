"use-client"
import { Row, Col, Container, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useEffect, useState } from "react";
import { MIN_POKEMON_ID, MAX_POKEMON_ID, getPokemonById } from "@/utils/pokemon";
import { capitalizeFirstLetter, getRandomNumber } from "@/utils/functional";
import { PokemonCardInfo, PokemonInfo } from "@/data/pokemon-info";
import PokemonSearchCard from "./PokemonSearchCard";

interface Props {
    numOfPokemon: number
}

export default function PokemonSearch ({
    numOfPokemon
}: Props) {
    const [pokemonIdArray, setPokemonIdArray] = useState<number[]>(getRandomIds(numOfPokemon));
    const [allPokemon, setAllPokemon] = useState<PokemonCardInfo[]>([]);

    useEffect (() => {
        async function getPokemon() {
            const getPokemonPromises = pokemonIdArray.map(async (id) => {
                try {
                    const response = await getPokemonById(id);
                    let pokemonInfo: PokemonCardInfo = {
                        name: capitalizeFirstLetter(response.name),
                        id: response.id,
                        sprite: response.sprites.other?.["official-artwork"].front_default ?? response.sprites.front_default
                    };
                    setAllPokemon((prevPokemon) => [...prevPokemon, pokemonInfo]);
                }
                catch (error) {
                    console.error("Error fetching pokemon with id ", id, ": ", error);
                }
            })
    
            await Promise.all(getPokemonPromises);
        }
        
        getPokemon();

    }, [pokemonIdArray]);

    const generateNewIds = () => {
        // clear current:
        setPokemonIdArray([]); 
        setAllPokemon([]);

        // Generate new ids. Pokemon will get updated in useEffect.
        setPokemonIdArray(getRandomIds(numOfPokemon));
    }

    return (
        <Container>
            
            <Row>
                {allPokemon.map((pokemon, index) => {
                    return (
                        <Col key={index}>
                            <PokemonSearchCard
                                pokemonInfo={pokemon}
                            />
                        </Col>
                    )
                })}
            </Row>
            <Row>
                <Button 
                    className="btn-danger my-3"
                    onClick={() => {generateNewIds();}}
                >Randomize</Button>
            </Row>
        </Container>
        
    );
}

const getRandomIds = (numOfIds: number) => {
    //using set to have unique numbers
    let numberSet= new Set<number>(); 
    let i = 0;
    
    while (i !== numOfIds) {
        numberSet.add(getRandomNumber(MIN_POKEMON_ID, MAX_POKEMON_ID));
        
        // Check size in case one didn't get added, we will want to fetch another number.
        if(numberSet.size-1 === i) 
            ++i;
    }
  
    let numArray: number[] = Array.from(numberSet);
    return numArray;
}
