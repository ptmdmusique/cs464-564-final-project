import React from 'react';
import { Form } from 'react-bootstrap';
import 'src/app/statistics/statistics.css';

interface ToggleMenuProps {
  handleSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

  return (
    <div className="regions-container border rounded w-50 mx-auto mb-4 mt-3">
      <Form className="p-3">
        <h3 className="text-center">Regions</h3>
        <div className="regions">
          {regions.map((region) => (
            <Form.Check
              type="switch"
              label={region}
              id={region}
              key={region}
              className="me-2 pt-1"
              onChange={(event) => handleSwitch(event)}
            />
          ))}
        </div>
      </Form>
    </div>
  );
};
