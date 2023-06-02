'use client';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { chartType } from '@/data/chart-type';

type ChartType = (typeof chartType)[number];

interface StatsMenuProps {
  handleClick: (stat: ChartType) => void;
}
export const StatsMenu = ({ handleClick }: StatsMenuProps) => {
  const [selected, setSelected] = useState(0);

  return (
    <aside>
      <Container>
        <ListGroup>
          {Object.keys(chartType).map((chart, index) => (
            <ListGroup.Item as="li" key={index} className={selected === index ? 'active' : ''}>
              <Button
                className={
                  selected === index
                    ? 'text-white bg-transparent text-dark w-100 menu-btn'
                    : 'bg-transparent text-dark w-100 menu-btn'
                }
                onClick={() => {
                  setSelected(index);
                  handleClick(chartType[chart]);
                }}
              >
                {chartType[chart].title}
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </aside>
  );
};
