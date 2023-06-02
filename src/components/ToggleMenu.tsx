import React from 'react';
import { Form } from 'react-bootstrap';
import { regionList } from '@/data/region';
import 'src/app/statistics/statistics.css';
import { capitalizeFirstLetter } from '@/utils/functional';

interface ToggleMenuProps {
  handleSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToggleMenu = ({ handleSwitch }: ToggleMenuProps) => {
  return (
    <div className="border rounded w-75 mx-auto mb-4 mt-3">
      <h3 className="text-center">Regions</h3>
      <Form className="d-flex flex-wrap ustify-content-evenly p-3">
        {regionList.map((region) => (
          <Form.Check
            type="switch"
            label={capitalizeFirstLetter(region)}
            id={region}
            key={region}
            className="region me-2 pt-1"
            onChange={(event) => handleSwitch(event)}
          />
        ))}
      </Form>
    </div>
  );
};
