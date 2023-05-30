'use client';
import { getPokemonByName } from '@/utils/pokemon';
import React from 'react';
import { Button } from "react-bootstrap";
import { useState } from "react";
import SearchBar from '@/components/SearchBar';

export default function Pokedex() {
  return (
    <div>
      <h1>Pokedex!</h1>
      <SearchBar></SearchBar>
    </div>
  );
}
