"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNode } from "react";
import { Container } from "react-bootstrap";

interface Props {
  className?: string;
  children: ReactNode;
}

export const PageLayout = ({ className, children }: Props) => {
  return (
    <main
      className={`d-flex align-items-center justify-content-center ${
        className ?? ""
      }`}
    >
      <Container>{children}</Container>
    </main>
  );
};
