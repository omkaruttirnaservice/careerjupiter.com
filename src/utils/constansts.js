export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const OPTIONS_ENUMS = {
  OPTION_A: "A",
  OPTION_B: "B",
  OPTION_C: "C",
  OPTION_D: "D",
  OPTION_E: "E",
};


export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const EDUCATION_LIST = [
  "HSC",
  "SSC",
  "Diploma",
  "Pharmacy",
  "UG",
  "PG",
  "Other",
];

export const capitalize = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
