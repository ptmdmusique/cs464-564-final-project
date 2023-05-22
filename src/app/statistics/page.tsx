'use client';
import { getPokemon } from '@/utils/pokemon';
import { HeaviestChart } from '@/components/HeaviestChart';
import { LightestChart } from '@/components/LightestChart';
import { useEffect, useState } from 'react';
import { Pokemon } from 'pokenode-ts';
import { StatsMenu } from '@/components/StatsMenu';
import { Row, Col, Container } from 'react-bootstrap';

//TODO: change this to 1000 once done testing
const MAX_POKEMON = 50;

const StatisticsPage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [chartComponent, setChartComponent] = useState<JSX.Element>();
  const menuItems = [
    { title: 'Top 10 Heaviest', chartName: 'Heaviest' },
    { title: 'Top 10 Lightest', chartName: 'Lightest' },
    { title: 'Chart 3', chartName: 'Chart 3' },
    { title: 'Chart 4', chartName: 'Chart 4' },
  ];

  useEffect(() => {
    for (let i = 1; i < MAX_POKEMON; i++) {
      getPokemon(i).then((res) => {
        setPokemonList((pokemonList) => [...pokemonList, res]);
      });
    }
  }, []);

  const handleClick = (stat: string) => {
    switch (stat) {
      case 'Heaviest': {
        setChartComponent(<HeaviestChart pokemonList={pokemonList} />);
        break;
      }
      case 'Lightest': {
        setChartComponent(<LightestChart />);
        break;
      }
    }
  };

  return (
    <Row>
      <Col>
        <StatsMenu handleClick={handleClick} menuItems={menuItems} />
      </Col>
      <Col xs={9}>
        <main className="w-75 ps-5">
          <h1 className="text-center">Statistics Page</h1>
          {chartComponent !== undefined ? (
            chartComponent
          ) : (
            <HeaviestChart pokemonList={pokemonList} />
          )}
        </main>
      </Col>
    </Row>
  );
};

export default StatisticsPage;
