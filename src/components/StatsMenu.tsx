'use client';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const menuItems = [
  { title: 'Top 10 Heaviest', chartName: 'Heaviest' },
  { title: 'Top 10 Lightest', chartName: 'Lightest' },
  { title: 'Top 10 Tallest', chartName: 'Tallest' },
  { title: 'Top 10 Shortest', chartName: 'Shortest' },
  { title: 'Top 10 Fastest', chartName: 'Fastest' },
  { title: 'Top 10 Slowest', chartName: 'Slowest' },
  { title: 'Body Shape Types', chartName: 'Shape' },
];

interface StatsMenuProps {
  handleClick: (stat: string) => void;
}
export const StatsMenu = ({ handleClick }: StatsMenuProps) => {
  const [selected, setSelected] = useState(0);

  return (
    <aside>
      <Container>
        <ListGroup>
          {menuItems.map((chart, index) => (
            <ListGroup.Item
              as="li"
              key={chart.title}
              className={selected === index ? 'active' : ''}
            >
              <Button
                className={
                  selected === index
                    ? 'text-white bg-transparent text-dark w-100 menu-btn'
                    : 'bg-transparent text-dark w-100 menu-btn'
                }
                onClick={() => {
                  setSelected(index);
                  handleClick(chart.chartName);
                }}
              >
                {chart.title}
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </aside>
  );
};
