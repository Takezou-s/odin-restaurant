console.log("Script works");

import BodyComponent from "./Component/BodyComponent.js";
import TabItemComponent from "./Component/Tab/TabItemComponent";

const tab1 = new TabItemComponent(BodyComponent, { text: "Tab Item" });
BodyComponent.render();
