'use client';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';

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
  // menuItems: { title: string; chartName: string }[];
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
              onClick={() => {
                setSelected(index);
                handleClick(chart.chartName);
              }}
              className={selected === index ? 'active' : ''}
            >
              {chart.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </aside>
  );
};
