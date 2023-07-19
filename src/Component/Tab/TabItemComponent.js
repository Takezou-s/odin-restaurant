import { Event } from "../../Utility/EventManagement/Event";
import { Component } from "../Component";

export default class TabItemComponent extends Component {
  constructor({ text, active }) {
    super({ text, active });
    this.clickedEvent = Event();
  }

  initNode() {
    this.node = document.createElement("button");
    this.node.addEventListener("click", (event) => {
      this.clickedEvent.fireEvent(this, { event });
    });
    this.node.addEventListener("click", () => {
      this.countState.setState((x) => ++x);
    });
  }

  initStates() {
    this.countState = this.createState("count", 0);

    this.bindToState(this.countState, (state, getState) => {
      const propText = this.props.text;
      const countStateVal = getState();
      this.node.textContent = propText + " " + countStateVal;
    });

    this.bindToState(this.activePropState, (state, getState) => {
      const active = getState();
      if (active) this.node.classList.add("active");
      else this.node.classList.remove("active");
    });
  }
}
