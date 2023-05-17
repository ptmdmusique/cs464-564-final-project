"use client";

import { funFactList } from "@/data/fun-fact";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import style from "./FunFactCard.module.css";

export const FunFactCard = () => {
  const [factIndex, setFactIndex] = useState(getRandomIndex());

  return (
    <Card className={style["fun-fact-card"]}>
      <Card.Body className={style["card-body"]}>
        <Card.Title>Fun Fact!</Card.Title>

        <Card.Text>{funFactList[factIndex]}</Card.Text>

        <Button
          variant="outline-primary"
          onClick={() => setFactIndex(getRandomIndex())}
          className={style["card-cta"]}
        >
          Next Fact!
        </Button>
      </Card.Body>
    </Card>
  );
};

const getRandomIndex = () => Math.floor(Math.random() * funFactList.length);
