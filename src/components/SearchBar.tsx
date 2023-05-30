'use client';
import { getPokemonByName } from '@/utils/pokemon';
import React from 'react';
import { Button } from "react-bootstrap";
import { useState } from "react";

export default function Search() {
  const [inputVal, setInputVal] = useState('');
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      getPokemonData(inputVal);
    }
  };

  return (
    <div>
      <input 
        type='text' 
        id='search' 
        name='search' 
        placeholder='Search for a pokémon...'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button
            variant="outline-primary"
            onClick={() => getPokemonData(inputVal)}
          >
            Search
      </Button>
    </div>
  );
}

async function getPokemonData(name:string) {
  console.log("Fetching data for: ", name);
  await getPokemonByName(name).then((data) => {
    console.log(data);
  });
}