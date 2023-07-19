import { Event } from "./Event.js";

/**
 * Notifies property value changes to listeners.
 * @returns
 */
export function PropertyChangedEvent(delay, postInvokeFn) {
  const _event = Event(delay, postInvokeFn);
  /**
   * Fires event.
   * @param {any} sender Owner of event.
   * @param {string} property Name of changed property.
   * @param {any} value Property value.
   */
  const fireEvent = (sender, property, value) => {
    const args = { property, value };
    _event.fireEvent(sender, args);
  };

  return { subscribe: _event.subscribe, unsubscribe: _event.unsubscribe, clearSubscribers: _event.clearSubscribers, fireEvent };
}
