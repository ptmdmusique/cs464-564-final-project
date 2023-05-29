"use client";

import { PageLayout } from "@/components/PageLayout";
import { BattleResult } from "@/data/battle";
import dynamic from "next/dynamic";
import { useState } from "react";
const PokemonBattleView = dynamic(() => import("@/views/PokemonBattleView"), {
  ssr: false,
});

const SimulatorPage = () => {
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [isBattling, setIsBattling] = useState(false);

  return (
    <PageLayout className="pb-4">
      <h1 className="text-center my-4">Battle Simulator ⚔️</h1>

      <PokemonBattleView
        onBattleResultChange={setBattleResult}
        onIsBattlingChange={setIsBattling}
      />
    </PageLayout>
  );
};

export default SimulatorPage;
