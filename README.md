# Event Emitter

Simple event emitter for JavaScript that simplifies the process of handling async events and enable clean decoupled code. Lightweight with no outside dependencies.

Implementation allows:

- Emitting named events with any number of arguments
- Registering handler functions for named events that are passed the appropriate arguments on emission
- Registering a "one-time" handler that will be called at most one time
- Removing specific previously-registered event handlers and/or all previously-registered event handlers

## Prerequisites

Although this module is suitable for publishing to npm for the sake of brevity it is unpublished.

Node.js must be installed to run locally. If you are using [nvm](https://github.com/nvm-sh/nvm) then run `nvm use` to use the recommended node version (16.8.0).

## Run Locally

Clone the project

```bash
git clone https://github.com/0xhjohnson/event-emitter.git
```

Go to the project directory

```bash
cd event-emitter
```

Play around in `src/index.js`

```js
import { EventEmitter } from './events.js';

const emitter = EventEmitter();
emitter.on('some_event', () => console.log('hello'));
emitter.emit('some_event'); // Logs 'hello'

export { EventEmitter };
```

## Documentation

### Generate new event emitter

Creates a new event emitter which exposes methods for registering event hander functions. `EventEmitter` is a not a class so `new` keyword is not needed.

```js
const emitter = EventEmitter();
```

### Add listener

Use `on` method to add a listener for specific event.

```js
emitter.on('some_event', (number) => {
  console.log(number);
});
```

### Emit

Use `emit` method to synchronously call each of the listeners for given `eventName`.

```js
emitter.on('some_event', (number) => {
  console.log(number);
});

emitter.emit('some_event', 2); // Logs 2
emitter.emit('some_event', 4); // Logs 4
```

### Add one-time listener

Use `once` method to add a one-time listener for specific event. Will be called at most one time.

```js
emitter.once('some_event', (number) => {
  console.log(number);
});

emitter.emit('some_event', 1); // Logs 1
emitter.emit('some_event', 2); // Doesn't fire
emitter.emit('some_event', 3); // Doesn't fire
```

### Remove listener

Use `removeListener` method to remove a specific event listener.

```js
const callback = (number) => {
  console.log(number);
};
emitter.on('some_event', callback);

emitter.removeListener('some_event', callback);
```

### Remove all listeners

Use `removeAllListeners` method to remove all listeners for given `eventName`.

```js
emitter.on('some_event', (number) => {
  console.log(number);
});

emitter.removeAllListeners('some_event');
```

## Running Tests

To run tests, run the following command

`yarn test` or `npm run test`
