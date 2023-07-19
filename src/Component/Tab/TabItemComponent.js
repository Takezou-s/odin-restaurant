import { Event } from "../../Utility/EventManagement/Event";
import { PropertyChangedEvent } from "../../Utility/EventManagement/PropertyChangedEvent";
import { PropertyChangedListener } from "../../Utility/EventManagement/PropertyChangedListener";
import { Component } from "../Component";

export default class TabItemComponent extends Component {
  constructor(parent, props) {
    super(parent, props);
    this.clickedEvent = Event();
  }

  initNode() {
    this.node = document.createElement("button");
    this.node.addEventListener("click", (event) => this.clickedEvent.fireEvent(this, { event }));
    this.node.addEventListener("click", () => {
      this.countState.setState((x) => ++x);
    });
  }

  reflectProps() {
    this.node.textContent = this.props.text + this.countState.getState();
  }

  initStates() {
    this.countState = this.createState("count", 0);

    this.bindToState(this.countState, () => (this.node.textContent = this.props.text + this.countState.getState()));
  }
}
