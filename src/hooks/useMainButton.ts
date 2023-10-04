import { useEffect, useMemo } from 'react';
import { useMainButton as useMainButtonReact } from '@tma.js/sdk-react';
import { RGB } from '@tma.js/colors';
import { capitalizeFirstLetter } from '@/utils';

interface IProps {
  isVisible?: boolean;
  isLoading?: boolean;
  isEnabled?: boolean;
  backgroundColor?: RGB;
  disableBackgroundColor?: RGB;
  textColor?: RGB;
  text?: string;
  onClick?: () => void;
}

export const useMainButton = ({
  isVisible = true,
  isLoading = false,
  isEnabled = true,
  backgroundColor,
  disableBackgroundColor,
  textColor,
  text,
  onClick = () => {},
}: IProps) => {
  const mainButton = useMainButtonReact();

  // useEffect(() => {
  //   if (backgroundColor) {
  //     mainButton.setBackgroundColor(backgroundColor);
  //   }
  // }, [backgroundColor, mainButton]);

  useEffect(() => {
    if (isVisible) {
      mainButton.show();
    }
    return () => {
      mainButton.hide();
    };
  }, [isVisible, mainButton]);

  useEffect(() => {
    if (isLoading) {
      mainButton.showProgress();
    }
    return () => {
      mainButton.hideProgress();
    };
  }, [isLoading, mainButton]);

  useEffect(() => {
    if (isEnabled) {
      mainButton.enable();
      if (backgroundColor) {
        mainButton.setBackgroundColor(backgroundColor);
      }
    }
    return () => {
      mainButton.disable();
      if (disableBackgroundColor) {
        mainButton.setBackgroundColor(disableBackgroundColor);
      }
    };
  }, [isEnabled, backgroundColor, disableBackgroundColor, mainButton]);

  useEffect(() => {
    if (textColor) {
      mainButton.setTextColor(textColor);
    }
  }, [textColor, mainButton]);

  useEffect(() => {
    if (text) {
      mainButton.setText(capitalizeFirstLetter(text));
    }
  }, [text, mainButton]);

  useEffect(() => {
    mainButton.on('click', onClick);
    return () => {
      mainButton.off('click', onClick);
    };
  }, [mainButton]);
};
