"use client";

import { CompactBattleCard } from "@/components/CompactBattleCard";
import { CompactPokemonInfoCard } from "@/components/CompactPokemonInfoCard";
import { FunFactCard } from "@/components/FunFactCard";
import { PageLayout } from "@/components/PageLayout";
import { PokeBall } from "@/components/PokeBall";
import { Col, Row } from "react-bootstrap";

export default function Home() {
  return (
    <PageLayout>
      <h1 className="mt-4 text-center">
        <PokeBall className="me-2" />
        Welcome to PokeStats
        <PokeBall className="ms-2" />
      </h1>

      <Row>
        <Col xs={12} md={6}>
          <Row className="gx-0">
            <FunFactCard />
          </Row>

          <Row className="mt-3 gx-0">
            <CompactBattleCard />
          </Row>
        </Col>

        <Col className="mt-3 mt-md-0">
          <Row className="gx-0">
            <CompactPokemonInfoCard />
          </Row>
        </Col>
      </Row>
    </PageLayout>
  );
}
