export function toPascalCase(str) {
  if (!str) return ""; // Handle undefined or null input
  return str.replace(
    /\w+/g,
    (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()
  );
}
