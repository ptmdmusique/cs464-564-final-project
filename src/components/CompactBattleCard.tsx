"use client";

import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export const CompactBattleCard = () => {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Battle simulation!</Card.Title>

          <Card.Text>
            <Row className="gx-0">
              <Col xs={12} md={5} className="text-center">
                Pokemon 1
              </Col>

              <Col xs={12} md={2} className="text-center">
                VS
              </Col>

              <Col xs={12} md={5} className="text-center">
                Pokemon 2
              </Col>
            </Row>
          </Card.Text>

          {/* // TODO redirect the user to the battle page with the 2 pokemon here */}
          <div className="text-center">
            <Button variant="outline-primary">Battle!</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
