"use client";
import { getPokemonById, getRandomPokemonId } from "@/utils/pokemon";
import { useQueryParams } from "@/hook/useQueryParams";
import { PokemonSearchBar } from "@/components/PokemonSearchBar";
import PokemonInfoCard from "@/components/PokemonInfoCard";
import { useEffect, useState } from "react";
import { Pokemon } from "pokenode-ts";

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

    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Set Pokemon
    useEffect(() => {
        const queryChanged = pokemonId.toString() !== queryParams?.pokemon;

        if (!queryChanged) {
            return;
        }

        setQueryParams({pokemon: pokemonId.toString()});
    }, [pokemonId, setQueryParams, queryParams]);

    // Load in Pokemon
    useEffect(() => {
        const idChanged = parseInt(queryParams?.pokemon ?? "") !== pokemonId;
        console.log(idChanged, isLoading);
        if ((!idChanged) || isLoading) {
            return;
        }

        setIsLoading(idChanged);
        getPokemonById(pokemonId)
          .then((response) => {
            setPokemon(response)
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, [queryParams, pokemon, isLoading]);

    const searchPokemon = (id: number) => {
        setPokemonId(id);
    }

    // const renderPokemonInfo = () => {
    //     console.log(pokemon);
    //     return (
    //         <PokemonInfoCard
    //             pokemon={pokemon}
    //             isLoading={isLoading}
    //             searchPokemon={(id) => searchPokemon(id)}
    //         ></PokemonInfoCard>
    //     )
    // }

    return(
        <div>
            <PokemonInfoCard
                pokemon={pokemon}
                isLoading={isLoading}
                searchPokemon={(id) => searchPokemon(id)}
            ></PokemonInfoCard>

            <p>Hello :D</p>
        </div>
    )
}