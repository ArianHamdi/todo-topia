import { useMainButton } from "@twa.js/sdk-react";

const Home = () => {
  const mainButton = useMainButton();

  const mainButtonHandler = () => {
    // mainButton.setBackgroundColor("#231ea2");
    mainButton.setText("hello");
    // mainButton.setTextColor("#ffffff");
    mainButton.show();
  };

  return (
    <div>
      <h1 onClick={mainButtonHandler}>test</h1>
      <h2>{String(mainButton.isVisible)}</h2>
    </div>
  );
};

export default Home;
