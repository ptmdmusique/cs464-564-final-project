'use client';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';

interface StatsMenuProps {
  menuItems: { title: string; chartName: string }[];
  handleClick: (stat: string) => void;
}
export const StatsMenu = ({ handleClick, menuItems }: StatsMenuProps) => {
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
