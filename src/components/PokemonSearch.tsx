"use-client"
import { Row, Col, Container, Button, Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { MIN_POKEMON_ID, MAX_POKEMON_ID, getPokemonById, getPokemonTypes, getTypeByName, getPokemonByName, getPokemonAbilities, getAbility } from "@/utils/pokemon";
import { capitalizeFirstLetter, getRandomNumber } from "@/utils/functional";
import { PokemonCardInfo, PokemonInfo } from "@/data/pokemon-info";
import PokemonSearchCard from "./PokemonSearchCard";

interface Props {
    numOfPokemon: number
    selectedPokemon: (id: number) => void
}

export default function PokemonSearch({
    numOfPokemon,
    selectedPokemon
}: Props) {
    const [pokemonIdArray, setPokemonIdArray] = useState<number[]>(getRandomIds(numOfPokemon));
    const [allPokemon, setAllPokemon] = useState<PokemonCardInfo[]>([]);
    const [selectedFilterCategory, setSelectedFilterCategory] = useState<string | null>(null);
    const [selectedFilterType, setSelectedFilterType] = useState<string | null>(null);
    const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
    const [pokemonNamesArray, setPokemonNamesArray] = useState<string[]>([]);

    useEffect(() => {
        async function getPokemonWithIds() {
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

        getPokemonWithIds();

    }, [pokemonIdArray]);

    useEffect(() => {
        // Get pokemon information using names of the pokemon
        const getPokemonWithNames = async () => {
            const getPokemonPromises = pokemonNamesArray.map(async (name) => {
                try {
                    const response = await getPokemonByName(name);
                    let pokemonInfo: PokemonCardInfo = {
                        name: capitalizeFirstLetter(response.name),
                        id: response.id,
                        sprite: response.sprites.other?.["official-artwork"].front_default ?? response.sprites.front_default
                    };
                    setAllPokemon((prevPokemon) => [...prevPokemon, pokemonInfo]);
                }
                catch (error) {
                    console.error("Error fetching pokemon with name, ", name, ": ", error);
                }
            });

            await Promise.all(getPokemonPromises);
        }

        getPokemonWithNames();
    }, [pokemonNamesArray])

    // Get pokemon information using names of the pokemon
    const getPokemonInfoWithNames = async (names: string[]) => {
        const getPokemonPromises = names.map(async (name) => {
            try {
                const response = await getPokemonByName(name);
                let pokemonInfo: PokemonCardInfo = {
                    name: capitalizeFirstLetter(response.name),
                    id: response.id,
                    sprite: response.sprites.other?.["official-artwork"].front_default ?? response.sprites.front_default
                };
                setAllPokemon((prevPokemon) => [...prevPokemon, pokemonInfo]);
            }
            catch (error) {
                console.error("Error fetching pokemon with name, ", name, ": ", error);
            }
        });

        await Promise.all(getPokemonPromises);
    }

    // Get's all the pokemon by type, condenses them, and pulls out the names (for later api call)
    const getPokemonListByType = async (type: string | null) => {
        if (type === null) return;
        try {
            const response = await getTypeByName(type);
            const pokemonList = response.pokemon;
            const num = Math.floor(pokemonList.length / 5); // only take 1/5 of array
            pokemonList.splice(num, pokemonList.length - num);

            // fetch pokemon
            let names: string[] = [];
            pokemonList.map((pokemon) => {
                names.push(pokemon.pokemon.name);
            })
            setPokemonNamesArray(names);
        }
        catch (error) {
            console.error("Error fetching list of pokemon by type: ", error);
        }
    }

    // Get's all the pokemon by ability, condenses them, and pulls out the names (for later api call)
    const getPokemonListByAbility = async (ability: string | null) => {
        if (ability === null) return;
        try {
            const response = await getAbility(ability);
            const pokemonList = response.pokemon;

            // condense the list if greater than 20
            if (pokemonList.length > 20) {
                const num = Math.floor(pokemonList.length / 5); // only take 1/5 of array
                pokemonList.splice(num, pokemonList.length - num);
            }

            // fetch pokemon
            let names: string[] = [];
            pokemonList.map((pokemon) => {
                names.push(pokemon.pokemon.name);
            })
            setPokemonNamesArray(names);
        }
        catch (error) {
            console.error("Error fetching list of pokemon by type: ", error);
        }
    }

    // Getting the list of pokemon by type, then getting the information for those pokemon with the names
    const generatePokemonFromType = async () => {
        setAllPokemon([]); //clear pokemon
        setPokemonNamesArray([]); //and names :)

        await getPokemonListByType(selectedFilterType);
        await getPokemonInfoWithNames(pokemonNamesArray);

    }

    // Getting the list of pokemon by ability, then getting the information for those pokemon with the names
    const generatePokemonFromAbility = async () => {

        setAllPokemon([]); //clear pokemon
        setPokemonNamesArray([]); //and names :)

        await getPokemonListByAbility(selectedFilterType);
        await getPokemonInfoWithNames(pokemonNamesArray);
    }

    // Get list of types for dropdown
    const getTypes = async () => {
        const response = await getPokemonTypes();
        let options: string[] = [];
        response.results.map((type) => {
            options.push(type.name);
        });
        setDropdownOptions(options);
    }

    // Get list of abilities for dropdown
    const getAbilities = async () => {
        const response = await getPokemonAbilities();
        let options: string[] = [];
        response.results.map((ability) => {
            options.push(ability.name);
        })
        setDropdownOptions(options);
    }

    // Get options based on dropdown category input 
    const getDropdownOptions = async (selectedCategory: string) => {
        switch (selectedCategory) {
            case "Types":
                await getTypes();
                break;
            case "Abilities":
                await getAbilities();
                break;
            default:
                setDropdownOptions([]);
                break;
        }
    }

    // Randomize new ids to generate new random pokemon
    const generateNewIds = () => {
        // clear current:
        setPokemonIdArray([]);
        setAllPokemon([]);

        // Generate new ids. Pokemon will get updated in useEffect.
        setPokemonIdArray(getRandomIds(numOfPokemon));
    }

    // Update variables when dropdown changes
    const handleSelectedCategory = async (eventKey: any) => {
        setSelectedFilterCategory(eventKey);
        setSelectedFilterType(null);
        await getDropdownOptions(eventKey);
    }

    // Update variables when second dropdown changes
    const handleSelectedType = async (eventKey: any) => {
        setSelectedFilterType(eventKey);
    }

    // based on the input from the first dropdown, generate the list for the second dropdown
    const generateFilteredPokemonList = async () => {
        switch (selectedFilterCategory) {
            case "Types":
                await generatePokemonFromType();
                break;
            case "Abilities":
                await generatePokemonFromAbility();
                break;
            default:
                generateNewIds();
                break;
        }
    }

    return (
        <Container>
            {numOfPokemon > 10 && (
                <Row className="my-3 p-2 border rounded border-2">
                    <Col>
                        <h2>Filter:</h2>
                    </Col>
                    <Col>
                        <Dropdown
                            title={selectedFilterCategory ? selectedFilterCategory : "Select a category"}
                            onSelect={handleSelectedCategory}
                        >
                            <Dropdown.Toggle>
                                {selectedFilterCategory ? selectedFilterCategory : "Select a category"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey={"Types"}>Types</Dropdown.Item>
                                <Dropdown.Item eventKey={"Abilities"}>Abilities</Dropdown.Item>
                                <Dropdown.Item eventKey={"Random"}>Random</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Dropdown
                            title={selectedFilterType ? selectedFilterType : "Select a subcategory"}
                            onSelect={handleSelectedType}
                        >
                            <Dropdown.Toggle>
                                {selectedFilterType ? selectedFilterType : "Select a subcategory"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {dropdownOptions.map((option, index) => {
                                    return (
                                        <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Button onClick={generateFilteredPokemonList}>Filter</Button>
                    </Col>
                </Row>
            )}
            <Row>
                {allPokemon.map((pokemon, index) => {
                    return (
                        <Col key={index}>
                            <PokemonSearchCard
                                pokemonInfo={pokemon}
                                selectedPokemon={(id) => {
                                    selectedPokemon(id);
                                }}
                            />
                        </Col>
                    )
                })}
            </Row>
            {numOfPokemon < 10 && (
                <Row>
                    <Button
                        className="btn-danger my-3"
                        onClick={() => { generateNewIds(); }}
                    >Randomize</Button>
                </Row>
            )}
        </Container>

    );
}

const getRandomIds = (numOfIds: number) => {
    //using set to have unique numbers
    let numberSet = new Set<number>();
    let i = 0;

    while (i !== numOfIds) {
        numberSet.add(getRandomNumber(MIN_POKEMON_ID, MAX_POKEMON_ID));

        // Check size in case one didn't get added, we will want to fetch another number.
        if (numberSet.size - 1 === i)
            ++i;
    }

    let numArray: number[] = Array.from(numberSet);
    return numArray;
}
