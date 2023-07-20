import { Component } from "../Component";

export default class HomeComponent extends Component {
  constructor({ title, description }) {
    super({ title, description });
  }

  initNode() {
    this.node = document.createElement("div");
    this.node.classList.add("home");

    this.titleEl = document.createElement("h1");
    this.titleEl.classList.add("home-title");

    this.descEl = document.createElement("p");
    this.descEl.classList.add("home-desc");

    this.node.append(this.titleEl, this.descEl);
  }

  initStates() {
    this.bindToState(this.ps.title, (state, getState) => {
      this.titleEl.textContent = getState();
    });

    this.bindToState(this.ps.description, (state, getState) => {
      this.descEl.textContent = getState();
    });
  }
}
