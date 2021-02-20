import React from "react";

const getfoxClass = (() => {
  const foxMapper = {
    hatching: "egg",
    sleeping: "sleep",
    dead: "dead",
    "alive.eating": "eating",
    "alive.hungry": "hungry",
    "alive.pooping": "pooping",
    "alive.celebrating": "celebrate",
  };
  return (stateValue) => {
    let val = foxMapper[stateValue];
    return val || "";
  };
})();

export default function Fox({ foxState, weatherState }) {
  let foxClass = "";
  let [parent, child] = foxState.toStrings();
  if (foxState.matches("alive.idling")) {
    foxClass = weatherState.matches("day.raining") ? "rain" : "idling";
  } else {
    foxClass = getfoxClass(child || parent);
  }
  return foxClass ? (
    <div className={`fox fox-${foxClass}`}></div>
  ) : (
    <div className={`fox hidden`}></div>
  );
}
