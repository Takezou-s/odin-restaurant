import { State } from "../Utility/EventManagement/State";

/**
 * Component base class. Subclasses should override "initNode" method and set value of "node" property.
 */
export class Component {
  /**
   * Constructs component.
   * @param {Component} parent Parent component.
   */
  constructor(parent, props) {
    this.update = false;
    this.props = props;
    this.parent = parent;
    this.parent.children.push(this);
    this.children = [];
    this.stateBinds = [];
    this.states = State(this, 2500);
    this.changedStates = [];
    this.states.stateChangedEvent(this._stateChangedHandler.bind(this));

    if (!this.initNode) throw new Error("'initNode' method could not be found!");
    this.initNode();
    if (!this.node) throw new Error("'node' property can not be null!");
    this.initStates();
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
   * Reflect prop values in "props" to elements.
   */
  reflectProps() {}
  /**
   * Reflect state changes to elements.
   */
  reflectStates() {
    if (!this.changedStates || this.changedStates.length <= 0) this.stateBinds.forEach((x) => x.fn());
    else {
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
    this.reflectProps();
    this.reflectStates();
  }

  /**
   * Renders component inside parent component.
   */
  render() {
    this.reflectToElements();
    this.children.forEach((x) => x.render());
    if (!this.update) {
      this.parent.node.appendChild(this.node);
      this.update = true;
    }
  }

  /**
   * Removes component from document and parent node's children list.
   */
  remove() {
    this.parent.node.removeChild(this.node);
    const index = this.parent.children.findIndex((x) => x === this);
    this.parent.children.splice(index, 1);
  }

  _stateChangedHandler(sender, args) {
    this.changedStates = args;
    this.render();
  }
}
