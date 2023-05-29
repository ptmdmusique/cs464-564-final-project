import { PageLayout } from "@/components/PageLayout";
import dynamic from "next/dynamic";
const PokemonBattleView = dynamic(() => import("@/views/PokemonBattleView"), {
  ssr: false,
});

const SimulatorPage = () => {
  return (
    <PageLayout className="pb-4">
      <h1 className="text-center my-4">Battle Simulator ⚔️</h1>

      <PokemonBattleView />
    </PageLayout>
  );
};

export default SimulatorPage;
