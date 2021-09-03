/**
 * Event Emitter which simplifies handling of async events.
 *
 * @example
 *
 *   const emitter = EventEmitter();
 *   emitter.on('some_event', () => {});
 *   emitter.emit('some_event');
 *
 */

export function EventEmitter() {
  // Not directly exposed to limit surface area
  const events = {};

  return {
    // Adds a handler function at the tail of Set() for the given event name
    on(eventName, handlerFn) {
      this.getEventsByName(eventName).add(handlerFn);
    },
    // Synchronously calls each of the registered handler functions for given event name
    // Passes in supplied arguments to each
    emit(eventName, ...args) {
      this.getEventsByName(eventName).forEach((handlerFn) =>
        handlerFn(...args)
      );
    },
    // Runs a one-time handler function for given event name
    once(eventName, handlerFn) {
      const self = this;

      this.on(eventName, function onceHandlerFn(...args) {
        self.removeListener(eventName, onceHandlerFn);
        handlerFn(...args);
      });
    },
    // Removes specific listener
    removeListener(eventName, handlerFn) {
      this.getEventsByName(eventName).delete(handlerFn);
    },
    // Removes all listeners for given eventName
    removeAllListeners(eventName) {
      this.getEventsByName(eventName).clear();
    },
    // Helper to find the events for given eventName
    // If not found generates a new Set to hold handler functions
    getEventsByName(eventName) {
      if (!(eventName in events)) {
        events[eventName] = new Set();
      }

      // Just return the handler functions
      return events[eventName];
    }
  };
}
