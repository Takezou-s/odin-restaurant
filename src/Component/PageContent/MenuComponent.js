import { Component } from "../Component";
import ProductItemContainerComponent from "../Product/ProductItemContainerComponent";

export default class MenuComponent extends Component {
  constructor({ categoriedProducts }) {
    super({ categoriedProducts });
  }

  initNode() {
    this.node = document.createElement("div");

    this.titleEl = document.createElement("h1");
    this.titleEl.textContent = "Menu";

    this.contentEl = document.createElement("div");

    this.node.append(this.titleEl, this.contentEl);
  }

  initStates() {
    this.bindToState(this.ps.categoriedProducts, (state, getState) => {
      const prods = getState();

      this.contentEl.innerHTML = "";
      for (const prod of prods) {
        const productItemContainer = new ProductItemContainerComponent(prod);
        this.contentEl.append(productItemContainer.render());
      }
    });
  }
}
