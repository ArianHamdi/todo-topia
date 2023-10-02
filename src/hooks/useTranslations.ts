import { translations } from '@/translations';
import { injectParamsToString } from '@/utils';

export const useTranslations = () => {
  const translation = translations['en'];

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
