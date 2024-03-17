import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function groupPickerString(
  input: string
): { name: string; gender: "male" | "female" }[] {
  const lines = input.trim().split("\n");
  return lines.map((line) => {
    const [name, gender] = line
      .trim()
      .split(",")
      .map((part) => part.trim());
    return { name, gender } as { name: string; gender: "male" | "female" };
  });
}
