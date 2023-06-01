import { BattleResult, DamageEffectiveness } from "@/data/battle";
import { getNextPokemonIndex } from "@/utils/battle";
import { capitalizeFirstLetter } from "@/utils/functional";
import { PokemonType } from "@/utils/pokemon-type";
import Image from "next/image";
import { Move, Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./BattleResultCard.module.css";
import { PokemonTypeTag } from "./PokemonTypeTag";

interface Props {
  battleResult: BattleResult | null;
  isBattling: boolean;
}

export const BattleResultCard = ({ battleResult, isBattling }: Props) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="d-md-flex mb-md-4">
          Battle Result:
          {battleResult && <Winner battleResult={battleResult} />}
        </Card.Title>

        {battleResult ? (
          <TurnHistoryTimeline battleResult={battleResult} />
        ) : (
          <div>
            {isBattling
              ? "They are battling... shhhh!"
              : "Start a battle first!"}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

interface BattleProps {
  battleResult: BattleResult;
}

const Winner = ({ battleResult }: BattleProps) => {
  const { winner, history } = battleResult;
  const lastTurn = history[history.length - 1];
  const winPokemon =
    winner == null
      ? null
      : lastTurn.resultPokemonList[lastTurn.turnPokemonIndex];

  return (
    <p className="ms-md-2 mb-0 text-success">
      {winPokemon
        ? `${capitalizeFirstLetter(winPokemon.name)} won 🎉`
        : "Draw!"}
    </p>
  );
};

const TurnHistoryTimeline = ({ battleResult }: BattleProps) => {
  const { history } = battleResult;

  /** Used to make the card list re-render every time battle result changed */
  const [battleId, setBattleId] = useState(0);
  useEffect(() => {
    setBattleId((prev) => prev + 1);
  }, [battleResult]);

  return (
    <div>
      <p className="h5 mb-3">Turn Commentator 🧑‍🏭🔈</p>

      <ol className="px-0 mb-0 d-flex flex-wrap gap-4">
        {history.map((turn, index) => {
          const {
            move,
            damageDeal,
            damageEffectiveness,
            resultPokemonList,
            turnPokemonIndex,
          } = turn;
          const turnPokemon = resultPokemonList[turnPokemonIndex];
          const otherPokemon =
            resultPokemonList[getNextPokemonIndex(turnPokemonIndex)];

          return (
            <li
              className={`d-flex flex-column ${styles["turn-history"]}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              key={`${index}--${battleId}`}
            >
              <p className="h6">Turn {index + 1}</p>

              <span className="d-flex flex-wrap align-items-center gap-1">
                <PokemonAvatar pokemon={turnPokemon} /> used
                <MoveTag move={move} />
              </span>

              <span className="d-flex flex-wrap align-items-center gap-1">
                <PokemonAvatar pokemon={otherPokemon} /> took{" "}
                <b>{Math.round(damageDeal)}</b> dmg!{" "}
                {damageDeal === 0 ? "Ouch" : ""}
              </span>

              {damageEffectiveness !== "normal" && (
                <b
                  className={`mt-1 mb-0 ${damageEffectivenessToColor(
                    damageEffectiveness,
                  )}`}
                >
                  {damageEffectivenessToText(damageEffectiveness)}
                </b>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

const MoveTag = ({ move }: { move: Move }) => (
  <PokemonTypeTag
    typeName={move.type.name as PokemonType}
    displayName={move.name.replaceAll("-", " ")}
  />
);

const PokemonAvatar = ({ pokemon }: { pokemon: Pokemon }) => {
  const { name, sprites } = pokemon;
  return (
    <span className="d-flex align-items-center">
      <Image
        width={32}
        height={32}
        src={sprites.front_default ?? sprites.front_shiny ?? ""}
        alt={name}
        className="me-1"
      />

      <p className="mb-0">{capitalizeFirstLetter(name)}</p>
    </span>
  );
};

const damageEffectivenessToText = (
  damageEffectiveness: Exclude<DamageEffectiveness, "normal">,
) => {
  switch (damageEffectiveness) {
    case "immune":
      return "It's... immune!";
    case "not-very":
      return "It's... not very effective!";
    case "very":
      return "It's super effective!!!";
  }
};

const damageEffectivenessToColor = (
  damageEffectiveness: Exclude<DamageEffectiveness, "normal">,
) => {
  switch (damageEffectiveness) {
    case "immune":
      return "text-danger";
    case "not-very":
      // ! Bootstrap warning color doesn't have enough contrast
      return styles["text-warning"];
    case "very":
      return "text-success";
  }
};
