"use client";

import { funFactList } from "@/data/fun-fact";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";

export const FunFactCard = () => {
  const [factIndex, setFactIndex] = useState(getRandomIndex());

  return (
    <Card>
      <Card.Body>
        <Card.Title>Fun Fact!</Card.Title>

        <Card.Text>{funFactList[factIndex]}</Card.Text>

        <div className="text-center">
          <Button
            variant="outline-primary"
            onClick={() => setFactIndex(getRandomIndex())}
          >
            Next Fact!
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const getRandomIndex = () => Math.floor(Math.random() * funFactList.length);
