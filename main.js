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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * Dummy body component to add Components inside of it.\r\n */\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {\r\n  const node = document.body;\r\n  const children = [];\r\n  const render = () => {\r\n    children.forEach((x) => {\r\n      node.appendChild(x.node);\r\n      x.render();\r\n    });\r\n  };\r\n\r\n  return { node, children, render };\r\n})());\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Component/BodyComponent.js?");

/***/ }),

/***/ "./src/Component/Component.js":
/*!************************************!*\
  !*** ./src/Component/Component.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Component: () => (/* binding */ Component)\n/* harmony export */ });\n/* harmony import */ var _Utility_EventManagement_State__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/EventManagement/State */ \"./src/Utility/EventManagement/State.js\");\n\r\n\r\n/**\r\n * Component base class. Subclasses should override \"initNode\" method and set value of \"node\" property.\r\n */\r\nclass Component {\r\n  constructor(props) {\r\n    this.update = false;\r\n    this.propStates = [];\r\n    this.stateBinds = [];\r\n    this.states = (0,_Utility_EventManagement_State__WEBPACK_IMPORTED_MODULE_0__.State)(this, 50);\r\n    this.changedStates = [];\r\n    this.states.stateChangedEvent(this._stateChangedHandler.bind(this));\r\n\r\n    if (props) {\r\n      const createStatesFromProps = () => {\r\n        for (const key in props) {\r\n          const value = props[key];\r\n          this[`${key}PropState`] = this.createState(`props.${key}`, value, true);\r\n          this.ps[key] = this[`${key}PropState`];\r\n        }\r\n      };\r\n\r\n      const handler = {\r\n        get: (target, prop, receiver) => {\r\n          return this.getPropValue(prop);\r\n        },\r\n        set: (obj, prop, value) => {\r\n          this.setPropValue(prop, value);\r\n          return true;\r\n        },\r\n      };\r\n\r\n      this.ps = {};\r\n      this.props = new Proxy(Object.assign({}, props), handler);\r\n      createStatesFromProps();\r\n    }\r\n\r\n    if (!this.initNode) throw new Error(\"'initNode' method could not be found!\");\r\n    this.initNode();\r\n    if (!this.node) throw new Error(\"'node' property can not be null!\");\r\n    this.initStates();\r\n  }\r\n  /**\r\n   * Sets prop value.\r\n   * @param {string} propName prop name.\r\n   * @param {any} value New value of prop.\r\n   */\r\n  setPropValue(propName, value) {\r\n    this.states.setState(`props.${propName}`, value);\r\n  }\r\n  /**\r\n   * Gets prop value.\r\n   * @param {string} propName prop name.\r\n   * @returns any\r\n   */\r\n  getPropValue(propName) {\r\n    return this.states.getState(`props.${propName}`);\r\n  }\r\n  /**\r\n   * State creations and bindings are made in this method.\r\n   */\r\n  initStates() {}\r\n  /**\r\n   *\r\n   * @param {string} stateName Name of state.\r\n   * @param {any} initValue Initial value of state.\r\n   * @param {boolean} fireAlways Fires event whether value changed or not.\r\n   * @param {((oldValue: any, newValue: any) => boolean) | null} changedPredicate Predicate to decide value has been changed. Equal sign used when it is null.\r\n   * @returns\r\n   */\r\n  createState(stateName, initValue, fireAlways = false, changedPredicate = null) {\r\n    const state = this.states.createState(stateName, fireAlways, changedPredicate);\r\n    state.property.setValueSilent(initValue);\r\n    return state;\r\n  }\r\n  /**\r\n   *\r\n   * @param {State} state State whose changes are listened.\r\n   * @param {(state: State, getState: () => any) => void} callbackFn State change listener function.\r\n   */\r\n  bindToState(state, callbackFn) {\r\n    this.stateBinds.push({ state, fn: callbackFn });\r\n  }\r\n  /**\r\n   * Reflect state changes to elements.\r\n   */\r\n  reflectStates() {\r\n    if (!this.update || !this.changedStates || this.changedStates.length <= 0) {\r\n      this.stateBinds.forEach((x) => x.fn(x.state, x.state.getState));\r\n    } else {\r\n      this.changedStates.forEach((x) => {\r\n        const stateBind = this.stateBinds.find((y) => y === x || y.stateName === x.stateName);\r\n        if (stateBind) {\r\n          stateBind.fn(stateBind.state, stateBind.state.getState);\r\n        }\r\n      });\r\n      this.changedStates = [];\r\n    }\r\n  }\r\n  /**\r\n   * Reflect props and states to elements.\r\n   */\r\n  reflectToElements() {\r\n    this.reflectStates();\r\n  }\r\n\r\n  /**\r\n   * Renders component.\r\n   */\r\n  render() {\r\n    this.reflectToElements();\r\n    this.update = true;\r\n    return this.node;\r\n  }\r\n\r\n  /**\r\n   * Removes component from document.\r\n   */\r\n  remove() {\r\n    this.node.remove();\r\n  }\r\n\r\n  _stateChangedHandler(sender, args) {\r\n    this.changedStates = args;\r\n    this.render();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Component/Component.js?");

/***/ }),

/***/ "./src/Component/PageComponent.js":
/*!****************************************!*\
  !*** ./src/Component/PageComponent.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PageComponent)\n/* harmony export */ });\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ \"./src/Component/Component.js\");\n/* harmony import */ var _PageContent_MenuComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageContent/MenuComponent */ \"./src/Component/PageContent/MenuComponent.js\");\n/* harmony import */ var _Tab_TabContainerComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tab/TabContainerComponent */ \"./src/Component/Tab/TabContainerComponent.js\");\n\r\n\r\n\r\n\r\nfunction dummyContent(title) {\r\n  const el = document.createElement(\"h1\");\r\n  el.textContent = title;\r\n  return el;\r\n}\r\n\r\nclass PageComponent extends _Component__WEBPACK_IMPORTED_MODULE_0__.Component {\r\n  initNode() {\r\n    this.node = document.createElement(\"div\");\r\n\r\n    this.headerEl = document.createElement(\"header\");\r\n    this.mainEl = document.createElement(\"main\");\r\n    this.footerEl = document.createElement(\"footer\");\r\n\r\n    this.node.append(this.headerEl, this.mainEl, this.footerEl);\r\n\r\n    this._initContents();\r\n    this._initHeader();\r\n    this._initFooter();\r\n  }\r\n\r\n  initStates() {\r\n    this.activeContentState = this.createState(\"activeContent\", document.createElement(\"div\"), true);\r\n\r\n    this.bindToState(this.activeContentState, (state, getState) => {\r\n      let content = getState();\r\n      if (content.render) content = content.render();\r\n      this.mainEl.innerHTML = \"\";\r\n      this.mainEl.appendChild(content);\r\n    });\r\n  }\r\n\r\n  _initContents() {\r\n    const description =\r\n      \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget euismod turpis. Quisque cursus ipsum eu ex imperdiet, non blandit urna accumsan. Phasellus velit ligula, luctus non fringilla in, cursus vel metus. Donec scelerisque pellentesque nibh. Quisque maximus elit sed dolor tincidunt, in ullamcorper purus blandit. Aliquam id est quis ipsum eleifend volutpat. Sed egestas tortor ac metus placerat, nec mollis velit lobortis. In sed consequat velit. Mauris id dignissim neque. Nunc tristique, metus a.\";\r\n    const categoriedProducts = [\r\n      {\r\n        category: \"Burger\",\r\n        products: [\r\n          { title: \"Chicken (Grilled or Fried)\", description, price: 20, image: \"https://picsum.photos/200\" },\r\n          { title: \"Black Bean Veggie Burger\", description, price: 10, image: \"https://picsum.photos/200\" },\r\n          { title: \"Cheese and Bacon Burger\", description, price: 15, image: \"https://picsum.photos/200\" },\r\n          { title: \"Ham and Chicken Burger\", description, price: 25, image: \"https://picsum.photos/200\" },\r\n        ],\r\n      },\r\n      {\r\n        category: \"Toppings\",\r\n        products: [\r\n          { title: \"Beef Bacon\", description, price: 20, image: \"https://picsum.photos/200\" },\r\n          { title: \"Fresh Avocado\", description, price: 10, image: \"https://picsum.photos/200\" },\r\n          { title: \"Cheese\", description, price: 15, image: \"https://picsum.photos/200\" },\r\n        ],\r\n      },\r\n      {\r\n        category: \"Fries & Rings\",\r\n        products: [\r\n          { title: \"French Fries\", description, price: 25, image: \"https://picsum.photos/200\" },\r\n          { title: \"Mooyah Fries\", description, price: 15, image: \"https://picsum.photos/200\" },\r\n          { title: \"Onion Rings\", description, price: 10, image: \"https://picsum.photos/200\" },\r\n          { title: \"Sweet Potato Fries\", description, price: 20, image: \"https://picsum.photos/200\" },\r\n        ],\r\n      },\r\n      {\r\n        category: \"Drinks\",\r\n        products: [\r\n          { title: \"Beer\", description, price: 25, image: \"https://picsum.photos/200\" },\r\n          { title: \"Fruit Juice\", description, price: 15, image: \"https://picsum.photos/200\" },\r\n        ],\r\n      },\r\n    ];\r\n    this.menuContent = new _PageContent_MenuComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ categoriedProducts });\r\n  }\r\n\r\n  _initHeader() {\r\n    const tabs = [\r\n      { title: \"Home\", active: true, content: dummyContent(\"Home\") },\r\n      { title: \"Menu\", active: false, content: this.menuContent },\r\n      { title: \"Contact\", active: false, content: dummyContent(\"Contact\") },\r\n    ];\r\n    const tabContainer = new _Tab_TabContainerComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ title: \"Kebab House\", tabs });\r\n    tabContainer.activeContentChanged.subscribe((sender, { content }) => this.activeContentState.setState(content));\r\n    this.headerEl.appendChild(tabContainer.render());\r\n  }\r\n\r\n  _initFooter() {\r\n    this.footerEl.insertAdjacentHTML(\"afterbegin\", \"<h1>Footer</h1>\");\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Component/PageComponent.js?");

/***/ }),

/***/ "./src/Component/PageContent/MenuComponent.js":
/*!****************************************************!*\
  !*** ./src/Component/PageContent/MenuComponent.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MenuComponent)\n/* harmony export */ });\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ \"./src/Component/Component.js\");\n/* harmony import */ var _Product_ProductItemContainerComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Product/ProductItemContainerComponent */ \"./src/Component/Product/ProductItemContainerComponent.js\");\n\r\n\r\n\r\nclass MenuComponent extends _Component__WEBPACK_IMPORTED_MODULE_0__.Component {\r\n  constructor({ categoriedProducts }) {\r\n    super({ categoriedProducts });\r\n  }\r\n\r\n  initNode() {\r\n    this.node = document.createElement(\"div\");\r\n\r\n    this.titleEl = document.createElement(\"h1\");\r\n    this.titleEl.textContent = \"Menu\";\r\n\r\n    this.contentEl = document.createElement(\"div\");\r\n\r\n    this.node.append(this.titleEl, this.contentEl);\r\n  }\r\n\r\n  initStates() {\r\n    this.bindToState(this.ps.categoriedProducts, (state, getState) => {\r\n      const prods = getState();\r\n\r\n      this.contentEl.innerHTML = \"\";\r\n      for (const prod of prods) {\r\n        const productItemContainer = new _Product_ProductItemContainerComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"](prod);\r\n        this.contentEl.append(productItemContainer.render());\r\n      }\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Component/PageContent/MenuComponent.js?");

/***/ }),

/***/ "./src/Component/Product/ProductItemComponent.js":
/*!*******************************************************!*\
  !*** ./src/Component/Product/ProductItemComponent.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ProductItemComponent)\n/* harmony export */ });\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ \"./src/Component/Component.js\");\n\r\n\r\nclass ProductItemComponent extends _Component__WEBPACK_IMPORTED_MODULE_0__.Component {\r\n  constructor({ title, description, price, image }) {\r\n    super({ title, description, price, image });\r\n  }\r\n\r\n  initNode() {\r\n    this.node = document.createElement(\"li\");\r\n\r\n    this.imgEl = document.createElement(\"img\");\r\n\r\n    this.headerEl = document.createElement(\"div\");\r\n    this.header_titleEl = document.createElement(\"h1\");\r\n    this.header_priceEl = document.createElement(\"h1\");\r\n    this.headerEl.append(this.header_titleEl, this.header_priceEl);\r\n\r\n    this.descriptionEl = document.createElement(\"p\");\r\n\r\n    this.node.append(this.imgEl, this.headerEl, this.descriptionEl);\r\n  }\r\n\r\n  initStates() {\r\n    this.bindToState(this.ps.image, (state, getState) => {\r\n      this.imgEl.setAttribute(\"src\", getState());\r\n    });\r\n\r\n    this.bindToState(this.ps.title, (state, getState) => {\r\n      this.header_titleEl.textContent = getState();\r\n    });\r\n\r\n    this.bindToState(this.ps.price, (state, getState) => {\r\n      this.header_priceEl.textContent = getState() + \" ₺\";\r\n    });\r\n\r\n    this.bindToState(this.ps.description, (state, getState) => {\r\n      this.descriptionEl.textContent = getState();\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Component/Product/ProductItemComponent.js?");

/***/ }),

/***/ "./src/Component/Product/ProductItemContainerComponent.js":
/*!****************************************************************!*\
  !*** ./src/Component/Product/ProductItemContainerComponent.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ProductItemContainerComponent)\n/* harmony export */ });\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ \"./src/Component/Component.js\");\n/* harmony import */ var _ProductItemComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductItemComponent */ \"./src/Component/Product/ProductItemComponent.js\");\n\r\n\r\n\r\nclass ProductItemContainerComponent extends _Component__WEBPACK_IMPORTED_MODULE_0__.Component {\r\n  constructor({ category, products }) {\r\n    super({ category, products });\r\n  }\r\n\r\n  initNode() {\r\n    this.node = document.createElement(\"li\");\r\n\r\n    this.headerEl = document.createElement(\"h1\");\r\n    this.productItemsEl = document.createElement(\"ul\");\r\n\r\n    this.node.append(this.headerEl, this.productItemsEl);\r\n  }\r\n\r\n  initStates() {\r\n    this.bindToState(this.ps.category, (state, getState) => {\r\n      this.headerEl.textContent = getState();\r\n    });\r\n\r\n    this.bindToState(this.ps.products, (state, getState) => {\r\n      this.productItemsEl.innerHTML = \"\";\r\n\r\n      const products = getState();\r\n      for (const product of products) {\r\n        const productItemComponent = new _ProductItemComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"](product);\r\n        this.productItemsEl.append(productItemComponent.render());\r\n      }\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Component/Product/ProductItemContainerComponent.js?");

/***/ }),

/***/ "./src/Component/Tab/TabContainerComponent.js":
/*!****************************************************!*\
  !*** ./src/Component/Tab/TabContainerComponent.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TabContainerComponent)\n/* harmony export */ });\n/* harmony import */ var _Utility_EventManagement_Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utility/EventManagement/Event */ \"./src/Utility/EventManagement/Event.js\");\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Component */ \"./src/Component/Component.js\");\n/* harmony import */ var _TabItemComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabItemComponent */ \"./src/Component/Tab/TabItemComponent.js\");\n\r\n\r\n\r\n\r\nclass TabContainerComponent extends _Component__WEBPACK_IMPORTED_MODULE_1__.Component {\r\n  constructor({ title, tabs }) {\r\n    super({ title, tabs });\r\n    this._tabContentPair = [];\r\n    this.activeContentChanged = (0,_Utility_EventManagement_Event__WEBPACK_IMPORTED_MODULE_0__.Event)();\r\n  }\r\n\r\n  initNode() {\r\n    this.node = document.createElement(\"div\");\r\n\r\n    this.titleEl = document.createElement(\"h1\");\r\n    this.titleEl.classList.add(\"brand\");\r\n\r\n    this.tabContainerEl = document.createElement(\"ul\");\r\n\r\n    this.node.append(this.titleEl, this.tabContainerEl);\r\n  }\r\n\r\n  initStates() {\r\n    this.bindToState(this.titlePropState, (state, getState) => {\r\n      this.titleEl.textContent = getState();\r\n    });\r\n    this.bindToState(this.tabsPropState, (state, getState) => {\r\n      this._createTabItems(getState());\r\n      this.tabContainerEl.innerHTML = \"\";\r\n      this._tabContentPair.forEach((x) => {\r\n        this.tabContainerEl.appendChild(x.tab.node);\r\n        x.tab.render();\r\n      });\r\n    });\r\n  }\r\n\r\n  _createTabItems(tabs) {\r\n    tabs.forEach((tab) => {\r\n      const tabItemComponent = new _TabItemComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ text: tab.title, active: tab.active });\r\n      tabItemComponent.clickedEvent.subscribe(this._tabClickedHandler.bind(this));\r\n      this._tabContentPair.push({ tab: tabItemComponent, content: tab.content });\r\n    });\r\n  }\r\n\r\n  _tabClickedHandler(sender, args) {\r\n    this._tabContentPair.forEach((x) => (x.tab.props.active = false));\r\n    const { tab, content } = this._tabContentPair.find((x) => x.tab === sender);\r\n    tab.props.active = true;\r\n    this.activeContentChanged.fireEvent(this, { content });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Component/Tab/TabContainerComponent.js?");

/***/ }),

/***/ "./src/Component/Tab/TabItemComponent.js":
/*!***********************************************!*\
  !*** ./src/Component/Tab/TabItemComponent.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TabItemComponent)\n/* harmony export */ });\n/* harmony import */ var _Utility_EventManagement_Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utility/EventManagement/Event */ \"./src/Utility/EventManagement/Event.js\");\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Component */ \"./src/Component/Component.js\");\n\r\n\r\n\r\nclass TabItemComponent extends _Component__WEBPACK_IMPORTED_MODULE_1__.Component {\r\n  constructor({ text, active }) {\r\n    super({ text, active });\r\n    this.clickedEvent = (0,_Utility_EventManagement_Event__WEBPACK_IMPORTED_MODULE_0__.Event)();\r\n  }\r\n\r\n  initNode() {\r\n    this.node = document.createElement(\"li\");\r\n    this.buttonEl = document.createElement(\"button\");\r\n    this.buttonEl.addEventListener(\"click\", (event) => {\r\n      this.clickedEvent.fireEvent(this, { event });\r\n    });\r\n    this.buttonEl.addEventListener(\"click\", () => {\r\n      this.countState.setState((x) => ++x);\r\n    });\r\n\r\n    this.node.appendChild(this.buttonEl);\r\n  }\r\n\r\n  initStates() {\r\n    this.countState = this.createState(\"count\", 0);\r\n\r\n    this.bindToState(this.countState, (state, getState) => {\r\n      const propText = this.props.text;\r\n      const countStateVal = getState();\r\n      this.buttonEl.textContent = propText + \" \" + countStateVal;\r\n    });\r\n\r\n    this.bindToState(this.activePropState, (state, getState) => {\r\n      const active = getState();\r\n      if (active) this.node.classList.add(\"active\");\r\n      else this.node.classList.remove(\"active\");\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Component/Tab/TabItemComponent.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Event: () => (/* binding */ Event)\n/* harmony export */ });\n/**\r\n * Runs listener functions when triggered.\r\n * @returns\r\n */\r\nfunction Event(delay, postInvokeFn) {\r\n  const _listeners = [];\r\n  let timeoutId;\r\n\r\n  /**\r\n   * Subscribes listener function.\r\n   * @param {(sender: any, args: any) => void} listener Function listens event triggers.\r\n   */\r\n  const subscribe = (listener) => {\r\n    _listeners.push(listener);\r\n  };\r\n  /**\r\n   * Unsubscribes listener function.\r\n   * @param {(sender: any, args: any) => void} listener Function listens event triggers.\r\n   */\r\n  const unsubscribe = (listener) => {\r\n    if (listener) {\r\n      const index = _listeners.findIndex((x) => x === listener);\r\n      if (index >= 0) {\r\n        _listeners.splice(index, 1);\r\n      }\r\n    }\r\n  };\r\n  /**\r\n   * Clears all subscribers.\r\n   */\r\n  const clearSubscribers = () => {\r\n    _listeners = [];\r\n  };\r\n  /**\r\n   * Fires event.\r\n   * @param {any} sender Owner of event.\r\n   * @param {any} args Value attached to event.\r\n   */\r\n  const fireEvent = (sender, args) => {\r\n    if (delay && !isNaN(delay) && delay > 0) {\r\n      if (timeoutId) {\r\n        clearTimeout(timeoutId);\r\n      }\r\n      timeoutId = setTimeout(() => {\r\n        _invoke();\r\n      }, delay);\r\n      return;\r\n    }\r\n    _invoke(sender, args);\r\n  };\r\n\r\n  const _invoke = (sender, args) => {\r\n    _listeners.forEach((x) => x(sender, args));\r\n    if (postInvokeFn) postInvokeFn();\r\n  };\r\n  return { subscribe, unsubscribe, clearSubscribers, fireEvent };\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Utility/EventManagement/Event.js?");

/***/ }),

/***/ "./src/Utility/EventManagement/PropertyChangedEvent.js":
/*!*************************************************************!*\
  !*** ./src/Utility/EventManagement/PropertyChangedEvent.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PropertyChangedEvent: () => (/* binding */ PropertyChangedEvent)\n/* harmony export */ });\n/* harmony import */ var _Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Event.js */ \"./src/Utility/EventManagement/Event.js\");\n\r\n\r\n/**\r\n * Notifies property value changes to listeners.\r\n * @returns\r\n */\r\nfunction PropertyChangedEvent(delay, postInvokeFn) {\r\n  const _event = (0,_Event_js__WEBPACK_IMPORTED_MODULE_0__.Event)(delay, postInvokeFn);\r\n  /**\r\n   * Fires event.\r\n   * @param {any} sender Owner of event.\r\n   * @param {string} property Name of changed property.\r\n   * @param {any} value Property value.\r\n   */\r\n  const fireEvent = (sender, property, value) => {\r\n    const args = { property, value };\r\n    _event.fireEvent(sender, args);\r\n  };\r\n\r\n  return { subscribe: _event.subscribe, unsubscribe: _event.unsubscribe, clearSubscribers: _event.clearSubscribers, fireEvent };\r\n}\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/Utility/EventManagement/PropertyChangedEvent.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Component_BodyComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component/BodyComponent.js */ \"./src/Component/BodyComponent.js\");\n/* harmony import */ var _Component_PageComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Component/PageComponent.js */ \"./src/Component/PageComponent.js\");\n/* harmony import */ var _Component_Tab_TabContainerComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Component/Tab/TabContainerComponent.js */ \"./src/Component/Tab/TabContainerComponent.js\");\nconsole.log(\"Script woqwerks\");\r\n\r\n\r\n\r\n\r\n\r\n// let q = {};\r\n// let w = {};\r\n// function get(s) {\r\n//   return w[s];\r\n// }\r\n// function set(s, v) {\r\n//   w[s] = v;\r\n// }\r\n// const getHandler = {\r\n//   get(target, prop, receiver) {\r\n//     return get(prop);\r\n//   },\r\n// };\r\n\r\n// const setHandler = {\r\n//   set(obj, prop, value) {\r\n//     set(prop, value);\r\n//   },\r\n// };\r\n\r\n// const proxy = new Proxy(q, setHandler);\r\n\r\ndocument.getElementById(\"content\").appendChild(new _Component_PageComponent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]().render());\r\n\n\n//# sourceURL=webpack://odin-restaurant/./src/index.js?");

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