import React, { useState } from "react";
import { Events, ICONS } from "../Constants";

const ICONS_LENGTH = ICONS.length;
const WEATHER_INDEX = ICONS.indexOf("weather");

export default function Buttons({ sendFoxMachine, sendWeatherMachine }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const iconsEvents = {
    weather: Events.WEATHER,
    fish: Events.FEED,
    poop: Events.CLEAN,
  };

  const actionButtons = {
    left: () => {
      setSelectedIndex((selectedIndex + ICONS_LENGTH - 1) % ICONS_LENGTH);
    },
    middle: () => {
      let iconKey = ICONS[selectedIndex];
      sendFoxMachine(iconsEvents[iconKey] || "");
    },
    right: () => {
      setSelectedIndex((selectedIndex + 1) % ICONS_LENGTH);
    },
  };
  return (
    <div>
      <div className="buttons">
        {Object.keys(actionButtons).map((buttonKey) => (
          <button
            key={buttonKey}
            className={`btn ${buttonKey}-btn`}
            onClick={actionButtons[buttonKey]}
          ></button>
        ))}
      </div>
      <div className="icons">
        {ICONS.map((iconKey) => {
          return (
            <div
              key={iconKey}
              className={`icon ${iconKey}-icon ${
                iconKey === ICONS[selectedIndex] ? "highlighted" : ""
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
