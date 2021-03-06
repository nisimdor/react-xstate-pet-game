# react-xstate-pet-game

A game created with React and XState (https://xstate.js.org/)

**Link to the game: https://nisimdor.github.io/react-xstate-pet-game/**

![Game Display](https://github.com/nisimdor/react-xstate-pet-game/blob/master/diagrams/game.png)

## State Machines
For this game I've used the XState library to **model the logic of the game with state machines**.

The diagrams of the state machine is as follows:

### Fox State Machine
![Fox State Machine](https://github.com/nisimdor/react-xstate-pet-game/blob/master/diagrams/foxMachine.png)

### Weather State Machine
![Weather State Machine](https://github.com/nisimdor/react-xstate-pet-game/blob/master/diagrams/weatherMachine.png)

This project is based on the wonderful courses from **Frontend Masters**:
- Complete Front-End Project: Build a Game - https://frontendmasters.com/courses/front-end-game/
- State Modeling in React with XState - https://frontendmasters.com/courses/xstate-react/

## Game Rules

1.  The game starts in an initialized state. The user must press the center game to get started.
2.  Users can switch between the three icons on the bottom using the left and right button. To press one of the icons, they will click the middle button. Users cannot directly click the icons.
3.  If they reach the end of the icons and try to go further (click the right button when the right-most icon is selected) it should loop around.
4.  When the user starts, the fox will hatch after showing the hatch animation.
5.  Once the fox is hatched, show the fox in an idle animation in the day time.
6.  The user can switch the weather from day to rain using the weather icon.
7.  After some amount of time the fox will become hungry. This should be on some sort of variable schedule to add some unpredictability to the game.
8.  The fox can only be fed when hungry.
9.  After a fox is a fed, after another random interval, the fox will poop.
10. The fox cannot have the poop cleaned up unless there is poop to be cleaned up
11. When a user cleans up poop, it should add another random interval until the fox is hungry again.
12. The fox cannot be hungry and have pooped at the same time.
13. If the user hasn't fed a hungry fox or clean up a fox's poop after a random interval, it should cause the fox to die and go to the game over screen.
14. After a longer random interval of day/rain, it should become night. It stays night for a fixed interval. The fox does not get hungry, poop, or die in its sleep. Once it wakes up, it starts with a new random interval of hunger and poop. You cannot change the weather, clean up poop or feed a sleeping fox.
16. Once the game hits nighttime, reset the timers. The fox will wake up and the first thing that will happen is it will become hungry.
17. Once a fox dies, the landscape goes into the death scene, the fox becomes the tombstone, and the game is over. If the user presses the middle button again, it restarts the game with a new hatch.
18. Using a modal, you should tell the user to restart the game by pressing the middle button.
20. The fox should not be able to die, get hungry, poop, be fed, have the poop cleaned up, or fall asleep when it is being fed, sleeping, hatching, or dead.
21. While in general I'm a huge advocate for responsive designs and making things work on any viewport size, this one time I'm absolving you of that responsiblity and you can just assume a fixed desktop browser size.
