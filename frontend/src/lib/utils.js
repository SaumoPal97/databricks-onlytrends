import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const API_URL = import.meta.env.VITE_API_URL;

export const getUnique = (data) =>
  Object.values(
    data.reduce((c, e) => {
      if (!c[e.name]) c[e.name] = e;
      return c;
    }, {})
  );
