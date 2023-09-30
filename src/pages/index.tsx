import {
  useClosingBehaviour,
  useLaunchParams,
  useMainButton,
  usePopup,
  useThemeParams,
  useWebApp,
} from "@twa.js/sdk-react";
import { createTodo } from "@/api/todo";

import { retrieveLaunchParams } from "@twa.js/sdk";
import Dropdown from "@/components/Dropdown";
import { useEffect } from "react";

const Home = () => {
  const mainButton = useMainButton();

  const themeParams = useThemeParams();

  const webApp = useWebApp();

  const popup = usePopup();

  const closingBehaviour = useClosingBehaviour();

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

  useEffect(() => {}, []);

  return (
    <div>
      <Dropdown />
    </div>
  );
};

export default Home;
