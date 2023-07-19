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
    _invoke();
  };

  const _invoke = (sender, args) => {
    _listeners.forEach((x) => x(sender, args));
    if (postInvokeFn) postInvokeFn();
  };
  return { subscribe, fireEvent };
}
