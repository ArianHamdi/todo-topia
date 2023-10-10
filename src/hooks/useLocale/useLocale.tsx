import { useLaunchParams } from '@tma.js/sdk-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SUPPORTED_LOCALES = ['en', 'es', 'de', 'fr', 'it'];

export const useLocale = () => {
  const { initData } = useLaunchParams();

  const locale = initData?.user?.languageCode;

  const router = useRouter();

  useEffect(() => {
    const isLocaleSupported = locale && SUPPORTED_LOCALES.includes(locale);
    const shouldChangeLocale = isLocaleSupported && router.locale !== locale;
    if (shouldChangeLocale)
      router.replace(router.pathname, router.asPath, { locale });
  }, [router, locale]);
};
