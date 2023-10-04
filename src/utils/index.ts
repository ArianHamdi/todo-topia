import { RGB } from '@twa.js/colors';

export const isServer = typeof window === 'undefined';

export const injectParamsToString = (
  str: string,
  params: Record<string, string | number>
): string => {
  for (const [key, value] of Object.entries(params)) {
    str = str.replace(new RegExp(`{${key}}`, 'g'), value.toString());
  }

  return str;
};

export const generateRandomHexColor = (): RGB => {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color as RGB;
};

export const capitalizeFirstLetter = (text: string) => {
  return text.replace(/\b\w/g, match => match.toUpperCase());
};
