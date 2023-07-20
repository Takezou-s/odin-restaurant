import { Component } from "./Component";
import MenuComponent from "./PageContent/MenuComponent";
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

    this._initContents();
    this._initHeader();
    this._initFooter();
  }

  initStates() {
    this.activeContentState = this.createState("activeContent", document.createElement("div"), true);

    this.bindToState(this.activeContentState, (state, getState) => {
      let content = getState();
      if (content.render) content = content.render();
      this.mainEl.innerHTML = "";
      this.mainEl.appendChild(content);
    });
  }

  _initContents() {
    const description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget euismod turpis. Quisque cursus ipsum eu ex imperdiet, non blandit urna accumsan. Phasellus velit ligula, luctus non fringilla in, cursus vel metus. Donec scelerisque pellentesque nibh. Quisque maximus elit sed dolor tincidunt, in ullamcorper purus blandit. Aliquam id est quis ipsum eleifend volutpat. Sed egestas tortor ac metus placerat, nec mollis velit lobortis. In sed consequat velit. Mauris id dignissim neque. Nunc tristique, metus a.";
    const categoriedProducts = [
      {
        category: "Burger",
        products: [
          { title: "Chicken (Grilled or Fried)", description, price: 20, image: "https://picsum.photos/200" },
          { title: "Black Bean Veggie Burger", description, price: 10, image: "https://picsum.photos/200" },
          { title: "Cheese and Bacon Burger", description, price: 15, image: "https://picsum.photos/200" },
          { title: "Ham and Chicken Burger", description, price: 25, image: "https://picsum.photos/200" },
        ],
      },
      {
        category: "Toppings",
        products: [
          { title: "Beef Bacon", description, price: 20, image: "https://picsum.photos/200" },
          { title: "Fresh Avocado", description, price: 10, image: "https://picsum.photos/200" },
          { title: "Cheese", description, price: 15, image: "https://picsum.photos/200" },
        ],
      },
      {
        category: "Fries & Rings",
        products: [
          { title: "French Fries", description, price: 25, image: "https://picsum.photos/200" },
          { title: "Mooyah Fries", description, price: 15, image: "https://picsum.photos/200" },
          { title: "Onion Rings", description, price: 10, image: "https://picsum.photos/200" },
          { title: "Sweet Potato Fries", description, price: 20, image: "https://picsum.photos/200" },
        ],
      },
      {
        category: "Drinks",
        products: [
          { title: "Beer", description, price: 25, image: "https://picsum.photos/200" },
          { title: "Fruit Juice", description, price: 15, image: "https://picsum.photos/200" },
        ],
      },
    ];
    this.menuContent = new MenuComponent({ categoriedProducts });
  }

  _initHeader() {
    const tabs = [
      { title: "Home", active: true, content: dummyContent("Home") },
      { title: "Menu", active: false, content: this.menuContent },
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
