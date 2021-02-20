import { createMachine } from "xstate";
import { Events } from "../Constants";

export const weatherMachine = createMachine({
  initial: "day",
  states: {
    day: {
      initial: "sunny",
      states: {
        sunny: {
          on: {
            [Events.WEATHER]: "raining",
          },
        },
        raining: {
          on: {
            [Events.WEATHER]: "sunny",
          },
        },
      },
      on: {
        [Events.SLEEP]: "night",
        [Events.DEAD]: "dead",
      },
    },
    night: {
      on: { [Events.WAKE]: "day" },
    },
    dead: {
      on: { [Events.WAKE]: "day" },
    },
  },
});
