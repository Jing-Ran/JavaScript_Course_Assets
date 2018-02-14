export class Element {
  // Exe 2: new feature - add attributes
  constructor(tagName, options) {
    this.element = document.createElement(tagName);

    if (options) {
      if (options.text) this.element.textContent = options.text;

      if (options.classNames) options.classNames.split(' ').forEach(className =>
        this.element.classList.add(className));

      if (options.handlers) options.handlers.forEach(item => this.element.addEventListener(
        item.name, item.handler));

      // Exe 2: add attributes other than class names
      if (options.attributes) {
        for (let prop in options.attributes) {
          this.element.setAttribute(prop, options.attributes[prop]);
        }
      }
    }
  }

  appendToContainer(container) {
    container.appendChild(this.element);
  }
}