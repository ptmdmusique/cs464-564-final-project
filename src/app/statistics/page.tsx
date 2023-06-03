"use client";
import { BarChart } from "@/components/BarChart";
import { DoughnutChart } from "@/components/DoughnutChart";
import { BodyShape, PokemonTable } from "@/components/PokemonTable";
import { StatsMenu } from "@/components/StatsMenu";
import { ToggleMenu } from "@/components/ToggleMenu";
import { chartType } from "@/data/chart-type";
import { regionList } from "@/data/region";
import { getPokemonData, sortById } from "@/utils/functional";
import { MAX_POKEMON_ID, getPokemonById } from "@/utils/pokemon";
import {
  getFastest,
  getHeaviest,
  getLightest,
  getShape,
  getShortest,
  getSlowest,
  getTallest,
} from "@/utils/pokemon-stat";
import { getPokemonFromRegion } from "@/utils/region";
import { Pokemon, PokemonShape } from "pokenode-ts";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "src/app/statistics/statistics.css";

export interface DoughnutData {
  id: number;
  name: string;
  sprite: string | null | undefined;
}

const StatisticsPage = () => {
  type ChartType = (typeof chartType)[number];
  type Region = (typeof regionList)[number];
  type RegionToggle = Record<Region, boolean>;
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonShapes, setPokemonShapes] = useState<PokemonShape[]>([]);
  const [currentChart, setCurrentChart] = useState<ChartType>(
    chartType["Heaviest"],
  );
  const [doughnutData, setDoughnutData] = useState<DoughnutData[]>([]);
  const [bodyType, setBodyType] = useState<string>("");
  const [filterRegion, setFilterRegion] = useState<RegionToggle>(
    regionList.reduce<RegionToggle>((accumulator, current) => {
      accumulator[current] = false;
      return accumulator;
    }, {} as RegionToggle),
  );

  useEffect(() => {
    const promises: Promise<Pokemon>[] = [];
    for (let i = 1; i <= MAX_POKEMON_ID; i++) {
      promises.push(getPokemonById(i));
    }

    Promise.all(promises).then(setPokemonList);
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
          ...getPokemonFromRegion(
            pokemonList,
            region as keyof typeof filterRegion,
          ),
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
  const handleStatsMenuClick = (stat: ChartType) => {
    setCurrentChart(stat);
  };

  //Render the correct chart based on menu Click
  const renderChartComponent = () => {
    let data = getHeaviest(filterByRegion(pokemonList));
    switch (currentChart.tag) {
      case "Heaviest": {
        data = getHeaviest(filterByRegion(pokemonList));
        break;
      }
      case "Lightest": {
        data = getLightest(filterByRegion(pokemonList));
        break;
      }
      case "Tallest": {
        data = getTallest(filterByRegion(pokemonList));
        break;
      }
      case "Shortest": {
        data = getShortest(filterByRegion(pokemonList));
        break;
      }
      case "Fastest": {
        data = getFastest(filterByRegion(pokemonList));
        break;
      }
      case "Slowest": {
        data = getSlowest(filterByRegion(pokemonList));
        break;
      }
      case "Shape": {
        data = getShape(pokemonShapes);
        break;
      }
    }
    if (currentChart.type === "bar") {
      return (
        <>
          <BarChart
            dataset={data}
            title={currentChart.title}
            label={currentChart.label}
            units={currentChart.units}
          />
          <ToggleMenu handleSwitch={handleSwitch} />
        </>
      );
    } else if (currentChart.type === "Doughnut") {
      return (
        <>
          <DoughnutChart
            dataset={data}
            title={currentChart.title}
            label={currentChart.label}
            handleClick={handleDoughnutChartClick}
          />
          <BodyShape bodyType={bodyType} />
          <PokemonTable data={doughnutData} />
        </>
      );
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
