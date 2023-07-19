/**
 * Dummy body component to add Components inside of it.
 */
export default (() => {
  const node = document.body;
  const children = [];
  const render = () => {
    children.forEach((x) => x.render());
  };

  return { node, children, render };
})();
