"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import style from "./PageLayout.module.css";

interface Props {
  className?: string;
  children: ReactNode;
}

export const PageLayout = ({ className, children }: Props) => {
  return (
    <main className={`${style["page-layout"]} ${className ?? ""}`}>
      <Container>{children}</Container>
    </main>
  );
};
