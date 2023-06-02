'use client';
import 'src/app/statistics/statistics.css';
import {
  getPokemonShapes,
  getAllPokemonList,
  getPokemonByName,
  getPokemonById,
} from '@/utils/pokemon';
import { regionList } from '@/data/region';
import { BarChart } from '@/components/BarChart';
import { DoughnutChart } from '@/components/DoughnutChart';
import React, { useEffect, useState } from 'react';
import { Pokemon, PokemonShape, Region, Type } from 'pokenode-ts';
import { StatsMenu } from '@/components/StatsMenu';
import { Row, Col } from 'react-bootstrap';
import { sortById, getPokemonData } from '@/utils/functional';
import {
  getHeaviest,
  getLightest,
  getTallest,
  getShortest,
  getFastest,
  getSlowest,
  getShape,
} from '@/utils/pokemon-stat';
import { getPokemonFromRegion } from '@/utils/region';
import { ToggleMenu } from '@/components/ToggleMenu';
import { BodyShape, PokemonTable } from '@/components/PokemonTable';

const MAX_POKEMON = 1010;
const MAX_SHAPES = 14;
export interface DoughnutData {
  id: number;
  name: string;
  sprite: string | null | undefined;
}

const StatisticsPage = () => {
  type Region = (typeof regionList)[number];
  type RegionToggle = Record<Region, boolean>;
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonShapes, setPokemonShapes] = useState<PokemonShape[]>([]);
  const [chartType, setChartType] = useState<string>('Heaviest');
  const [doughnutData, setDoughnutData] = useState<DoughnutData[]>([]);
  const [bodyType, setBodyType] = useState<string>('');
  const [filterRegion, setFilterRegion] = useState<RegionToggle>(
    regionList.reduce<RegionToggle>((accum, current) => {
      accum[current] = false;
      return accum;
    }, {} as RegionToggle)
  );

  useEffect(() => {
    console.log('API CALL');
    // getAllPokemonList().then((res) => {
    //   let results = res.results;
    //   let promises = results.map((result) => {
    //     return getPokemonByName(result.name);
    //   });
    //   Promise.all(promises).then((res) => {
    //     setPokemonList(res);
    //   });
    // });
    for (let i = 1; i <= MAX_POKEMON; i++) {
      getPokemonById(i).then((res) => {
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
  const filterByRegion = (pokemonList: Pokemon[]) => {
    let filteredPokemonList: Pokemon[] = [];
    for (const region in filterRegion) {
      if (filterRegion[region as keyof typeof filterRegion]) {
        filteredPokemonList = [
          ...filteredPokemonList,
          ...getPokemonFromRegion(pokemonList, region as keyof typeof filterRegion),
        ];
      }
    }

    if (filteredPokemonList.length !== 0) return filteredPokemonList;
    else return pokemonList;
  };

  const handleDoughnutChartClick = (index: number) => {
    const sorted = sortById(pokemonList);
    setBodyType(pokemonShapes[index].name);

    //Get the IDs of all Pokemon with the clicked on shape
    const pokemonIDs: number[] = [];
    pokemonShapes[index].pokemon_species.forEach((pokemon) => {
      pokemonIDs.push(+pokemon.url.split(/\//)[6]);
    });

    setDoughnutData(getPokemonData(pokemonList, pokemonIDs));
  };

  //Update the current chart on display based on side menu click
  const handleStatsMenuClick = (stat: string) => {
    setChartType(stat);
  };

  //Render the correct chart based on menu Click
  const renderChartComponent = () => {
    switch (chartType) {
      case 'Heaviest': {
        const data = getHeaviest(filterByRegion(pokemonList));
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
        const data = getLightest(filterByRegion(pokemonList));
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
        const data = getTallest(filterByRegion(pokemonList));
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
        const data = getShortest(filterByRegion(pokemonList));
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
        const data = getFastest(filterByRegion(pokemonList));
        return (
          <>
            <BarChart
              dataset={data}
              title={'Top 10 Fastest Pokemon'}
              label={'Speed'}
              units={'pts'}
            />
            <ToggleMenu handleSwitch={handleSwitch} />
          </>
        );
      }
      case 'Slowest': {
        const data = getSlowest(filterByRegion(pokemonList));
        return (
          <>
            <BarChart
              dataset={data}
              title={'Top 10 Slowest Pokemon'}
              label={'Speed'}
              units={'pts'}
            />
            <ToggleMenu handleSwitch={handleSwitch} />
          </>
        );
      }
      case 'Shape': {
        const data = getShape(pokemonShapes);
        return (
          <>
            <DoughnutChart
              dataset={data}
              title={'Pokemon by Body Shape'}
              label={'Body Shape'}
              handleClick={handleDoughnutChartClick}
            />
            <BodyShape bodyType={bodyType} />
            <PokemonTable data={doughnutData} />
          </>
        );
      }
    }
  };

  return (
    <main>
      <Row className="my-4 mb-lg-0">
        <Col xs={12} md={3}>
          <StatsMenu handleClick={handleStatsMenuClick} />
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
