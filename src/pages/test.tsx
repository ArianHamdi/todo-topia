import {
  useBackButton,
  useClosingBehaviour,
  useHapticFeedback,
  useLaunchParams,
  useMainButton,
  usePopup,
  useThemeParams,
  useWebApp,
} from '@twa.js/sdk-react';

import { retrieveLaunchParams } from '@twa.js/sdk';
import Dropdown from '@/components/Dropdown';
import { useEffect } from 'react';

const Home = () => {
  const mainButton = useMainButton();

  const themeParams = useThemeParams();

  const hapticFeedback = useHapticFeedback();

  const webApp = useWebApp();

  const popup = usePopup();

  const closingBehaviour = useClosingBehaviour();

  const backButton = useBackButton();

  // const launchParams = useLaunchParams();

  const mainButtonHandler = () => {
    // mainButton.setBackgroundColor("#231ea2");
    mainButton.setText('hello');

    webApp.setBackgroundColor('#ffffff');
    webApp.setHeaderColor('#ffffff');

    // mainButton.setTextColor("#ffffff");
    mainButton.show();
  };

  const test = () => {
    mainButton.setText('xx');
    mainButton.show();
    mainButton.showProgress();
  };

  useEffect(() => {
    closingBehaviour.enableConfirmation();
    // backButton.on("click", () => {
    //   console.log("clickedddd")
    //   mainButton.setText("hello");
    //   // mainButton.show();
    //   mainButton.enable()
    // });
  }, []);

  return (
    <div>
      <Dropdown />
      <h1 onClick={() => hapticFeedback.impactOccurred('heavy')}>
        Hi how are you
      </h1>
      <h1 onClick={test}>Hi how are you</h1>
      <h1>Hi how are you</h1>
      <h1>Hi how are you</h1>
      <h1>Hi how are you</h1>
      <h1>Hi how are you</h1>
      <h1>Hi how are you</h1>
      <h1>Hi how are you</h1>
      <h1>Hi how are you</h1>
      <h1>Hi how are you</h1>
      <h1>Hi how are you</h1>
      <h1>Hi how are you</h1>
      <h1>Hi how are you</h1>
      <h1>Hi how are you</h1>
      <h1>Hi how are you</h1>
    </div>
  );
};

export default Home;
