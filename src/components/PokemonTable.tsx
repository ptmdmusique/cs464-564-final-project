import React from 'react';
import Table from 'react-bootstrap/Table';
import { DoughnutData } from '@/app/statistics/page';
import 'src/app/statistics/statistics.css';
import { Col, Row } from 'react-bootstrap';

interface PokemonTableProps {
  data: DoughnutData[];
}

export const PokemonTable = ({ data }: PokemonTableProps) => {
  if (data.length === 0) return null;

  return (
    <Table striped bordered hover className="pokemon-table w-50 mx-auto">
      <thead>
        <tr>
          <th>#</th>
          <th>Sprite</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td
              className="text-center"
              onClick={() =>
                (window.location.href = `http://localhost:3000//pokedex?pokemon=${item.id}`)
              }
            >
              {item.id}
            </td>
            <td>
              <img
                src={item.sprite ?? ''}
                alt="Pokemon sprite"
                className="pokemon-table-img"
                onClick={() =>
                  (window.location.href = `http://localhost:3000//pokedex?pokemon=${item.id}`)
                }
              />
            </td>
            <td
              className="text-center"
              onClick={() =>
                (window.location.href = `http://localhost:3000//pokedex?pokemon=${item.id}`)
              }
            >
              {item.name}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
interface BodyShapeProps {
  bodyType: string;
}
export const BodyShape = ({ bodyType }: BodyShapeProps) => {
  const shapeUrl = {
    ball: '../images/ball.png',
    squiggle: '../images/squiggle.png',
    fish: '../images/fish.png',
    arms: '../images/arms.png',
    blob: '../images/blob.png',
    upright: '../images/upright.png',
    legs: '../images/legs.png',
    quadruped: '../images/quadruped.png',
    wings: '../images/wings.png',
    tentacles: '../images/tentacles.png',
    heads: '../images/heads.png',
    humanoid: '../images/humanoid.png',
    'bug-wings': '../images/bug-wings.png',
    armor: '../images/armor.png',
  };
  const shapeDescriptions = {
    ball: 'Pokemon consisting of only a head',
    squiggle: 'Pokemon with a serpentine body',
    fish: 'Pokemon with fins',
    arms: 'Pokemon consisting of a head and arms',
    blob: 'Pokemon consisiting of a head and a base',
    upright: 'Pokemon with a bipedal, tailed form',
    legs: 'Pokemon consisting of a head and legs',
    quadruped: 'Pokemon with a quadruped body',
    wings: 'Pokemon with a single pair of wings',
    tentacles: 'Pokemon with tentacles or a multiped body',
    heads: 'Pokemon consisting of multiple bodies',
    humanoid: 'Pokemon with a bipedal, tailless form',
    'bug-wings': 'Pokemon with two or more pairs of wings',
    armor: 'Pokemon with an insectoid body',
  };

  if (bodyType === '') {
    return null;
  }

  return (
    <Row className="shape-outline w-50 mx-auto p-4">
      <Col xs={12} md={3}>
        <img
          src={shapeUrl[bodyType as keyof typeof shapeUrl]}
          alt="Shape outline"
          className="outline-img"
        ></img>
      </Col>
      <Col xs={12} md={9} className="m-auto ps-5">
        <p className="fw-bold">{shapeDescriptions[bodyType as keyof typeof shapeDescriptions]}</p>
      </Col>
    </Row>
  );
};
