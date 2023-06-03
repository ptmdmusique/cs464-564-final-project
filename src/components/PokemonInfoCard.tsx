"use-client"
import { Pokemon } from "pokenode-ts";
import { ReactNode } from "react";

interface Props {
    pokemon?: Pokemon | null;
    customCardTitle?: ReactNode | null;
    isLoading?: boolean | null;
    searchPokemon: (id: number) => void;
}

export default function PokemonInfoCard ({
    pokemon: _pokemon,
    customCardTitle,
    isLoading,
    searchPokemon
}: Props) {
    console.log(_pokemon);
    return (
        <div>
            <p>Pokemon Info:</p>
            <p>{_pokemon?.name}</p> 
            <p>{_pokemon?.id}</p>
            <p>{_pokemon?.height}</p>

        </div>
    )

}