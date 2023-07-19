import { Component } from "./Component";
import TabContainerComponent from "./Tab/TabContainerComponent";

function dummyContent(title) {
  const el = document.createElement("h1");
  el.textContent = title;
  return el;
}

export default class PageComponent extends Component {
  initNode() {
    this.node = document.createElement("div");

    this.headerEl = document.createElement("header");
    this.mainEl = document.createElement("main");
    this.footerEl = document.createElement("footer");

    this.node.append(this.headerEl, this.mainEl, this.footerEl);

    this._initHeader();
    this._initFooter();
  }

  initStates() {
    this.activeContentState = this.createState("activeContent", document.createElement("div"), true);

    this.bindToState(this.activeContentState, (state, getState) => {
      this.mainEl.innerHTML = "";
      this.mainEl.appendChild(getState());
    });
  }

  _initHeader() {
    const tabs = [
      { title: "Home", active: true, content: dummyContent("Home") },
      { title: "Menu", active: false, content: dummyContent("Menu") },
      { title: "Contact", active: false, content: dummyContent("Contact") },
    ];
    const tabContainer = new TabContainerComponent({ title: "Kebab House", tabs });
    tabContainer.activeContentChanged.subscribe((sender, { content }) => this.activeContentState.setState(content));
    this.headerEl.appendChild(tabContainer.render());
  }

  _initFooter() {
    this.footerEl.insertAdjacentHTML("afterbegin", "<h1>Footer</h1>");
  }
}
