import { Component } from "../Component";
import ProductItemComponent from "./ProductItemComponent";

export default class ProductItemContainerComponent extends Component {
  constructor({ category, products }) {
    super({ category, products });
  }

  initNode() {
    this.node = document.createElement("li");
    this.node.classList.add("prod-item-container");

    this.headerEl = document.createElement("h1");
    this.headerEl.classList.add("prod-item-container_category");

    this.productItemsEl = document.createElement("ul");
    this.productItemsEl.classList.add("prod-item-container_items");

    this.node.append(this.headerEl, this.productItemsEl);
  }

  initStates() {
    this.bindToState(this.ps.category, (state, getState) => {
      this.headerEl.textContent = getState();
    });

    this.bindToState(this.ps.products, (state, getState) => {
      this.productItemsEl.innerHTML = "";

      const products = getState();
      for (const product of products) {
        const productItemComponent = new ProductItemComponent(product);
        this.productItemsEl.append(productItemComponent.render());
      }
    });
  }
}
