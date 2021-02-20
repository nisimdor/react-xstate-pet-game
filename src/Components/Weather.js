import React from "react";

const getWeatherClass = (() => {
  const weatherMapper = {
    "day.sunny": "day",
    "day.raining": "rain",
    dead: "dead",
    night: "night",
  };
  return (stateValue) => {
    let val = weatherMapper[stateValue];
    return val ? `game ${val}` : "";
  };
})();

export default function Weather({ weatherState }) {
  let [parent, child] = weatherState.toStrings();
  let weatherClass = getWeatherClass(child || parent);
  return weatherClass ? <div className={weatherClass}></div> : "";
}
