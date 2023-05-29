import { getAllPokemonList } from "@/utils/pokemon";
import { useEffect, useState } from "react";

export const usePokemonSpecies = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [allSpecies, setAllSpecies] = useState<{ name: string; id: number }[]>(
    [],
  );
  useEffect(() => {
    getAllPokemonList()
      .then((list) => {
        setAllSpecies(
          list.results.map(({ name, url }) => ({
            name,
            // url will have the format https://pokeapi.co/api/v2/pokemon-species/<id>/
            id: parseInt(url.split("pokemon-species/")[1]),
          })),
        );
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { allSpecies, isLoading };
};
