// Exe 2
import { Element } from './element.js';

export class Select extends Element {
  constructor(containerId, attributes, handlers) {
    super('select', {
      attributes,
      handlers
    });

    super.appendToContainer(document.getElementById(containerId));
  }
}