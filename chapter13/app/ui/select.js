// Exe 2
import { Element } from './element.js';

export class Select extends Element {
  constructor(containerId, handlers) {
    super('select', {
      attributes: {
        id: 'cap-select'
      },
      handlers
    });

    super.appendToContainer(document.getElementById(containerId));
  }
}