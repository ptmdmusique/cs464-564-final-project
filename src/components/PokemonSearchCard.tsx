"use-client"
import Image from "next/image";
import { Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { PokemonCardInfo } from "@/data/pokemon-info";

interface Props {
    pokemonInfo: PokemonCardInfo
    selectedPokemon: (id: number) => void;
}

const IMAGE_SIZE = 150;

export default function PokemonSearchCard({
    pokemonInfo,
    selectedPokemon
}: Props) {


    return (
        <Button
            onClick={() => selectedPokemon(pokemonInfo.id)}
            variant="link"
            className="text-decoration-none text-dark my-3 w-100"
        >
            <Card className="shadow-sm text-center">
                <Card.Title>
                    <Image
                        src={pokemonInfo.sprite ?? "src/data/pikachu.jpg"}
                        alt={pokemonInfo.name ?? "Error loading image"}
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                        priority
                        className="my-3"
                    />
                </Card.Title>

                <Card.Body className="fs-3 border text-nowrap">
                    {pokemonInfo.name} - {pokemonInfo.id}
                </Card.Body>
            </Card>
        </Button>
    );
}