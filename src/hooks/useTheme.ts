import { setCookie } from '@/utils';
import { useThemeParams } from '@tma.js/sdk-react';
import { useEffect } from 'react';

export const useTheme = () => {
  const { isDark, backgroundColor } = useThemeParams();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--color-primary',
      backgroundColor
    );
  }, [backgroundColor]);

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';

    // Set theme cookie indefinitely
    setCookie('theme', theme);

    // Update the data-theme attribute
    document.documentElement.setAttribute('data-theme', theme);
  }, [isDark]);
};
