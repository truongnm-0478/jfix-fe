export const capitalizeFirstLetter = (text: string): string => {
  if (!text || text.length === 0) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizeAll = (text: string): string => {
  if (!text) return text;
  return text.toUpperCase();
};

export const lowercaseAll = (text: string): string => {
  if (!text) return text;
  return text.toLowerCase();
};

export const capitalizeEachWord = (text: string): string => {
  if (!text) return text;
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};