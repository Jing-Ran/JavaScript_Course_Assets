// Exe 4
import { Vehicle } from './vehicle.js';

export class Flight extends Vehicle {
  constructor(license, capacity, location, international = false) {
    super('flight', license, capacity, location);

    this.international = international;
  }
};