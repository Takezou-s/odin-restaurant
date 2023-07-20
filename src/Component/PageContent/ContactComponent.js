import { Component } from "../Component";

export default class ContactComponent extends Component {
  constructor({ phone, address }) {
    super({ phone, address });
  }

  initNode() {
    this.node = document.createElement("div");
    this.node.classList.add("contact");

    this.phoneEl = document.createElement("p");
    this.phoneEl.classList.add("contact-phone");

    this.addressEl = document.createElement("p");
    this.addressEl.classList.add("contact-address");

    this.node.append(this.phoneEl, this.addressEl);
  }

  initStates() {
    this.bindToState(this.ps.phone, (state, getState) => {
      this.phoneEl.textContent = "Phone: " + getState();
    });

    this.bindToState(this.ps.address, (state, getState) => {
      this.addressEl.textContent = "Address: " + getState();
    });
  }
}
