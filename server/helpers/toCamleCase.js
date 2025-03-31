export const toCamelCase = (str) =>
  str
    .trim()
    .toLowerCase()
    .replace(/[-_\s]+(.)/g, (_, char) => char.toUpperCase());
