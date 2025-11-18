import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateYearsAndMonths(startDate: Date, endDate: Date = new Date()) {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
}

export function getGolferAge() {
  const startDate = new Date(1995, 2, 18); // March 18, 1995 (month is 0-indexed, so 2 = March)
  return calculateYearsAndMonths(startDate);
}
