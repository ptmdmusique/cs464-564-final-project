"use client";
import { getAbility, getPokemonById, getRandomPokemonId } from "@/utils/pokemon";
import { useQueryParams } from "@/hook/useQueryParams";
import { PokemonSearchBar } from "@/components/PokemonSearchBar";
import PokemonInfoCard from "@/components/PokemonInfoCard";
import { useEffect, useState } from "react";
import { Pokemon } from "pokenode-ts";
import { capitalizeFirstLetter, removeHyphen } from "@/utils/functional";
import { Col, Container, Row } from "react-bootstrap";
import { PokemonInfo, Ability } from "@/data/pokemon-info";

export default function PokemonInfoView() {
    const { queryParams, setQueryParams } = useQueryParams<{
        pokemon: string;
      }>();

    const [pokemonId, setPokemonId] = useState(
    queryParams.pokemon
        ? parseInt(queryParams.pokemon)
        : 5
    );

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Set Pokemon
    useEffect(() => {
        const queryChanged = pokemonId.toString() !== queryParams?.pokemon;
        if (!queryChanged) {
            return;
        }
        
        setQueryParams({pokemon: pokemonId.toString()});
    }, [pokemonId, setQueryParams, queryParams]);

    //Load in Pokemon
    useEffect(() => {
        const queryId = parseInt(queryParams?.pokemon ?? "");
        const idChanged = queryId !== pokemonId;
        if ((!idChanged) || isLoading) {
            return;
        }

        setIsLoading(idChanged);
        if (pokemonId === -1) {
            console.log("ID is -1, is Loading = ", isLoading);
            return;
        }
        
        getPokemonById(pokemonId)
          .then(async (response) => {
            setPokemon(response)
            await parsePokemon(response);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
    }, [queryParams, pokemon, isLoading, pokemonId]);

    async function parsePokemon (pokemon: Pokemon) {
        if(pokemon == null) return;

        const pokemonInfo: PokemonInfo = {
            name: capitalizeFirstLetter(pokemon.name),
            id: pokemon.id,
            sprite: pokemon.sprites.other?.["official-artwork"].front_default ?? pokemon.sprites.front_default,
            height: pokemon.height,
            weight: pokemon.weight,
            species: capitalizeFirstLetter(pokemon.species.name),
            hp: 0,
            attack: 0,
            specialAttack: 0,
            defense: 0,
            specialDefense: 0,
            abilities: [],
            types: pokemon.types.map(type => type.type.name),
            gamesIn: pokemon.game_indices.map(game => capitalizeFirstLetter(removeHyphen(game.version.name)))
        }

        // parse the stats:
        for(const stat of pokemon.stats) {
            switch (stat.stat.name) {
                case "hp":
                    pokemonInfo.hp = stat.base_stat;
                    break;
                case "attack":
                    pokemonInfo.attack = stat.base_stat;
                    break;
                case "special-attack":
                    pokemonInfo.specialAttack = stat.base_stat;
                    break;
                case "defense":
                    pokemonInfo.defense = stat.base_stat;
                    break;
                case "special-defense":
                    pokemonInfo.specialDefense = stat.base_stat;
                    break;
                default:
                    break;
            }
        }

        // fetch the abilities and their definitions:
        const abilityPromises = pokemon.abilities.map(async (ability) => {
            const name = ability.ability.name;

            try {
                await getAbility(name).then((response) => {
                    let newAbility: Ability = {
                        name: capitalizeFirstLetter(removeHyphen(name)),
                        definition: null
                    };
                    for (const effectItem of response.effect_entries) {
                        if(effectItem.language.name === "en") {
                            newAbility.definition = effectItem.effect
                        }
                    }
                    pokemonInfo.abilities.push(newAbility);
                });
                
            } catch (error) {
                console.error("Error fetching ability:", error);
            }
        });

        await Promise.all(abilityPromises);

        setPokemonInfo(pokemonInfo);
    }

    return(
        <Container className="mt-3">
            <Row>
                <Col>
                    <h1>Pokedex</h1>
                </Col>
                <Col>
                    <PokemonSearchBar
                        onSelected={(_, id) => {
                            setPokemonId(id);
                        }}
                        battle={false}
                    />
                </Col>
            </Row>
        
            <PokemonInfoCard
                pokemonInfo={pokemonInfo}
                isLoading={isLoading}
            />
        </Container>
    )
}