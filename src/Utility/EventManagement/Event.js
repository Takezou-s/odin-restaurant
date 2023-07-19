/**
 * Runs listener functions when triggered.
 * @returns
 */
export function Event(delay, postInvokeFn) {
  const _listeners = [];
  let timeoutId;

  /**
   * Subscribes listener function.
   * @param {(sender: any, args: any) => void} listener Function listens event triggers.
   */
  const subscribe = (listener) => {
    _listeners.push(listener);
  };
  /**
   * Unsubscribes listener function.
   * @param {(sender: any, args: any) => void} listener Function listens event triggers.
   */
  const unsubscribe = (listener) => {
    if (listener) {
      const index = _listeners.findIndex((x) => x === listener);
      if (index >= 0) {
        _listeners.splice(index, 1);
      }
    }
  };
  /**
   * Clears all subscribers.
   */
  const clearSubscribers = () => {
    _listeners = [];
  };
  /**
   * Fires event.
   * @param {any} sender Owner of event.
   * @param {any} args Value attached to event.
   */
  const fireEvent = (sender, args) => {
    if (delay && !isNaN(delay) && delay > 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        _invoke();
      }, delay);
      return;
    }
    _invoke(sender, args);
  };

  const _invoke = (sender, args) => {
    _listeners.forEach((x) => x(sender, args));
    if (postInvokeFn) postInvokeFn();
  };
  return { subscribe, unsubscribe, clearSubscribers, fireEvent };
}
