"use client";
import { getAbility, getPokemonById, getRandomPokemonId } from "@/utils/pokemon";
import { useQueryParams } from "@/hook/useQueryParams";
import { PokemonSearchBar } from "@/components/PokemonSearchBar";
import PokemonInfoCard from "@/components/PokemonInfoCard";
import { useEffect, useState } from "react";
import { Pokemon } from "pokenode-ts";
import { capitalizeFirstLetter } from "@/utils/functional";
import { PokemonType } from "@/utils/pokemon-type";

export default function PokemonInfoView() {
    const { queryParams, setQueryParams } = useQueryParams<{
        pokemon: string;
      }>();

    const [pokemonId, setPokemonId] = useState(
    queryParams.pokemon
        ? parseInt(queryParams.pokemon)
        : getRandomPokemonId()
    );

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [pokemonInfo, setPokemonInfo] = useState(new Map<string, any>());
    const [abilities, setAbilities] = useState(new Map<string, string>());
    const [types, setTypes] = useState<string[]>([]);
    const [games, setGames] = useState<string[]>([]);
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

        const pokemonInfo = new Map<string, any>();
        pokemonInfo.set('name', capitalizeFirstLetter(pokemon.name));
        pokemonInfo.set('id', pokemon.id);
        pokemonInfo.set("height", pokemon.height);
        pokemonInfo.set("weight", pokemon.weight);
        pokemonInfo.set("sprite", pokemon.sprites.front_default);
        pokemonInfo.set("species", pokemon.species.name);

        const types = pokemon.types.map(type => type.type.name);

        const games = pokemon.game_indices.map(game => game.version.name);

        const abilities = new Map<string, string>();
        for (const abilityItem of pokemon.abilities) {
            const name = abilityItem.ability.name;

            try {
                const response = await getAbility(name);
                for (const effectItem of response.effect_entries) {
                    if(effectItem.language.name === "en")
                        abilities.set(name, effectItem.effect);
                    else 
                        abilities.set(name, ""); 
                }
            } catch (error) {
                console.error("Error fetching ability:", error)
            }
        }

        setPokemonInfo(pokemonInfo);
        setAbilities(abilities);
        setTypes(types);
        setGames(games);
        
    }

    return(
        <div>
            <h1>Pokedex</h1>
            <PokemonSearchBar
                onSelected={(_, id) => {
                    setPokemonId(id);
                }}
                battle={false}
            />
            <PokemonInfoCard
                stats={pokemonInfo}
                abilities={abilities}
                types={types}
                games={games}
                isLoading={isLoading}
                pokemon={pokemon}
            />
        </div>
    )
}