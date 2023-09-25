import {
  useLaunchParams,
  useMainButton,
  usePopup,
  useThemeParams,
  useWebApp,
} from "@twa.js/sdk-react";
import { createTodo } from "@/api/todo";

import { retrieveLaunchParams } from "@twa.js/sdk";

const Home = () => {
  const mainButton = useMainButton();

  const themeParams = useThemeParams();

  const webApp = useWebApp();

  const popup = usePopup();

  // const launchParams = useLaunchParams();

  const mainButtonHandler = () => {
    // mainButton.setBackgroundColor("#231ea2");
    mainButton.setText("hello");
    mainButton.on("main_button_pressed", createTodo);
    webApp.setBackgroundColor("#ffffff");
    webApp.setHeaderColor("#ffffff");

    // mainButton.setTextColor("#ffffff");
    mainButton.show();
  };

  return (
    <div>
      <p onClick={createTodo}>test</p>
      <p>{JSON.stringify(retrieveLaunchParams().initData, null, 2)}</p>
    </div>
  );
};

export default Home;
