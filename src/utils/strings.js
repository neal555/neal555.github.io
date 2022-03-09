export const resizeString = (str, length = 20) => {
  return str.length > length ? str.substring(0, length) + "…" : str;
};
