import { ReactNode } from "react";
import style from "./PageLayout.module.css";

interface Props {
  className?: string;
  children: ReactNode;
}

export const PageLayout = ({ className, children }: Props) => {
  return (
    <main className={`${style["page-layout"]} ${className ?? ""}`}>
      <div className={style["inner-container"]}>{children}</div>
    </main>
  );
};
