"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { PokeBall } from "./PokeBall";

export const CustomNavbar = () => {
  const pathName = usePathname();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/">
          <PokeBall className="me-2" />
          PokeStats
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto" activeKey={pathName}>
            {routeList.map(({ route, displayName }) => (
              <Nav.Link key={route} as={Link} href={route}>
                {displayName}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

type PossibleRoute = ComponentProps<typeof Link>["href"];
const routeList = [
  { route: "/", displayName: "Home" },
  { route: "/pokedex", displayName: "Pokedex" },
  { route: "/simulator", displayName: "Battle Simulator" },
  { route: "/statistics", displayName: "Statistics" },
] satisfies { route: PossibleRoute; displayName: string }[];
