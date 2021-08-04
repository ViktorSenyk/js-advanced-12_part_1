import { Airlines } from './../interfaces/airlines';

export class ExtendedAirlines {
  companyName: string;
  goFrom: string;
  goTo: string;
  flightDate: Date;
  isChecked: boolean;

  constructor(obj: Airlines) {
    this.companyName = obj.companyName;
    this.goFrom = obj.goFrom;
    this.goTo = obj.goTo;
    this.flightDate = obj.flightDate;
    this.isChecked = false;
  }
}
