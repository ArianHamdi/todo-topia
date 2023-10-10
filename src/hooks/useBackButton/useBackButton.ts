import { useBackButton as useBackButtonReact } from '@tma.js/sdk-react';
import { useRouter } from '@/hooks/useRouter/useRouter';
import { useEffect } from 'react';
import { IRoute } from '@/types';

export const useBackButton = (route?: IRoute) => {
  const backButton = useBackButtonReact();
  const { push } = useRouter();

  useEffect(() => {
    if (!route) {
      backButton.hide();
      return;
      // backButton.off('click', listener);
    }
    const listener = () => push(route);
    console.log('set route', route);

    backButton.on('click', listener);
    backButton.show();

    // return () => {
    //   console.log('cleanup', route);

    // };
  }, [push, backButton, route]);
};
