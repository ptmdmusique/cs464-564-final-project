"use client";

import { PossibleRoute } from "@/data/route";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// https://github.com/vercel/next.js/discussions/47583#discussioncomment-5666720
export const useQueryParams = <T = {}>() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries()) as Partial<T>;
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  function setQueryParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value));
    });

    const search = urlSearchParams.toString();
    const query = search ? (`?${search}` as const) : null;

    if (query) {
      // @ts-expect-error --- Next JS strict typed route is still in beta so this is a workaround
      router.replace(`${pathname as PossibleRoute}${query}`);
    }
  }

  return { queryParams, setQueryParams };
};
