'use client';
import 'src/app/statistics/statistics.css';
import { getPokemon, getPokemonShapes } from '@/utils/pokemon';
import { BarChart } from '@/components/BarChart';
import { DoughnutChart } from '@/components/DoughnutChart';
import { useEffect, useState } from 'react';
import { Pokemon, PokemonShape } from 'pokenode-ts';
import { StatsMenu } from '@/components/StatsMenu';
import { Row, Col } from 'react-bootstrap';
import {
  getHeaviest,
  getLightest,
  getTallest,
  getShortest,
  getFastest,
  getSlowest,
  getShape,
} from '@/utils/functional';
import { ToggleMenu } from '@/components/ToggleMenu';

//TODO: change this to 1000 once done testing
const MAX_POKEMON = 20;
const MAX_SHAPES = 14;

// export interface Regions {
//   kanto: boolean;
//   johto: boolean;
//   hoenn: boolean;
//   sinnoh: boolean;
//   unova: boolean;
//   kalos: boolean;
//   alola: boolean;
//   galar: boolean;
//   paldea: boolean;
// }
// const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
// const [kanto, setKanto] = useState<boolean>(true);
// const [johto, setJohto] = useState<boolean>(true);
// const [hoenn, setHoenn] = useState<boolean>(false);
// const [sinnoh, setSinnoh] = useState<boolean>(false);
// const [unova, setUnova] = useState<boolean>(false);
// const [kalos, setKalos] = useState<boolean>(false);
// const [alola, setAlola] = useState<boolean>(false);
// const [galar, setGalar] = useState<boolean>(false);
// const [paldea, setPaldea] = useState<boolean>(false);

const StatisticsPage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonShapes, setPokemonShapes] = useState<PokemonShape[]>([]);
  const [chartComponent, setChartComponent] = useState<JSX.Element>();

  useEffect(() => {
    console.log('API CALL');
    for (let i = 1; i <= MAX_POKEMON; i++) {
      getPokemon(i).then((res) => {
        setPokemonList((pokemonList) => [...pokemonList, res]);
      });
    }

    for (let i = 1; i <= MAX_SHAPES; i++) {
      getPokemonShapes(i).then((res) => {
        setPokemonShapes((pokemonShapes) => [...pokemonShapes, res]);
      });
    }
  }, []);
  let data = getHeaviest(pokemonList);

  const handleClick = (stat: string) => {
    switch (stat) {
      case 'Heaviest': {
        data = getHeaviest(pokemonList);
        setChartComponent(
          <BarChart
            dataset={data}
            title={'Top 10 Heaviest Pokemon'}
            label={'Weight'}
            units={'lb'}
          />
        );
        break;
      }
      case 'Lightest': {
        data = getLightest(pokemonList);
        setChartComponent(
          <BarChart
            dataset={data}
            title={'Top 10 Lightest Pokemon'}
            label={'Weight'}
            units={'lb'}
          />
        );
        break;
      }
      case 'Tallest': {
        data = getTallest(pokemonList);
        setChartComponent(
          <BarChart dataset={data} title={'Top 10 Tallest Pokemon'} label={'Height'} units={'ft'} />
        );
        break;
      }
      case 'Shortest': {
        data = getShortest(pokemonList);
        setChartComponent(
          <BarChart
            dataset={data}
            title={'Top 10 Shortest Pokemon'}
            label={'Height'}
            units={'ft'}
          />
        );
        break;
      }
      case 'Fastest': {
        data = getFastest(pokemonList);
        setChartComponent(
          <BarChart dataset={data} title={'Top 10 Fastest Pokemon'} label={'Speed'} units={'ft'} />
        );
        break;
      }
      case 'Slowest': {
        data = getSlowest(pokemonList);
        setChartComponent(
          <BarChart dataset={data} title={'Top 10 Slowest Pokemon'} label={'Speed'} units={'ft'} />
        );
        break;
      }
      case 'Shape': {
        data = getShape(pokemonShapes);
        setChartComponent(
          <DoughnutChart
            dataset={data}
            title={'Pokemon by Body Shape'}
            label={'Body Shape'}
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
          <StatsMenu handleClick={handleClick} />
        </Col>
        <Col xs={12} md={9} className="ps-5">
          <h1 className="text-center">Statistics Page</h1>
          {chartComponent !== undefined ? (
            chartComponent
          ) : (
            <BarChart
              dataset={data}
              title={'Top 10 Heaviest Pokemon'}
              label={'Weight'}
              units={'lb'}
            />
          )}
        </Col>
      </Row>
    </main>
  );
};

export default StatisticsPage;
