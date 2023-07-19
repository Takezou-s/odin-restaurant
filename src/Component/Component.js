import { State } from "../Utility/EventManagement/State";

/**
 * Component base class. Subclasses should override "initNode" method and set value of "node" property.
 */
export class Component {
  constructor(props) {
    this.update = false;
    this.propStates = [];
    this.stateBinds = [];
    this.states = State(this, 50);
    this.changedStates = [];
    this.states.stateChangedEvent(this._stateChangedHandler.bind(this));

    if (props) {
      const createStatesFromProps = () => {
        for (const key in props) {
          const value = props[key];
          this[`${key}PropState`] = this.createState(`props.${key}`, value, true);
        }
      };

      const handler = {
        get: (target, prop, receiver) => {
          return this.getPropValue(prop);
        },
        set: (obj, prop, value) => {
          this.setPropValue(prop, value);
          return true;
        },
      };

      this.props = new Proxy(Object.assign({}, props), handler);
      createStatesFromProps();
    }

    if (!this.initNode) throw new Error("'initNode' method could not be found!");
    this.initNode();
    if (!this.node) throw new Error("'node' property can not be null!");
    this.initStates();
  }
  /**
   * Sets prop value.
   * @param {string} propName prop name.
   * @param {any} value New value of prop.
   */
  setPropValue(propName, value) {
    this.states.setState(`props.${propName}`, value);
  }
  /**
   * Gets prop value.
   * @param {string} propName prop name.
   * @returns any
   */
  getPropValue(propName) {
    return this.states.getState(`props.${propName}`);
  }
  /**
   * State creations and bindings are made in this method.
   */
  initStates() {}
  /**
   *
   * @param {string} stateName Name of state.
   * @param {any} initValue Initial value of state.
   * @param {boolean} fireAlways Fires event whether value changed or not.
   * @param {((oldValue: any, newValue: any) => boolean) | null} changedPredicate Predicate to decide value has been changed. Equal sign used when it is null.
   * @returns
   */
  createState(stateName, initValue, fireAlways = false, changedPredicate = null) {
    const state = this.states.createState(stateName, fireAlways, changedPredicate);
    state.property.setValueSilent(initValue);
    return state;
  }
  /**
   *
   * @param {State} state State whose changes are listened.
   * @param {(state: State, getState: () => any) => void} callbackFn State change listener function.
   */
  bindToState(state, callbackFn) {
    this.stateBinds.push({ state, fn: callbackFn });
  }
  /**
   * Reflect state changes to elements.
   */
  reflectStates() {
    if (!this.update || !this.changedStates || this.changedStates.length <= 0) {
      this.stateBinds.forEach((x) => x.fn(x.state, x.state.getState));
    } else {
      this.changedStates.forEach((x) => {
        const stateBind = this.stateBinds.find((y) => y === x || y.stateName === x.stateName);
        if (stateBind) {
          stateBind.fn(stateBind.state, stateBind.state.getState);
        }
      });
      this.changedStates = [];
    }
  }
  /**
   * Reflect props and states to elements.
   */
  reflectToElements() {
    this.reflectStates();
  }

  /**
   * Renders component.
   */
  render() {
    this.reflectToElements();
    this.update = true;
    return this.node;
  }

  /**
   * Removes component from document.
   */
  remove() {
    this.node.remove();
  }

  _stateChangedHandler(sender, args) {
    this.changedStates = args;
    this.render();
  }
}
