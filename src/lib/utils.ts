import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToGMT545(usDateString: Date | string) {
  // Create a Date object from the US time zone date string
  const usDate = new Date(usDateString);

  // Calculate the time difference for GMT+5:45
  const gmt545Offset = 5 * 60 * 60 * 1000 + 45 * 60 * 1000;

  // Calculate the equivalent time in GMT+5:45
  const gmt545Date = new Date(usDate.getTime() + gmt545Offset);

  // Convert the GMT+5:45 date back to a string in the desired format (YYYY-MM-DD)
  const gmt545DateString = gmt545Date.toISOString().split("T")[0];

  return gmt545DateString;
}

export const itemIsInLocalStorage = () =>
  JSON.parse(localStorage.getItem("holidays") || "[]").length > 0
    ? true
    : false;

export const getItemsIfAlreadyPresent = () => {
  const selectedDates = JSON.parse(
    localStorage.getItem("holidays") || "[]"
  ).map((holiday: { date: string | number | Date }) => new Date(holiday.date));
  return selectedDates;
};
