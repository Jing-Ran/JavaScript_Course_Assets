import { Title } from './title.js';
import { GoogleMap } from './google-map.js';
import { Button } from './button.js';
import { Select } from './select.js';
import { Option } from './option.js';
import { TextInput } from './input.js';

export class UiManager {
  addTitle(containerId, text) {
    new Title(containerId, text);
  }

  addMap(containerId, centerLatLng) {
    return new GoogleMap(containerId, centerLatLng);
  }

  addButton(containerId, text, handlers) {
    new Button(containerId, text, handlers);
  }

  // Exe 2
  addSelect(containerId, handlers) {
    new Select(containerId, handlers);
  }

  addOption(containerId, text, disabled, selected) {
    new Option(containerId, text, disabled, selected);
  }

  // Exe 3
  addTextInput(containerId, attributes, handlers) {
    new TextInput(containerId, attributes, handlers);
  }
}