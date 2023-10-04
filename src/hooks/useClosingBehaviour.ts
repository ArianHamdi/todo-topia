import { useClosingBehaviour as useClosingBehaviourReact } from '@tma.js/sdk-react';
import { useEffect } from 'react';

export const useClosingBehaviour = (enable: boolean = true) => {
  const closingBehaviour = useClosingBehaviourReact();
  useEffect(() => {
    if (enable) {
      closingBehaviour.enableConfirmation();
    }
    return () => {
      closingBehaviour.disableConfirmation();
    };
  }, [enable, closingBehaviour]);
};
