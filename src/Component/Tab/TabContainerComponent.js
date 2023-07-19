import { Event } from "../../Utility/EventManagement/Event";
import { Component } from "../Component";
import TabItemComponent from "./TabItemComponent";

export default class TabContainerComponent extends Component {
  constructor({ title, tabs }) {
    super({ title, tabs });
    this._tabContentPair = [];
    this.activeContentChanged = Event();
  }

  initNode() {
    this.node = document.createElement("div");

    this.titleEl = document.createElement("h1");
    this.titleEl.classList.add("brand");

    this.tabContainerEl = document.createElement("div");

    this.node.append(this.titleEl, this.tabContainerEl);
  }

  initStates() {
    this.bindToState(this.titlePropState, (state, getState) => {
      this.titleEl.textContent = getState();
    });
    this.bindToState(this.tabsPropState, (state, getState) => {
      this._createTabItems(getState());
      this.tabContainerEl.innerHTML = "";
      this._tabContentPair.forEach((x) => {
        this.tabContainerEl.appendChild(x.tab.node);
        x.tab.render();
      });
    });
  }

  _createTabItems(tabs) {
    tabs.forEach((tab) => {
      const tabItemComponent = new TabItemComponent({ text: tab.title, active: tab.active });
      tabItemComponent.clickedEvent.subscribe(this._tabClickedHandler.bind(this));
      this._tabContentPair.push({ tab: tabItemComponent, content: tab.content });
    });
  }

  _tabClickedHandler(sender, args) {
    this._tabContentPair.forEach((x) => (x.tab.props.active = false));
    const { tab, content } = this._tabContentPair.find((x) => x.tab === sender);
    tab.props.active = true;
    this.activeContentChanged.fireEvent(this, { content });
  }
}
