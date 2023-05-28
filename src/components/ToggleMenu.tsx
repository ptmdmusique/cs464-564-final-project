import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import 'src/app/statistics/statistics.css';

// const regions = {
//   kanto: 151,
//   johto: 251,
//   hoenn: 386,
//   sinnoh: 493,
//   unova: 649,
//   kalos: 721,
//   alola: 809,
//   galar: 905,
//   paldea: 1010,
// };

interface ToggleMenuProps {
  handleSwitch: (id: string) => void;
}

export const ToggleMenu = ({ handleSwitch }: ToggleMenuProps) => {
  const regions = [
    'kanto',
    'johto',
    'hoenn',
    'sinnoh',
    'unova',
    'kalos',
    'alola',
    'galar',
    'paldea',
  ];
  const settings = ['lbs'];

  return (
    <div className="regions-container border rounded w-50 mx-auto mb-4 mt-3">
      <Form className="p-3">
        <h4 className="text-center">Regions</h4>
        <div className="regions">
          {regions.map((region) => (
            <Form.Check
              type="switch"
              label={region}
              id={region}
              key={region}
              className="me-2 pt-1"
              onChange={() => handleSwitch(region)}
            />
          ))}
        </div>
      </Form>
    </div>
  );
};
