import { Hotels } from './../interfaces/hotels';

export class ExtendedHotels {
  countryName: string;
  city: string;
  name: string;
  availableFrom: Date;
  availableUntil: Date;
  availablePlaces: number;
  isChecked: boolean;

  constructor(obj: Hotels) {
    this.countryName = obj.countryName;
    this.city = obj.city;
    this.name = obj.name;
    this.availableFrom = obj.availableFrom;
    this.availableUntil = obj.availableUntil;
    this.availablePlaces = obj.availablePlaces;
    this.isChecked = false;
  }
}
