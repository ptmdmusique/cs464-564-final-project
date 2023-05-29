"use client";

import { BattleResultCard } from "@/components/BattleResultCard";
import { PageLayout } from "@/components/PageLayout";
import { BattleResult } from "@/data/battle";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
const PokemonBattleView = dynamic(() => import("@/views/PokemonBattleView"), {
  ssr: false,
});

const SimulatorPage = () => {
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [isBattling, setIsBattling] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isBattling) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isBattling]);

  return (
    <PageLayout className="pb-4">
      <h1 className="text-center my-4">Battle Simulator ⚔️</h1>

      <PokemonBattleView
        onBattleResultChange={setBattleResult}
        onIsBattlingChange={setIsBattling}
      />

      <Row className="mt-4 gx-0" ref={resultRef}>
        <BattleResultCard battleResult={battleResult} isBattling={isBattling} />
      </Row>
    </PageLayout>
  );
};

export default SimulatorPage;
