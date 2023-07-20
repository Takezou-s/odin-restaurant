import { Component } from "../Component";
import ProductItemContainerComponent from "../Product/ProductItemContainerComponent";

export default class MenuComponent extends Component {
  constructor({ categoriedProducts }) {
    super({ categoriedProducts });
  }

  initNode() {
    this.node = document.createElement("div");
    this.node.classList.add("menu");

    this.titleEl = document.createElement("h1");
    this.titleEl.classList.add("menu-header");
    this.titleEl.textContent = "Menu";

    this.contentEl = document.createElement("ul");
    this.contentEl.classList.add("menu-prods");

    this.node.append(this.titleEl, this.contentEl);
  }

  initStates() {
    this.bindToState(this.ps.categoriedProducts, (state, getState) => {
      const categoriedProds = getState();

      this.contentEl.innerHTML = "";
      for (const prod of categoriedProds) {
        const productItemContainer = new ProductItemContainerComponent(prod);
        this.contentEl.append(productItemContainer.render());
      }
    });
  }
}
