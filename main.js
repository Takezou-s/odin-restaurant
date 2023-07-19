/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Component/BodyComponent.js":
/*!****************************************!*\
  !*** ./src/Component/BodyComponent.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {\r\n  const node = document.body;\r\n  const children = [];\r\n  const render = () => {\r\n    children.forEach((x) => x.render());\r\n  };\r\n\r\n  return { node, children, render };\r\n})());\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Component/BodyComponent.js?");

/***/ }),

/***/ "./src/Component/Component.js":
/*!************************************!*\
  !*** ./src/Component/Component.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Component: () => (/* binding */ Component)\n/* harmony export */ });\n/* harmony import */ var _Utility_EventManagement_State__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/EventManagement/State */ \"./src/Utility/EventManagement/State.js\");\n\r\n\r\n/**\r\n * Component base class. Subclasses should override \"initNode\" method and set value of \"node\" property.\r\n */\r\nclass Component {\r\n  /**\r\n   * Constructs component.\r\n   * @param {Component} parent Parent component.\r\n   */\r\n  constructor(parent, props) {\r\n    this.update = false;\r\n    this.props = props;\r\n    this.parent = parent;\r\n    this.parent.children.push(this);\r\n    this.children = [];\r\n    this.stateBinds = [];\r\n    this.states = (0,_Utility_EventManagement_State__WEBPACK_IMPORTED_MODULE_0__.State)(this, 2500);\r\n    this.changedStates = [];\r\n    this.states.stateChangedEvent(this._stateChangedHandler.bind(this));\r\n\r\n    if (!this.initNode) throw new Error(\"'initNode' method could not be found!\");\r\n    this.initNode();\r\n    if (!this.node) throw new Error(\"'node' property can not be null!\");\r\n    this.initStates();\r\n  }\r\n\r\n  initStates() {}\r\n\r\n  createState(stateName, initValue, fireAlways = false, changedPredicate = null) {\r\n    const state = this.states.createState(stateName, fireAlways, changedPredicate);\r\n    state.property.setValueSilent(initValue);\r\n    // return [state, this.states.getState.bind(this.states, stateName), this.states.setState.bind(this.states, stateName)];\r\n    return state;\r\n  }\r\n\r\n  bindToState(state, callbackFn) {\r\n    this.stateBinds.push({ state, fn: callbackFn });\r\n  }\r\n\r\n  reflectProps() {}\r\n\r\n  reflectStates() {\r\n    if (!this.changedStates || this.changedStates.length <= 0) this.stateBinds.forEach((x) => x.fn());\r\n    else {\r\n      this.changedStates.forEach((x) => {\r\n        const stateBind = this.stateBinds.find((y) => y === x || y.stateName === x.stateName);\r\n        if (stateBind) {\r\n          stateBind.fn();\r\n        }\r\n      });\r\n      this.changedStates = [];\r\n    }\r\n  }\r\n\r\n  reflectToElements() {\r\n    this.reflectProps();\r\n    this.reflectStates();\r\n  }\r\n\r\n  /**\r\n   * Renders component inside parent component.\r\n   */\r\n  render() {\r\n    // if (!this.update) {\r\n    //   if (!this.initNode) throw new Error(\"'initNode' method could not be found!\");\r\n    //   this.initNode();\r\n    //   if (!this.node) throw new Error(\"'node' property can not be null!\");\r\n    // }\r\n    this.reflectToElements();\r\n    this.children.forEach((x) => x.render());\r\n    if (!this.update) {\r\n      this.parent.node.appendChild(this.node);\r\n      this.update = true;\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Removes component from document and parent node's children list.\r\n   */\r\n  remove() {\r\n    this.parent.node.removeChild(this.node);\r\n    const index = this.parent.children.findIndex((x) => x === this);\r\n    this.parent.children.splice(index, 1);\r\n  }\r\n\r\n  _stateChangedHandler(sender, args) {\r\n    this.changedStates = args;\r\n    this.render();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Component/Component.js?");

/***/ }),

/***/ "./src/Component/Tab/TabItemComponent.js":
/*!***********************************************!*\
  !*** ./src/Component/Tab/TabItemComponent.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TabItemComponent)\n/* harmony export */ });\n/* harmony import */ var _Utility_EventManagement_Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utility/EventManagement/Event */ \"./src/Utility/EventManagement/Event.js\");\n/* harmony import */ var _Utility_EventManagement_PropertyChangedEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utility/EventManagement/PropertyChangedEvent */ \"./src/Utility/EventManagement/PropertyChangedEvent.js\");\n/* harmony import */ var _Utility_EventManagement_PropertyChangedListener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utility/EventManagement/PropertyChangedListener */ \"./src/Utility/EventManagement/PropertyChangedListener.js\");\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Component */ \"./src/Component/Component.js\");\n\r\n\r\n\r\n\r\n\r\nclass TabItemComponent extends _Component__WEBPACK_IMPORTED_MODULE_3__.Component {\r\n  constructor(parent, props) {\r\n    super(parent, props);\r\n    this.clickedEvent = (0,_Utility_EventManagement_Event__WEBPACK_IMPORTED_MODULE_0__.Event)();\r\n  }\r\n\r\n  initNode() {\r\n    this.node = document.createElement(\"button\");\r\n    this.node.addEventListener(\"click\", (event) => this.clickedEvent.fireEvent(this, { event }));\r\n    this.node.addEventListener(\"click\", () => {\r\n      this.countState.setState((x) => ++x);\r\n    });\r\n  }\r\n\r\n  reflectProps() {\r\n    this.node.textContent = this.props.text + this.countState.getState();\r\n  }\r\n\r\n  initStates() {\r\n    this.countState = this.createState(\"count\", 0);\r\n\r\n    this.bindToState(this.countState, () => (this.node.textContent = this.props.text + this.countState.getState()));\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Component/Tab/TabItemComponent.js?");

/***/ }),

/***/ "./src/Utility/EventManagement/ChangeNotifierProperty.js":
/*!***************************************************************!*\
  !*** ./src/Utility/EventManagement/ChangeNotifierProperty.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChangeNotifierProperty: () => (/* binding */ ChangeNotifierProperty),\n/* harmony export */   ChangeNotifierPropertyCreator: () => (/* binding */ ChangeNotifierPropertyCreator)\n/* harmony export */ });\n// Notifies its value changes by a notifier.\r\n\r\n/**\r\n * Notifies changes on property by notifier.\r\n * @param {any} owner Owner object.\r\n * @param {string} propertyName Property name.\r\n * @param {(sender, property, value) => void} notifier PropertyChangedEvent notifier function.\r\n * @param {boolean} fireAlways Fires event whether value changed or not.\r\n * @param {((oldValue: any, newValue: any) => boolean) | null} changedPredicate Predicate to decide value has been changed. Equal sign used when it is null.\r\n * @returns\r\n */\r\nfunction ChangeNotifierProperty(owner, propertyName, notifier, fireAlways = false, changedPredicate = null) {\r\n  let _value;\r\n  /**\r\n   * Sets property value and fires event on change.\r\n   * @param {any | (prevValue: any) => any} valueOrFn Property value or callback function with previous value argument.\r\n   */\r\n  const setValue = (valueOrFn) => {\r\n    let value = valueOrFn;\r\n    if (valueOrFn && typeof valueOrFn === \"function\") {\r\n      value = valueOrFn(_value);\r\n    }\r\n    let changed = (changedPredicate || (() => _value !== value))(_value, value);\r\n\r\n    _value = value;\r\n    if (changed || fireAlways) fireChanged();\r\n  };\r\n\r\n  /**\r\n   * Sets property value without firing event.\r\n   * @param {any} value Property value.\r\n   */\r\n  const setValueSilent = (value) => {\r\n    _value = value;\r\n  };\r\n\r\n  /**\r\n   * Returns property value.\r\n   * @returns any\r\n   */\r\n  const getValue = () => {\r\n    return _value;\r\n  };\r\n\r\n  /**\r\n   * Fires event.\r\n   */\r\n  const fireChanged = () => {\r\n    notifier(owner, propertyName, _value);\r\n  };\r\n\r\n  return { propertyName, setValue, setValueSilent, getValue, fireChanged };\r\n}\r\n\r\n/**\r\n * Get ChangeNotifierProperty object simpler.\r\n * @param {any} owner Owner object.\r\n * @param {(sender, property, value) => void} notifier PropertyChangedEvent notifier function.\r\n * @returns\r\n */\r\nfunction ChangeNotifierPropertyCreator(owner, notifier) {\r\n  /**\r\n   * Creates ChangeNotifierProperty object.\r\n   * @param {string} propertyName Property name.\r\n   * @param {boolean} fireAlways Fires event whether value changed or not.\r\n   * @param {((oldValue: any, newValue: any) => boolean) | null} changedPredicate Predicate to decide value has been changed. Equal sign used when it is null.\r\n   * @returns\r\n   */\r\n  const createProperty = (propertyName, fireAlways = false, changedPredicate = null) => {\r\n    return ChangeNotifierProperty(owner, propertyName, notifier, fireAlways, changedPredicate);\r\n  };\r\n\r\n  return { createProperty };\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Utility/EventManagement/ChangeNotifierProperty.js?");

/***/ }),

/***/ "./src/Utility/EventManagement/Event.js":
/*!**********************************************!*\
  !*** ./src/Utility/EventManagement/Event.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Event: () => (/* binding */ Event)\n/* harmony export */ });\n/**\r\n * Runs listener functions when triggered.\r\n * @returns\r\n */\r\nfunction Event(delay, postInvokeFn) {\r\n  const _listeners = [];\r\n  let timeoutId;\r\n\r\n  /**\r\n   * Subscribes listener function.\r\n   * @param {(sender: any, args: any) => void} listener Function listens event triggers.\r\n   */\r\n  const subscribe = (listener) => {\r\n    _listeners.push(listener);\r\n  };\r\n  /**\r\n   * Fires event.\r\n   * @param {any} sender Owner of event.\r\n   * @param {any} args Value attached to event.\r\n   */\r\n  const fireEvent = (sender, args) => {\r\n    if (delay && !isNaN(delay) && delay > 0) {\r\n      if (timeoutId) {\r\n        clearTimeout(timeoutId);\r\n      }\r\n      timeoutId = setTimeout(() => {\r\n        _invoke();\r\n      }, delay);\r\n      return;\r\n    }\r\n    _invoke();\r\n  };\r\n\r\n  const _invoke = (sender, args) => {\r\n    _listeners.forEach((x) => x(sender, args));\r\n    if (postInvokeFn) postInvokeFn();\r\n  };\r\n  return { subscribe, fireEvent };\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Utility/EventManagement/Event.js?");

/***/ }),

/***/ "./src/Utility/EventManagement/PropertyChangedEvent.js":
/*!*************************************************************!*\
  !*** ./src/Utility/EventManagement/PropertyChangedEvent.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PropertyChangedEvent: () => (/* binding */ PropertyChangedEvent)\n/* harmony export */ });\n/* harmony import */ var _Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Event.js */ \"./src/Utility/EventManagement/Event.js\");\n\r\n\r\n/**\r\n * Notifies property value changes to listeners.\r\n * @returns\r\n */\r\nfunction PropertyChangedEvent(delay, postInvokeFn) {\r\n  const _event = (0,_Event_js__WEBPACK_IMPORTED_MODULE_0__.Event)(delay, postInvokeFn);\r\n  /**\r\n   * Fires event.\r\n   * @param {any} sender Owner of event.\r\n   * @param {string} property Name of changed property.\r\n   * @param {any} value Property value.\r\n   */\r\n  const fireEvent = (sender, property, value) => {\r\n    const args = { property, value };\r\n    _event.fireEvent(sender, args);\r\n  };\r\n\r\n  return { subscribe: _event.subscribe, fireEvent };\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Utility/EventManagement/PropertyChangedEvent.js?");

/***/ }),

/***/ "./src/Utility/EventManagement/PropertyChangedListener.js":
/*!****************************************************************!*\
  !*** ./src/Utility/EventManagement/PropertyChangedListener.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PropertyChangedListener: () => (/* binding */ PropertyChangedListener)\n/* harmony export */ });\n/**\r\n * Returns a listener object for PropertyChangedEvent.\r\n * @returns\r\n */\r\nfunction PropertyChangedListener() {\r\n  /**\r\n   * Listens event when both owner and property/predicate matches.\r\n   * @param {((fn: Function) => void)} subscriptionFn Subscription function to listen.\r\n   * @param {(sender: any, property: string, value: any)} listenerFn Listener function. This function is called when event is triggered.\r\n   * @param {any} propOwner Expected owner of property/event.\r\n   * @param {string | (sender: any, property: string) => boolean} propNameOrPredicate Expected property name or predicate to check if listener function should be called.\r\n   */\r\n  const listen = (subscriptionFn, listenerFn, propOwner, propNameOrPredicate) => {\r\n    const checkSender = (sender) => {\r\n      return sender && propOwner ? propOwner === sender : true;\r\n    };\r\n\r\n    const checkProperty = (property) => {\r\n      return !propNameOrPredicate || propNameOrPredicate === \"__any__\" ? true : propNameOrPredicate === property;\r\n    };\r\n\r\n    const predicate = propNameOrPredicate\r\n      ? Object.prototype.toString.call(propNameOrPredicate) === \"[object String]\"\r\n        ? (sender, property) => checkSender(sender) && checkProperty(property)\r\n        : propNameOrPredicate\r\n      : () => true;\r\n\r\n    // let predicate = () => true;\r\n    // if (propNameOrPredicate) {\r\n    //     if(Object.prototype.toString.call(propNameOrPredicate) === \"[object String]\")\r\n    //     {\r\n    //         predicate = (sender, property) => checkSender(sender) && checkProperty(property);\r\n    //     }\r\n    //     else\r\n    //     {\r\n    //         predicate = propNameOrPredicate;\r\n    //     }\r\n    // }\r\n\r\n    subscriptionFn(_getWrappedListener(listenerFn, predicate));\r\n  };\r\n\r\n  /**\r\n   * Listens any property value changed when owner matches.\r\n   * @param {((fn: Function) => void)} subscriptionFn Subscription function to listen.\r\n   * @param {(sender: any, property: string, value: any)} listenerFn Listener function. This function is called when event is triggered.\r\n   * @param {any} propOwner Expected owner of property/event.\r\n   */\r\n  const listenOwnersAnyProperty = (subscriptionFn, listenerFn, propOwner) => {\r\n    listen(subscriptionFn, listenerFn, propOwner);\r\n  };\r\n\r\n  /**\r\n   * Listens event when property/predicate matches.\r\n   * @param {((fn: Function) => void)} subscriptionFn Subscription function to listen.\r\n   * @param {(sender: any, property: string, value: any)} listenerFn Listener function. This function is called when event is triggered.\r\n   * @param {string | (sender: any, property: string) => boolean} property Expected property name or predicate to check if listener function should be called.\r\n   */\r\n  const listenProperty = (subscriptionFn, listenerFn, property) => {\r\n    listen(subscriptionFn, listenerFn, null, property);\r\n  };\r\n\r\n  /**\r\n   * Listens event always.\r\n   * @param {((fn: Function) => void)} subscriptionFn Subscription function to listen.\r\n   * @param {(sender: any, property: string, value: any)} listenerFn Listener function. This function is called when event is triggered.\r\n   */\r\n  const listenAnyProperty = (subscriptionFn, listenerFn) => {\r\n    listen(subscriptionFn, listenerFn, null, null);\r\n  };\r\n\r\n  const _getWrappedListener = (listenerFn, predicate) => {\r\n    return (sender, property, value) => {\r\n      if (predicate(sender, property)) {\r\n        listenerFn(sender, property, value);\r\n      }\r\n    };\r\n  };\r\n\r\n  return { listen, listenOwnersAnyProperty, listenProperty, listenAnyProperty };\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Utility/EventManagement/PropertyChangedListener.js?");

/***/ }),

/***/ "./src/Utility/EventManagement/State.js":
/*!**********************************************!*\
  !*** ./src/Utility/EventManagement/State.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   State: () => (/* binding */ State)\n/* harmony export */ });\n/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Event */ \"./src/Utility/EventManagement/Event.js\");\n/* harmony import */ var _PropertyChangedEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PropertyChangedEvent */ \"./src/Utility/EventManagement/PropertyChangedEvent.js\");\n/* harmony import */ var _PropertyChangedListener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PropertyChangedListener */ \"./src/Utility/EventManagement/PropertyChangedListener.js\");\n/* harmony import */ var _ChangeNotifierProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChangeNotifierProperty */ \"./src/Utility/EventManagement/ChangeNotifierProperty.js\");\n\r\n\r\n\r\n\r\n\r\n/**\r\n * Simple state management mechanism.\r\n * @param {any} owner Owner of state.\r\n * @param {number} delay Event trigger delay, in ms.\r\n */\r\n\r\nfunction State(owner, delay) {\r\n  const _propertyNotifier = (0,_PropertyChangedEvent__WEBPACK_IMPORTED_MODULE_1__.PropertyChangedEvent)();\r\n  const _propertyChangedListener = (0,_PropertyChangedListener__WEBPACK_IMPORTED_MODULE_2__.PropertyChangedListener)();\r\n\r\n  const states = [];\r\n\r\n  const _resetChanged = () => {\r\n    states.forEach((x) => (x.changed = false));\r\n  };\r\n\r\n  const stateChangedEvent = (0,_Event__WEBPACK_IMPORTED_MODULE_0__.Event)(delay, _resetChanged);\r\n\r\n  /**\r\n   * Creates state.\r\n   * @param {string} stateName Name of state.\r\n   * @param {boolean} fireAlways Fires event whether value changed or not.\r\n   * @param {((oldValue: any, newValue: any) => boolean) | null} changedPredicate Predicate to decide value has been changed. Equal sign used when it is null.\r\n   */\r\n  const createState = (stateName, fireAlways = false, changedPredicate = null) => {\r\n    const state = {\r\n      changed: false,\r\n      stateName: stateName,\r\n      property: (0,_ChangeNotifierProperty__WEBPACK_IMPORTED_MODULE_3__.ChangeNotifierProperty)(owner, stateName, _propertyNotifier.fireEvent, fireAlways, changedPredicate),\r\n      getState: getState.bind(null, stateName),\r\n      setState: setState.bind(null, stateName),\r\n    };\r\n    _propertyChangedListener.listenAnyProperty(_propertyNotifier.subscribe, _propertyChangedHandler);\r\n    states.push(state);\r\n    return state;\r\n  };\r\n\r\n  /**\r\n   * Sets state value.\r\n   * @param {string} stateName Name of state.\r\n   * @param {any | (prevValue: any) => any} value New value or callback function with previous value argument.\r\n   */\r\n  const setState = (stateName, value) => {\r\n    const state = _findState(stateName);\r\n    if (state) {\r\n      state.property.setValue(value);\r\n    }\r\n  };\r\n\r\n  /**\r\n   * Returns state value.\r\n   * @param {any} stateName Name of state.\r\n   * @returns\r\n   */\r\n  const getState = (stateName) => {\r\n    let result = null;\r\n    const state = _findState(stateName);\r\n    if (state) {\r\n      result = state.property.getValue();\r\n    }\r\n    return result;\r\n  };\r\n\r\n  const _findState = (stateName) => {\r\n    return states.find((x) => x.stateName === stateName);\r\n  };\r\n\r\n  const _propertyChangedHandler = (sender, property) => {\r\n    const state = _findState(property);\r\n    if (state) {\r\n      state.changed = true;\r\n    }\r\n    stateChangedEvent.fireEvent(\r\n      owner,\r\n      states.filter((x) => x.changed)\r\n    );\r\n  };\r\n\r\n  return { states, stateChangedEvent: stateChangedEvent.subscribe, createState, setState, getState };\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Utility/EventManagement/State.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Component_BodyComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component/BodyComponent.js */ \"./src/Component/BodyComponent.js\");\n/* harmony import */ var _Component_Tab_TabItemComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Component/Tab/TabItemComponent */ \"./src/Component/Tab/TabItemComponent.js\");\nconsole.log(\"Script works\");\r\n\r\n\r\n\r\n\r\nconst tab1 = new _Component_Tab_TabItemComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_Component_BodyComponent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"], { text: \"Tab Item\" });\r\n_Component_BodyComponent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].render();\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;