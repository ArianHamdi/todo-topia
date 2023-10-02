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
