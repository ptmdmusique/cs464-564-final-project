'use client';
import { BarChart } from '@/components/BarChart';
import { DoughnutChart } from '@/components/DoughnutChart';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PageLayout } from '@/components/PageLayout';
import { BodyShape, PokemonTable } from '@/components/PokemonTable';
import { StatsMenu } from '@/components/StatsMenu';
import { ToggleMenu } from '@/components/ToggleMenu';
import { chartType, ChartType } from '@/data/chart-type';
import { regionList, RegionToggle } from '@/data/region';
import { filterByRegion } from '@/utils/region';
import { getPokemonData } from '@/utils/pokemon';
import {
  MAX_POKEMON_ID,
  MAX_SHAPES,
  MAX_COLORS,
  MAX_HABITATS,
  getPokemonById,
  getPokemonShapes,
  getPokemonColors,
  getPokemonHabitats,
} from '@/utils/pokemon';
import {
  getFastest,
  getHeaviest,
  getLightest,
  getDoughnutAttributeData,
  getShortest,
  getSlowest,
  getTallest,
  sortDoughnutData,
  getHighestHP,
  getHighestAttack,
  getHighestDefense,
} from '@/utils/pokemon-stat';
import { Pokemon, PokemonColor, PokemonHabitat, PokemonShape } from 'pokenode-ts';
import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import 'src/app/statistics/statistics.css';

export interface DoughnutData {
  id: number;
  name: string;
  sprite: string | null | undefined;
}

const StatisticsPage = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonShapes, setPokemonShapes] = useState<PokemonShape[]>([]);
  const [pokemonColors, setPokemonColors] = useState<PokemonColor[]>([]);
  const [pokemonHabitats, setPokemonHabitats] = useState<PokemonHabitat[]>([]);
  const [currentChart, setCurrentChart] = useState<ChartType>(chartType['heaviest']);
  const [doughnutData, setDoughnutData] = useState<DoughnutData[]>([]);
  const [bodyType, setBodyType] = useState<string>('');
  const [filterRegion, setFilterRegion] = useState<RegionToggle>(
    regionList.reduce<RegionToggle>((accumulator, current) => {
      accumulator[current] = false;
      return accumulator;
    }, {} as RegionToggle)
  );

  useEffect(() => {
    // const promises: Promise<Pokemon>[] = [];
    // for (let i = 1; i <= MAX_POKEMON_ID; i++) {
    //   promises.push(getPokemonById(i));
    // }

    // Promise.all(promises).then(setPokemonList);

    //This works with 1010 pokemon without any loading issue except for the graph flickering.
    for (let i = 1; i <= MAX_POKEMON_ID; i++) {
      getPokemonById(i).then((res) => {
        setPokemonList((pokemonList) => [...pokemonList, res]);
      });
    }

    for (let i = 1; i <= MAX_SHAPES; i++) {
      getPokemonShapes(i).then((res) => {
        setPokemonShapes((pokemonShapes) => [...pokemonShapes, res]);
      });
    }

    for (let i = 1; i <= MAX_COLORS; i++) {
      getPokemonColors(i).then((res) => {
        setPokemonColors((pokemonColors) => [...pokemonColors, res]);
      });
    }

    for (let i = 1; i <= MAX_HABITATS; i++) {
      getPokemonHabitats(i).then((res) => {
        setPokemonHabitats((pokemonHabitats) => [...pokemonHabitats, res]);
      });
    }
  }, []);

  useEffect(() => {
    setDoughnutData([]);
  }, [currentChart]);

  //Update region switch state
  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setFilterRegion((prev) => ({ ...prev, [id]: checked }));
  };

  const handleDoughnutChartClick = (index: number) => {
    let pokemonIDs: number[] = [];
    switch (currentChart.tag) {
      case 'shape':
        setBodyType(pokemonShapes[index].name);
        pokemonIDs = sortDoughnutData(index, pokemonShapes);
        break;

      case 'color':
        pokemonIDs = sortDoughnutData(index, pokemonColors);
        break;

      case 'habitat':
        pokemonIDs = sortDoughnutData(index, pokemonHabitats);
        break;
    }

    setDoughnutData(getPokemonData(pokemonList, pokemonIDs));
  };

  //Update the current chart on display based on side menu click
  const handleStatsMenuClick = (stat: ChartType) => {
    setCurrentChart(stat);
  };

  const chartData = useMemo(() => {
    let data = getHeaviest(filterByRegion(pokemonList, filterRegion));
    switch (currentChart.tag) {
      case 'heaviest':
        data = getHeaviest(filterByRegion(pokemonList, filterRegion));
        break;

      case 'lightest':
        data = getLightest(filterByRegion(pokemonList, filterRegion));
        break;

      case 'tallest':
        data = getTallest(filterByRegion(pokemonList, filterRegion));
        break;

      case 'shortest':
        data = getShortest(filterByRegion(pokemonList, filterRegion));
        break;

      case 'fastest':
        data = getFastest(filterByRegion(pokemonList, filterRegion));
        break;

      case 'slowest':
        data = getSlowest(filterByRegion(pokemonList, filterRegion));
        break;

      case 'hp':
        data = getHighestHP(filterByRegion(pokemonList, filterRegion));
        break;

      case 'attack':
        data = getHighestAttack(filterByRegion(pokemonList, filterRegion));
        break;

      case 'defense':
        data = getHighestDefense(filterByRegion(pokemonList, filterRegion));
        break;

      case 'shape':
        data = getDoughnutAttributeData(pokemonShapes);
        break;

      case 'color':
        data = getDoughnutAttributeData(pokemonColors);
        break;

      case 'habitat':
        data = getDoughnutAttributeData(pokemonHabitats);
        break;
    }
    return data;
  }, [currentChart.tag, pokemonList, pokemonShapes, filterRegion, pokemonColors, pokemonHabitats]);

  //Render the correct chart based on menu Click
  const renderChartComponent = () => {
    if (currentChart.type === 'bar') {
      return (
        <>
          <BarChart
            dataset={chartData}
            title={currentChart.title}
            label={currentChart.label}
            units={currentChart.units}
          />
          <ToggleMenu handleSwitch={handleSwitch} />
        </>
      );
    }
    return (
      <>
        <DoughnutChart
          dataset={chartData}
          title={currentChart.title}
          label={currentChart.label}
          handleClick={handleDoughnutChartClick}
        />
        {currentChart.tag === 'shape' && <BodyShape bodyType={bodyType} />}
        <PokemonTable data={doughnutData} />
      </>
    );
  };

  return (
    <PageLayout>
      {pokemonList.length !== 0 ? (
        <Row className="my-4 mb-lg-0">
          <Col xs={12} md={3} className="pt-3 pt-md-0">
            <StatsMenu handleClick={handleStatsMenuClick} />
          </Col>
          <Col xs={12} md={9} className="ps-md-5 pt-5 pt-md-0">
            <h1 className="text-center">Statistics Page</h1>
            {renderChartComponent()}
          </Col>
        </Row>
      ) : (
        <Col>
          <LoadingSpinner />
        </Col>
      )}
    </PageLayout>
  );
};

export default StatisticsPage;
