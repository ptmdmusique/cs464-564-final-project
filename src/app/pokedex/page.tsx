'use client';
import React from 'react';
import { Button } from "react-bootstrap";
import { useState } from "react";
import dynamic from "next/dynamic";
const PokemonInfoView = dynamic(() => import("@/views/PokemonInfoView"), {
  ssr: false,
});

export default function Pokedex() {
  return (
    <div>
      <PokemonInfoView/>
    </div>
  );
}
