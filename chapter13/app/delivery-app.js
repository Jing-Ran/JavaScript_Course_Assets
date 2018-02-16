import { DataAccessLayer } from './data-access-layer.js';
import { FleetManager } from './fleet-manager.js';
import { UiManager } from './ui/ui-manager.js';

export class Application {
  constructor(name) {
    this.name = name;
  }

  initialize(url) {
    this.dal = new DataAccessLayer();

    this.dal.loadData(url).then(() => {
      this.fleetManager = new FleetManager(this.dal.fleetData);
      this.map = this.uiManager.addMap('gMap', { lat: 50.909698, lng: -
          1.404351 });
      this.addVehicleMarkers(this.fleetManager.fleet);
      this.infoWindow = this.map.addInfoWindow();

      // Exe 2: add options
      this.addOptsToSelect(this.getCapacity(this.fleetManager.fleet));
    });

    this.uiManager = new UiManager();
    this.uiManager.addTitle('titleContainer', this.name);

    // Exe 5: refactor file
    this.uiManager.createButtons('buttons', this, [
      {
        text: 'Show Motorcycles',
        vehicles: () => {
          return this.fleetManager.filterByType('motorbike');
        }
      },
      {
        text: 'Show Vans',
        vehicles: () => {
          return this.fleetManager.filterByType('van');
        }
      },
      {
        text: 'Show Flights',
        vehicles: () => {
          return this.fleetManager.filterByType('flight');
        }
      },
      {
        text: 'Show All',
        vehicles: () => {
          return this.fleetManager.fleet;
        }
      },
      {
        text: 'Vans with Fridge',
        vehicles: () => {
          return this.fleetManager.filterByFeature('refrigerated');
        }
      },
      {
        text: 'Motors with Secure Doc Storage',
        vehicles: () => {
          return this.fleetManager.filterByFeature('secureDocumentStorage');
        }
      },
      {
        text: 'International Flights',
        vehicles: () => {
          return this.fleetManager.filterByFeature('international');
        }
      }
    ]);
    

    // Exe 2: add select
    this.uiManager.addSelect('selection', 
      {
        id: 'cap-select'
      }, 
      [{
      name: 'change',
      handler: (e) => {
        if (this.map && e.target.value) {
          this.removeVehicleMarkers();
          this.addVehicleMarkers(this.fleetManager
            .filterByCapacity(parseInt(e.target.value.split('ft2')[0])));
        }
      }
    }]);
    
    // Exe 3: add text input
    this.uiManager.addTextInput('txtinput', 
      {
        type: 'text',
        placeholder: 'Filter by license'
      }, 
      [{
        name: 'keyup',
        handler: (e) => {
          if (this.map && e.key === 'Enter') {
            this.removeVehicleMarkers();
            let result = [this.fleetManager
              .getByLicense(e.target.value.toUpperCase())];
            this.addVehicleMarkers(result);
          }
        }
      }]
    );
  }

  addVehicleMarkers(vehicles) {
    this.map.markers = [];

    vehicles.forEach(vehicle => {
      let marker = this.map.addMarker(vehicle.location);
      let template =
        `<p><strong>Type</strong>:&nbsp;<span class="pull-right">${vehicle.type}</span></p>
                            <p><strong>License</strong>:&nbsp;<span class="pull-right">${vehicle.license}</span></p>
                            <p><strong>Capacity</strong>:&nbsp;<span class="pull-right">${vehicle.capacity}</span></p>`;

      if (vehicle.secureDocumentStorage) template +=
        `<p><strong>Secure document storage</strong>&nbsp;<span class="pull-right glyphicon glyphicon-ok"></span></p>`;
      if (vehicle.refrigerated) template +=
        `<p><strong>Refrigerated</strong>&nbsp;<span class="pull-right glyphicon glyphicon-ok"></span></p>`;
      if (vehicle.international) template +=
        `<p><strong>International</strong>&nbsp;<span class="pull-right glyphicon glyphicon-ok"></span></p>`;

      marker.addListener('click', () => {
        // console.log(template);
        this.infoWindow.setContent(template);
        this.infoWindow.open(this.map, marker);
      });

      this.map.markers.push(marker);
    });
  }

  removeVehicleMarkers() {
    if (this.map.markers) this.map.markers.forEach(marker => marker.setMap(
      null));
  }

  // Exe 2: get all capacity data and dedupe
  getCapacity(vehicles) {
    let capacities = [];
    vehicles.forEach(vehicle => {
      capacities.push(vehicle.capacity);
    });
    return new Set(capacities);
  }

  // Exe 2: add deduped capacity data to select options
  addOptsToSelect(options) {
    this.uiManager.addOption('cap-select', '-Filter by capacity-');
    options.forEach(opt => {
      this.uiManager.addOption('cap-select', opt);
    });
  }
}