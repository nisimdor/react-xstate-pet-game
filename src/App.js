import React from "react";
import { render } from "react-dom";
import { useMachine } from "@xstate/react";
import { createFoxMachine } from "./Machines/foxMachine";
import { weatherMachine } from "./Machines/weatherMachine";
import Weather from "./Components/Weather";
import Fox from "./Components/Fox";
import Buttons from "./Components/Buttons";

const App = () => {
  const [weatherState, sendWeatherMachine] = useMachine(weatherMachine);

  const sendToWeather = (weatherEvent) => {
    return () => sendWeatherMachine(weatherEvent);
  };
  const [foxState, sendFoxMachine] = useMachine(
    createFoxMachine(sendToWeather)
  );

  const { showPoopBag } = foxState.context;
  return (
    <div className="container">
      <div className="inner">
        <Weather weatherState={weatherState} />
        <Fox weatherState={weatherState} foxState={foxState} />
        <div className={`poop-bag ${showPoopBag ? "" : "hidden"}`}></div>
        <div className="foreground-rain"></div>
        <div className="frame"></div>
        <div className="modal">
          <div className="modal-inner">
            {foxState.matches("init") && "Press the middle button to start"}
            {foxState.matches("dead") && (
              <div>
                The fox died :( <br /> Press the middle button to start{" "}
              </div>
            )}
          </div>
        </div>
        <Buttons
          sendFoxMachine={sendFoxMachine}
          sendWeatherMachine={sendWeatherMachine}
        />
      </div>
    </div>
  );
};

render(<App />, document.getElementById("root"));
