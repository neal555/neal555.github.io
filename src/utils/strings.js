export const resizeString = (str = "NO_STRING", length = 20) => {
  return str.length > length ? str.substring(0, length) + "…" : str;
};
