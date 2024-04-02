import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupPickerString(input: string): { name: string }[] {
  const lines = input.split("\n");

  const parsedNames = lines.map((name) => ({ name }));

  return parsedNames.flat();
}

export function SplitString(input: string): string[] {
  return input.split(/\r?\n/).filter(String);
}

export function Capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
