import React from 'react';
import Table from 'react-bootstrap/Table';
import { DoughnutData } from '@/app/statistics/page';
import 'src/app/statistics/statistics.css';
import { Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { bodyShapes } from '@/data/body-type';

type BodyType = keyof typeof bodyShapes;
interface PokemonTableProps {
  data: DoughnutData[];
}

export const PokemonTable = ({ data }: PokemonTableProps) => {
  if (data.length === 0) return null;

  return (
    <Table striped bordered hover className="pokemon-table w-50 mx-auto mt-5">
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
            <td className="text-center">{item.id}</td>
            <td>
              <Image src={item.sprite ?? ''} alt="Pokemon sprite" width={90} height={90} />
            </td>
            <td className="text-center">{item.name}</td>
            <td>
              <Link href={`/pokedex?pokemon=${item.id}`} className="btn btn-outline-primary">
                Find out more
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
interface BodyShapeProps {
  bodyType: BodyType;
}
export const BodyShape = ({ bodyType }: BodyShapeProps) => {
  if (bodyType === '') {
    return null;
  }

  return (
    <Row className="shape-outline mx-auto p-4">
      <Col xs={12} md={3}>
        <Image src={bodyShapes[bodyType].imagePath} alt="Shape outline" width={120} height={120} />
      </Col>
      <Col xs={12} md={9} className="m-auto ps-5 justify-content-end">
        <p className="fw-bold">{bodyShapes[bodyType].description}</p>
      </Col>
    </Row>
  );
};
