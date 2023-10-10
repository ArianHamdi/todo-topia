import { translations } from '@/translations';
import { Locales } from '@/types';
import { injectParamsToString } from '@/utils';
import { useRouter } from 'next/router';

export const useTranslation = () => {
  const { locale } = useRouter();
  const translation = translations[locale as Locales];

  const translator = (
    key: keyof typeof translation,
    params?: Record<string, string | number>
  ) => {
    let value = translation[key];
    if (params) value = injectParamsToString(value, params);
    return value;
  };

  return {
    t: translator,
  };
};
