'use client';
import 'src/app/statistics/statistics.css';

import { getPokemon } from '@/utils/pokemon';
// import { HeaviestChart } from '@/components/HeaviestChart';
import { BarChart } from '@/components/BarChart';
import { useEffect, useState } from 'react';
import { Pokemon } from 'pokenode-ts';
import { StatsMenu } from '@/components/StatsMenu';
import { Row, Col } from 'react-bootstrap';
import { getHeaviest, getLightest, getTallest, getShortest } from '@/utils/functional';

//TODO: change this to 1000 once done testing
const MAX_POKEMON = 10;

const StatisticsPage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [chartComponent, setChartComponent] = useState<JSX.Element>();
  const menuItems = [
    { title: 'Top 10 Heaviest', chartName: 'Heaviest' },
    { title: 'Top 10 Lightest', chartName: 'Lightest' },
    { title: 'Top 10 Tallest', chartName: 'Tallest' },
    { title: 'Top 10 Shortest', chartName: 'Shortest' },
  ];

  useEffect(() => {
    for (let i = 1; i < MAX_POKEMON; i++) {
      getPokemon(i).then((res) => {
        setPokemonList((pokemonList) => [...pokemonList, res]);
      });
    }
  }, []);
  let data = getHeaviest(pokemonList);
  const handleClick = (stat: string) => {
    switch (stat) {
      case 'Heaviest': {
        // setSortedPokemon(getHeaviest(pokemonList))
        data = getHeaviest(pokemonList);
        setChartComponent(
          <BarChart
            id={data.id}
            title={'Top 10 Heaviest Pokemon'}
            label={'Weight'}
            labels={data.labels}
            sortedData={data.data}
            units={'lb'}
          />
        );
        break;
      }
      case 'Lightest': {
        data = getLightest(pokemonList);
        setChartComponent(
          <BarChart
            id={data.id}
            title={'Top 10 Lightest Pokemon'}
            label={'Weight'}
            labels={data.labels}
            sortedData={data.data}
            units={'lb'}
          />
        );
        break;
      }
      case 'Tallest': {
        data = getTallest(pokemonList);
        setChartComponent(
          <BarChart
            id={data.id}
            title={'Top 10 Tallest Pokemon'}
            label={'Height'}
            labels={data.labels}
            sortedData={data.data}
            units={'ft'}
          />
        );
        break;
      }
      case 'Shortest': {
        data = getShortest(pokemonList);
        setChartComponent(
          <BarChart
            id={data.id}
            title={'Top 10 Shortest Pokemon'}
            label={'Height'}
            labels={data.labels}
            sortedData={data.data}
            units={'ft'}
          />
        );
        break;
      }
    }
  };

  return (
    <main>
      <Row>
        <Col xs={12} md={3}>
          <StatsMenu handleClick={handleClick} menuItems={menuItems} />
        </Col>
        <Col xs={12} md={9} className="ps-5">
          <h1 className="text-center">Statistics Page</h1>
          {chartComponent !== undefined ? (
            chartComponent
          ) : (
            <BarChart
              id={data.id}
              title={'Top 10 Heaviest Pokemon'}
              label={'Weight'}
              labels={data.labels}
              sortedData={data.data}
              units={'lb'}
            />
          )}
        </Col>
      </Row>
    </main>
  );
};

export default StatisticsPage;
