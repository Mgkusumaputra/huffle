import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupPickerString(
  input: string
): { name: string; representative: boolean }[] {
  const lines = input.split("\n");

  const parsedNames = lines.map((name) => ({ name, representative: false }));

  return parsedNames.flat();
}

export function SplitString(input: string): string[] {
  return input.split(/\r?\n/).filter(String);
}
