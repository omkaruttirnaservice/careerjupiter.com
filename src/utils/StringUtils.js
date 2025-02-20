export const toPascalCase = (str) => {
  return str
    .replace(/[_\s-]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^(.)/, (match) => match.toUpperCase());
};
