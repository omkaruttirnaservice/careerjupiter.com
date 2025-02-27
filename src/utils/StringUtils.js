export const toPascalCase = (str) => {
  if (!str) return null;
  return str
    .replace(/[_\s-]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^(.)/, (match) => match.toUpperCase());
};
