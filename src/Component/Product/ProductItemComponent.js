import { Component } from "../Component";

export default class ProductItemComponent extends Component {
  constructor({ title, description, price, image }) {
    super({ title, description, price, image });
  }

  initNode() {
    this.node = document.createElement("li");
    this.node.classList.add("prod-item");

    this.imgEl = document.createElement("img");
    this.imgEl.classList.add("prod-item-img");

    this.headerEl = document.createElement("div");
    this.headerEl.classList.add("prod-item-header");

    this.header_titleEl = document.createElement("h1");
    this.header_titleEl.classList.add("prod-item-header_title");

    this.header_priceEl = document.createElement("h1");
    this.header_priceEl.classList.add("prod-item-header_price");
    this.headerEl.append(this.header_titleEl, this.header_priceEl);

    this.descriptionEl = document.createElement("p");
    this.descriptionEl.classList.add("prod-item-desc");

    this.node.append(this.imgEl, this.headerEl, this.descriptionEl);
  }

  initStates() {
    this.bindToState(this.ps.image, (state, getState) => {
      this.imgEl.setAttribute("src", getState());
    });

    this.bindToState(this.ps.title, (state, getState) => {
      this.header_titleEl.textContent = getState();
    });

    this.bindToState(this.ps.price, (state, getState) => {
      this.header_priceEl.textContent = "$" + getState();
    });

    this.bindToState(this.ps.description, (state, getState) => {
      this.descriptionEl.textContent = getState();
    });
  }
}
