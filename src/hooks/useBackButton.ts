import { useBackButton as useBackButtonReact } from '@twa.js/sdk-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useBackButton = () => {
  const backButton = useBackButtonReact();
  const { pathname, back } = useRouter();

  useEffect(() => {
    if (pathname !== '/') {
      backButton.on('click', back);
      backButton.show();
    }
    return () => {
      backButton.hide();
      backButton.off('click', back);
    };
  }, [pathname, back, backButton]);
};
