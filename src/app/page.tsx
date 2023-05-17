"use client";

import { FunFactCard } from "@/components/FunFactCard";
import { PageLayout } from "@/components/PageLayout";
import { Col, Row } from "react-bootstrap";
import style from "./page.module.css";
import { CompactBattleCard } from "@/components/CompactBattleCard";

export default function Home() {
  return (
    <PageLayout>
      <Row className={style["page-content-container"]}>
        <Col xs={12} md={6}>
          <Row className="gx-0">
            <FunFactCard />
          </Row>

          <Row className={`${style["container-with-margin"]} gx-0`}>
            <CompactBattleCard />
          </Row>
        </Col>

        <Col className={style["pokemon-stat-container"]}>
          <Row className="gx-0">Col 2</Row>
        </Col>
      </Row>
    </PageLayout>
  );
}
