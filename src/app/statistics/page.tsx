'use client';
import 'src/app/statistics/statistics.css';
import { getPokemon, getPokemonShapes } from '@/utils/pokemon';
import { BarChart } from '@/components/BarChart';
import { DoughnutChart } from '@/components/DoughnutChart';
import React, { useEffect, useState } from 'react';
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
  sortById,
  getKanto,
  getJohto,
  getHoenn,
  getSinnoh,
  getUnova,
  getKalos,
  getAlola,
  getGalar,
  getPaldea,
} from '@/utils/functional';
import { ToggleMenu } from '@/components/ToggleMenu';

//TODO: change this to 1010 once done testing
const MAX_POKEMON = 50;
const MAX_SHAPES = 14;

export interface Regions {
  kanto: boolean;
  johto: boolean;
  hoenn: boolean;
  sinnoh: boolean;
  unova: boolean;
  kalos: boolean;
  alola: boolean;
  galar: boolean;
  paldea: boolean;
}

const StatisticsPage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonShapes, setPokemonShapes] = useState<PokemonShape[]>([]);
  const [chartType, setChartType] = useState<string>('Heaviest');
  const [filterRegion, setFilterRegion] = useState<Regions>({
    kanto: false,
    johto: false,
    hoenn: false,
    sinnoh: false,
    unova: false,
    kalos: false,
    alola: false,
    galar: false,
    paldea: false,
  });

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

  //Update region switch state
  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setFilterRegion((prev) => ({ ...prev, [id]: checked }));
  };

  //Filter data by region
  const filterData = (pokemonList: Pokemon[]) => {
    let filteredPokemonList: Pokemon[] = [];
    const sorted = sortById(pokemonList);
    if (filterRegion.kanto) filteredPokemonList = [...filteredPokemonList, ...getKanto(sorted)];
    if (filterRegion.johto) filteredPokemonList = [...filteredPokemonList, ...getJohto(sorted)];
    if (filterRegion.hoenn) filteredPokemonList = [...filteredPokemonList, ...getHoenn(sorted)];
    if (filterRegion.sinnoh) filteredPokemonList = [...filteredPokemonList, ...getSinnoh(sorted)];
    if (filterRegion.unova) filteredPokemonList = [...filteredPokemonList, ...getUnova(sorted)];
    if (filterRegion.kalos) filteredPokemonList = [...filteredPokemonList, ...getKalos(sorted)];
    if (filterRegion.alola) filteredPokemonList = [...filteredPokemonList, ...getAlola(sorted)];
    if (filterRegion.galar) filteredPokemonList = [...filteredPokemonList, ...getGalar(sorted)];
    if (filterRegion.paldea) filteredPokemonList = [...filteredPokemonList, ...getPaldea(sorted)];

    if (filteredPokemonList.length !== 0) return filteredPokemonList;
    else return pokemonList;
  };

  //Update the current chart on display based on side menu click
  const handleClick = (stat: string, filteredPokemonList?: Pokemon[]) => {
    switch (stat) {
      case 'Heaviest': {
        setChartType('Heaviest');
        break;
      }
      case 'Lightest': {
        setChartType('Lightest');
        break;
      }
      case 'Tallest': {
        setChartType('Tallest');
        break;
      }
      case 'Shortest': {
        setChartType('Shortest');
        break;
      }
      case 'Fastest': {
        setChartType('Fastest');
        break;
      }
      case 'Slowest': {
        setChartType('Slowest');
        break;
      }
      case 'Shape': {
        setChartType('Shape');
        break;
      }
    }
  };

  //Render the correct chart based on menu Click
  const renderChartComponent = () => {
    switch (chartType) {
      case 'Heaviest': {
        const data = getHeaviest(filterData(pokemonList));
        return (
          <>
            <BarChart
              dataset={data}
              title={'Top 10 Heaviest Pokemon'}
              label={'Weight'}
              units={'lb'}
            />
            <ToggleMenu handleSwitch={handleSwitch} />
          </>
        );
      }
      case 'Lightest': {
        const data = getLightest(filterData(pokemonList));
        return (
          <>
            <BarChart
              dataset={data}
              title={'Top 10 Lightest Pokemon'}
              label={'Weight'}
              units={'lb'}
            />
            <ToggleMenu handleSwitch={handleSwitch} />
          </>
        );
      }
      case 'Tallest': {
        const data = getTallest(filterData(pokemonList));
        return (
          <>
            <BarChart
              dataset={data}
              title={'Top 10 Tallest Pokemon'}
              label={'Height'}
              units={'ft'}
            />
            <ToggleMenu handleSwitch={handleSwitch} />
          </>
        );
      }
      case 'Shortest': {
        const data = getShortest(filterData(pokemonList));
        return (
          <>
            <BarChart
              dataset={data}
              title={'Top 10 Shortest Pokemon'}
              label={'Height'}
              units={'ft'}
            />
            <ToggleMenu handleSwitch={handleSwitch} />
          </>
        );
      }
      case 'Fastest': {
        const data = getFastest(filterData(pokemonList));
        return (
          <>
            <BarChart
              dataset={data}
              title={'Top 10 Fastest Pokemon'}
              label={'Speed'}
              units={'ft'}
            />
            <ToggleMenu handleSwitch={handleSwitch} />
          </>
        );
      }
      case 'Slowest': {
        const data = getSlowest(filterData(pokemonList));
        return (
          <>
            <BarChart
              dataset={data}
              title={'Top 10 Slowest Pokemon'}
              label={'Speed'}
              units={'ft'}
            />
            <ToggleMenu handleSwitch={handleSwitch} />
          </>
        );
      }
      case 'Shape': {
        const data = getShape(pokemonShapes);
        return (
          <DoughnutChart
            dataset={data}
            title={'Pokemon by Body Shape'}
            label={'Body Shape'}
            units={'ft'}
          />
        );
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
          {renderChartComponent()}
        </Col>
      </Row>
    </main>
  );
};

export default StatisticsPage;
