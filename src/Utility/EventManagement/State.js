import { Event } from "./Event";
import { PropertyChangedEvent } from "./PropertyChangedEvent";
import { PropertyChangedListener } from "./PropertyChangedListener";
import { ChangeNotifierProperty } from "./ChangeNotifierProperty";

/**
 * Simple state management mechanism.
 * @param {any} owner Owner of state.
 * @param {number} delay Event trigger delay, in ms.
 */

export function State(owner, delay) {
  const _propertyNotifier = PropertyChangedEvent();
  const _propertyChangedListener = PropertyChangedListener();

  const states = [];

  const _resetChanged = () => {
    states.forEach((x) => (x.changed = false));
  };

  const stateChangedEvent = Event(delay, _resetChanged);

  /**
   * Creates state.
   * @param {string} stateName Name of state.
   * @param {boolean} fireAlways Fires event whether value changed or not.
   * @param {((oldValue: any, newValue: any) => boolean) | null} changedPredicate Predicate to decide value has been changed. Equal sign used when it is null.
   */
  const createState = (stateName, fireAlways = false, changedPredicate = null) => {
    const state = {
      changed: false,
      stateName: stateName,
      property: ChangeNotifierProperty(owner, stateName, _propertyNotifier.fireEvent, fireAlways, changedPredicate),
      getState: getState.bind(null, stateName),
      setState: setState.bind(null, stateName),
    };
    _propertyChangedListener.listenAnyProperty(_propertyNotifier.subscribe, _propertyChangedHandler);
    states.push(state);
    return state;
  };

  /**
   * Sets state value.
   * @param {string} stateName Name of state.
   * @param {any | (prevValue: any) => any} value New value or callback function with previous value argument.
   */
  const setState = (stateName, value) => {
    const state = _findState(stateName);
    if (state) {
      state.property.setValue(value);
    }
  };

  /**
   * Returns state value.
   * @param {any} stateName Name of state.
   * @returns
   */
  const getState = (stateName) => {
    let result = null;
    const state = _findState(stateName);
    if (state) {
      result = state.property.getValue();
    }
    return result;
  };

  const _findState = (stateName) => {
    return states.find((x) => x.stateName === stateName);
  };

  const _propertyChangedHandler = (sender, property) => {
    const state = _findState(property);
    if (state) {
      state.changed = true;
    }
    stateChangedEvent.fireEvent(
      owner,
      states.filter((x) => x.changed)
    );
  };

  return { states, stateChangedEvent: stateChangedEvent.subscribe, createState, setState, getState };
}
