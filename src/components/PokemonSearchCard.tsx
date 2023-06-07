"use-client"
import Image from "next/image";
import { Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { PokemonCardInfo } from "@/data/pokemon-info";

interface Props {
    pokemonInfo: PokemonCardInfo
}

const IMAGE_SIZE = 150;

export default function PokemonSearchCard({
    pokemonInfo
}: Props) {
    

    return (
        <Card className="shadow-sm text-center my-3">
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
    );
}