console.log("Script woqwerks");

import BodyComponent from "./Component/BodyComponent.js";
import PageComponent from "./Component/PageComponent.js";
import TabContainerComponent from "./Component/Tab/TabContainerComponent.js";

// let q = {};
// let w = {};
// function get(s) {
//   return w[s];
// }
// function set(s, v) {
//   w[s] = v;
// }
// const getHandler = {
//   get(target, prop, receiver) {
//     return get(prop);
//   },
// };

// const setHandler = {
//   set(obj, prop, value) {
//     set(prop, value);
//   },
// };

// const proxy = new Proxy(q, setHandler);

document.getElementById("content").appendChild(new PageComponent().render());
