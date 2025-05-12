export const roundNumber = (value: number, decimalPlaces: number = 2): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
};

export const formatNumberWithCommas = (value: number): string => {
  return value.toLocaleString("en-US");
};

export const formatWithSuffix = (value: number): string => {
  if (value >= 1_000_000_000) return `${roundNumber(value / 1_000_000_000)}B`;
  if (value >= 1_000_000) return `${roundNumber(value / 1_000_000)}M`;
  if (value >= 1_000) return `${roundNumber(value / 1_000)}K`;
  return value.toString();
};

export const toPercentage = (value: number, decimalPlaces: number = 1): string => {
  return `${roundNumber(value * 100, decimalPlaces)}%`;
};
