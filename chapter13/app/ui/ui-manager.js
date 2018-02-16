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
  addSelect(containerId, attributes, handlers) {
    new Select(containerId, attributes, handlers);
  }

  addOption(containerId, text, disabled, selected) {
    new Option(containerId, text, disabled, selected);
  }

  // Exe 3
  addTextInput(containerId, attributes, handlers) {
    new TextInput(containerId, attributes, handlers);
  }

  // Exe 5: buttons is an array of all buttons to create, 
  // each button is an obj that contains properties: text, vehicles()
  createButtons(containerId, app, buttons) {
    buttons.forEach(button => {
      this.addButton(containerId, button.text, [{
        name: 'click',
        handler: () => {
          if (app.map) {
            app.removeVehicleMarkers();
            app.addVehicleMarkers(button.vehicles());
          }
        }
      }]);
    });
  }
}