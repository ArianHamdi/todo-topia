import { CallbackFunction } from '@/types';
import { PopupParams } from '@tma.js/sdk';
import { usePopup as usePopupReact } from '@tma.js/sdk-react';

interface IOpen extends PopupParams {
  onConfirm: CallbackFunction;
}

export const usePopup = () => {
  const popup = usePopupReact();

  const open = async ({ onConfirm, ...params }: IOpen) => {
    const isSupported = popup.supports('open');
    if (isSupported) {
      const id = await popup.open(params);
      if (id === 'confirm') {
        console.log('id', id);
        onConfirm();
        console.log('idId', id);
      }
    } else {
      onConfirm();
    }
  };

  return {
    open,
  };
};
