// Exe 2
import { Element } from './element.js';

export class Option extends Element {
  constructor(containerId, text) {
    super('option', {
      text,
      attributes: {
        value: text
        // disabled,
        // selected
      }
    });

    super.appendToContainer(document.getElementById(containerId));
  }
}