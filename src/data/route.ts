import Link from "next/link";
import { ComponentProps } from "react";

export type PossibleRoute = ComponentProps<typeof Link>["href"];
