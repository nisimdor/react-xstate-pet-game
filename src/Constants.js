export const Events = {
  HUNGRY: "HUNGRY",
  POOP: "POOP",
  CLEAN: "CLEAN",
  DEAD: "DEAD",
  FEED: "FEED",
  WEATHER: "WEATHER",
  SLEEP: "SLEEP",
  WAKE: "WAKE",
};

export const ICONS = ["fish", "poop", "weather"];

export const RAIN_CHANCE = 0.2;

export const DAY_LENGTH = 60 * 1000;
export const NIGHT_LENGTH = 4 * 1000;

export const CELEBRATING_TIME = 2 * 1000;
export const EATING_TIME = 2 * 1000;

export const getNextHungerTime = () =>
  1000 * (Math.floor(Math.random() * 3) + 4);

export const getNextDieTime = () => 1000 * (Math.floor(Math.random() * 2) + 8);

export const getNextPoopTime = () => 1000 * (Math.floor(Math.random() * 3) + 5);
