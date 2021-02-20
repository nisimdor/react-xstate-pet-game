import { assign, actions, createMachine } from "xstate";
const { send, cancel } = actions;
import {
  DAY_LENGTH,
  NIGHT_LENGTH,
  CELEBRATING_TIME,
  EATING_TIME,
  RAIN_CHANCE,
  Events,
  getNextDieTime,
  getNextPoopTime,
  getNextHungerTime,
} from "../Constants";

const createDelayedEvent = (invoker, type, time) => {
  return invoker(type, { delay: time, id: `${type}_ID` });
};

const createDeadEvent = createDelayedEvent(send, Events.DEAD, getNextDieTime());
const createHungryEvent = createDelayedEvent(
  send,
  Events.HUNGRY,
  getNextHungerTime()
);
const createPoopEvent = createDelayedEvent(
  send,
  Events.POOP,
  getNextPoopTime()
);

const randomWeather = (sendBack) => {
  return Math.random() > RAIN_CHANCE ? sendBack(Events.WEATHER) : () => {};
};

const sendSleepEvent = createDelayedEvent(send, Events.SLEEP, DAY_LENGTH);

const cancelEvent = (id) => cancel(`${id}_ID`); // canceling the delayed event

const cancelAllEvents = [
  Events.DEAD,
  Events.HUNGRY,
  Events.POOP,
  Events.SLEEP,
].map((type) => cancel(`${type}_ID`)); // cancling all events

export const createFoxMachine = (notifyOnChange = () => () => {}) => {
  return createMachine({
    initial: "init",
    context: {
      showPoopBag: false,
    },
    states: {
      init: {
        on: {
          "*": { target: "hatching", actions: notifyOnChange(Events.WAKE) },
        },
      },
      hatching: {
        after: {
          3000: {
            target: "alive",
            actions: [sendSleepEvent, createHungryEvent],
          },
        },
      },
      dead: {
        on: {
          "*": { target: "hatching", actions: notifyOnChange(Events.WAKE) },
        },
      },
      sleeping: {
        id: "sleeping",
        after: {
          [NIGHT_LENGTH]: {
            target: "alive.idling",
            actions: [
              sendSleepEvent,
              createHungryEvent,
              notifyOnChange(Events.WAKE),
            ],
          },
        },
      },
      alive: {
        initial: "idling",
        states: {
          idling: {
            invoke: { src: () => randomWeather },
            on: {
              [Events.HUNGRY]: {
                target: "hungry",
                actions: createDeadEvent,
              },
              [Events.POOP]: {
                target: "pooping",
                actions: createDeadEvent,
              },
            },
          },
          hungry: {
            on: {
              [Events.FEED]: {
                target: "eating",
                actions: [cancelEvent(Events.DEAD)],
              },
            },
          },
          eating: {
            after: {
              [EATING_TIME]: {
                target: "celebrating",
                actions: createPoopEvent,
              },
            },
          },
          pooping: {
            on: {
              [Events.CLEAN]: {
                target: "celebrating",
                actions: [
                  cancelEvent(Events.DEAD),
                  assign({ showPoopBag: true }),
                  createHungryEvent,
                ],
              },
            },
          },
          celebrating: {
            after: {
              [CELEBRATING_TIME]: {
                target: "idling",
                actions: [assign({ showPoopBag: false })],
              },
            },
          },
        },
        on: {
          [Events.SLEEP]: {
            target: "sleeping",
            actions: [...cancelAllEvents, notifyOnChange(Events.SLEEP)],
          },
          [Events.WEATHER]: {
            actions: [notifyOnChange(Events.WEATHER)],
          },
          [Events.DEAD]: {
            target: "dead",
            actions: [...cancelAllEvents, notifyOnChange(Events.DEAD)],
          },
        },
      },
    },
  });
};
