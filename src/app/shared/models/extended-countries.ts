import { Countries } from './../interfaces/countries';

export class ExtendedCountries {
  name: string;
  travelStatus: boolean;
  hotelsCount: number;
  isChecked: boolean;

  constructor(obj: Countries) {
    this.name = obj.name;
    this.travelStatus = obj.travelStatus;
    this.hotelsCount = 0;
    this.isChecked = false;
  }
}
