// Exe 3
import { Element } from './element.js';

export class TextInput extends Element {
  constructor(containerId, attributes, handlers) {
    super('input', {
      attributes,
      handlers
    });

    super.appendToContainer(document.getElementById(containerId));
  }
}