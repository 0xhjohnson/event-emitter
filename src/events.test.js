import { jest } from '@jest/globals';
import { EventEmitter } from './events.js';

describe('EventEmitter', () => {
  it('emits named events when supplied no arguments', () => {
    const emitter = EventEmitter();
    const callback = jest.fn();

    emitter.on('some_event', callback);
    emitter.emit('some_event');

    expect(callback).toHaveBeenCalled();
  });

  it('emits named events when supplied 1 argument', () => {
    const emitter = EventEmitter();
    const callback = jest.fn();

    emitter.on('some_event', callback);
    emitter.emit('some_event', 'x');

    expect(callback.mock.calls[0]).toEqual(['x']);
  });

  it('emits named events when supplied multiple arguments', () => {
    const emitter = EventEmitter();
    const callback = jest.fn();

    emitter.on('some_event', callback);
    emitter.emit('some_event', 'x', 'y');

    expect(callback.mock.calls[0]).toEqual(['x', 'y']);
  });

  it('calls handler multiple times', () => {
    const emitter = EventEmitter();
    const callback = jest.fn();

    emitter.on('some_event', callback);
    emitter.emit('some_event');
    emitter.emit('some_event');
    emitter.emit('some_event');

    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('only calls relevant handler based on event name', () => {
    const emitter = EventEmitter();
    const callback = jest.fn();
    const otherCallback = jest.fn();

    emitter.on('some_event', callback);
    emitter.on('other_event', otherCallback);
    emitter.emit('other_event');

    expect(callback).not.toHaveBeenCalled();
    expect(otherCallback).toHaveBeenCalled();
  });

  it('removes specific previously registered handlers', () => {
    const emitter = EventEmitter();
    const callback = jest.fn();

    emitter.on('some_event', callback);
    emitter.removeListener('some_event', callback);

    expect(emitter.getEventsByName('some_event').has(callback)).toBe(false);
  });

  it('removes all previously registered handlers', () => {
    const emitter = EventEmitter();
    const callback = jest.fn();
    const otherCallback = jest.fn();

    emitter.on('some_event', callback);
    emitter.on('some_event', otherCallback);
    emitter.removeAllListeners('some_event');

    expect(emitter.getEventsByName('some_event').size).toBe(0);
  });

  it('one-time handler is only called at most one time', () => {
    const emitter = EventEmitter();
    const callback = jest.fn();

    emitter.once('some_event', callback);
    emitter.emit('some_event');
    emitter.emit('some_event');
    emitter.emit('some_event');

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
