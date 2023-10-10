export interface Theme {
  name: string;
  color: string;
  background: string;
}

export const themes: { [key: string]: Theme } = {
  light: {
    name: 'light',
    color: '#000000',
    background: '#ffffff',
  },
  dark: {
    name: 'dark',
    color: '#ffffff',
    background: '#333333',
  },
};
