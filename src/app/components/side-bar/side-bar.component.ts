import { AfterContentChecked, Component } from '@angular/core';
import * as moment from 'moment';

import { Airlines } from './../../shared/interfaces/airlines';
import { ExtendedHotels } from './../../shared/models/extended-hotels';
import { Hotels } from './../../shared/interfaces/hotels';
import { ExtendedCountries } from './../../shared/models/extended-countries';
import { ChosenDate } from './../../shared/interfaces/chosen-date';
import { SharedService } from '../../shared/services/shared.service';
import { HttpService } from './../../shared/services/http.service';
import { Countries } from './../../shared/interfaces/countries';
import { ExtendedAirlines } from 'src/app/shared/models/extended-airlines';



@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements AfterContentChecked {

  public date: ChosenDate;
  public searchDate: ChosenDate;
  public modal = false;
  public message: string;
  public hotelsArr: ExtendedHotels[];
  public checkedHotelsArr: ExtendedHotels[];
  public duplicateCheckedHotelArr: ExtendedHotels[] = [];
  public countriesArr: ExtendedCountries[];
  public checkedCountriesArr: string[];

  constructor(private sharedService: SharedService, private httpService: HttpService) { }

  ngAfterContentChecked(): void {
    this.sharedService.date$.subscribe(res => this.date = res);
    this.sharedService.checkedCountriesArr$.subscribe(res => this.checkedCountriesArr = res);
    this.sharedService.checkedHotelsArr$.subscribe(res => this.checkedHotelsArr = res);
  }

  toggleModal(msg: string = ''): void {
    if (msg !== '') {
      this.message = msg;
    }
    this.modal = !this.modal;
  }

  showCountries(): void {
    if (this.searchDate === this.date) {
      this.sharedService.updateBlockShema('countriesList');
      return;
    }
    if (this.date.dateTo !== '') {
      if (moment(this.date.dateFrom).isAfter(this.date.dateTo)) {
        this.toggleModal('Date can not be in the past. Please check and correct!');
        return;
      }
      this.getFilteredCountries(this.date);
      this.searchDate = this.date;
      this.sharedService.sharedCheckedCountriesArr.length = 0;
      this.sharedService.sharedCheckedHotels.length = 0;
      this.sharedService.sharedAirlinesArr.length = 0;
      return;
    }
    this.getAllCountries();
    this.searchDate = this.date;
    this.sharedService.sharedCheckedCountriesArr.length = 0;
    this.sharedService.sharedCheckedHotels.length = 0;
    this.sharedService.sharedAirlinesArr.length = 0;
  }

  getAllCountries(): void {
    this.httpService.getCountries().subscribe(
      (res: Countries[]) => {
        this.countriesArr = res.map(el => new ExtendedCountries(el));
      },
      (err: Error) => alert(err.message),
      () => {
        this.httpService.getHotels().subscribe(
          (res: Hotels[]) => {
            this.hotelsArr = res.map(el => new ExtendedHotels(el));
            res.forEach(el => {
              this.countriesArr.find(prop => prop.name === el.countryName).hotelsCount += 1;
            });
          },
          (err: Error) => alert(err.message),
          () => {
            this.sharedService.updateCountries(this.countriesArr);
            this.sharedService.updateBlockShema('countriesList');
          }
        );
      }
    );
  }

  getFilteredCountries(obj: ChosenDate): void {
    this.httpService.getHotels().subscribe(
      (res: Hotels[]) => {
        this.hotelsArr = res.filter(
          el => moment(obj.dateFrom).isBefore(el.availableUntil) && moment(obj.dateTo).isAfter(el.availableFrom))
          .map(el => new ExtendedHotels(el));
      },
      (err: Error) => alert(err.message),
      () => {
        this.httpService.getCountries().subscribe(
          (res: Countries[]) => {
            this.countriesArr = res.map(el => new ExtendedCountries(el));
          },
          (err: Error) => alert(err.message),
          () => {
            this.hotelsArr.forEach(el => {
              this.countriesArr.find(prop => prop.name === el.countryName).hotelsCount += 1;
            });
            this.countriesArr = this.countriesArr.filter(el => el.travelStatus === false || el.hotelsCount > 0);
            this.sharedService.updateCountries(this.countriesArr);
            this.sharedService.updateBlockShema('countriesList');
          }
        );
      }
    );
  }

  showHotels(): void {
    if (this.checkedCountriesArr.length === 0) {
      this.toggleModal('First select your destination country or countries!');
      return;
    }
    const filteredHotelsArr = this.hotelsArr.filter(hotel => {
      for (const country of this.checkedCountriesArr) {
        if (hotel.countryName === country) {
          return hotel;
        }
      }
    });
    this.sharedService.updateHotels(filteredHotelsArr);
    this.sharedService.updateBlockShema('hotelList');
  }

  showAirlines(): void {
    if (this.changesCheck() && this.checkedCountriesArr.length !== 0 && this.checkedHotelsArr.length !== 0) {
      this.sharedService.updateBlockShema('ticketList');
      return;
    }
    if (this.checkedCountriesArr.length === 0 || this.checkedHotelsArr.length === 0) {
      this.toggleModal('Please select a country and a hotel first!');
      return;
    }

    this.duplicateCheckedHotelArr = this.checkedHotelsArr;

    const citysArr: string[] = [];
    for (const key in this.checkedHotelsArr) {
      if (Object.prototype.hasOwnProperty.call(this.checkedHotelsArr, key)) {
        const element = this.checkedHotelsArr[key];
        if (!citysArr.includes(element.city)) {
          citysArr.push(element.city);
        }
      }
    }
    if (this.searchDate.dateTo === '') {
      this.getAllAirlines(citysArr);
      return;
    } else {
      this.getFilteredAirlines(citysArr);
    }
  }

  getAllAirlines(arr: string[]): void {
    this.httpService.getAirlines(arr).subscribe(
      (res: Airlines[]) => {
        const data = res.map(el => new ExtendedAirlines(el));
        this.sharedService.updateAirlines(data);
      },
      (err: Error) => alert(err.message),
      () => this.sharedService.updateBlockShema('ticketList')
    );
  }

  getFilteredAirlines(arr: string[]): void {
    const dateRange = [];
    this.checkedHotelsArr.forEach(el => {
      if (moment(this.searchDate.dateFrom).isAfter(moment(el.availableFrom))) {
        dateRange.push(moment(this.searchDate.dateFrom));
      } else {
        dateRange.push(moment(el.availableFrom));
      }
      if (moment(this.searchDate.dateTo).isBefore(moment(el.availableUntil))) {
        dateRange.push(moment(this.searchDate.dateTo));
      } else {
        dateRange.push(moment(el.availableUntil));
      }
    });
    const minDate = moment.min(dateRange);
    const maxDate = moment.max(dateRange);
    this.httpService.getAirlines(arr).subscribe(
      (res: Airlines[]) => {
        const data = res.filter(airline => {
          if (moment(airline.flightDate).isSameOrAfter(minDate) && moment(airline.flightDate).isSameOrBefore(maxDate)) {
            return true;
          }
        })
          .map(el => new ExtendedAirlines(el));

        this.sharedService.updateAirlines(data);
      },
      (err: Error) => alert(err.message),
      () => this.sharedService.updateBlockShema('ticketList')
    );
  }

  changesCheck(): boolean {
    let check: boolean;
    if (this.duplicateCheckedHotelArr.length !== this.checkedHotelsArr.length) {
      return false;
    }
    for (const key in this.checkedHotelsArr) {
      if (Object.prototype.hasOwnProperty.call(this.checkedHotelsArr, key)) {
        const element = this.checkedHotelsArr[key];
        if (element !== this.duplicateCheckedHotelArr[key]) {
          check = false;
        } else {
          check = true;
        }
      }
    }
    return check;
  }

}

