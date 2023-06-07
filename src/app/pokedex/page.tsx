'use client';
import React from 'react';
import dynamic from "next/dynamic";
const PokemonInfoView = dynamic(() => import("@/views/PokemonInfoView"), {
  ssr: false,
});

export default function Pokedex() {
  return (
    <div>
      <PokemonInfoView />
    </div>
  );
}
