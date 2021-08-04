import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Airlines } from './../interfaces/airlines';
import { BlockSchema } from './../interfaces/block-schema';
import { ExtendedHotels } from './../models/extended-hotels';
import { ChosenDate } from '../interfaces/chosen-date';
import { ExtendedCountries } from './../models/extended-countries';
import { ExtendedAirlines } from '../models/extended-airlines';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public sharedDate: ChosenDate;
  public sharedCountriesArr: ExtendedCountries[] = [];
  public sharedCheckedCountriesArr: string[] = [];
  public sharedHotelsArr: ExtendedHotels[] = [];
  public sharedCheckedHotels: ExtendedHotels[] = [];
  public sharedAirlinesArr: ExtendedAirlines[] = [];
  public sharedBlockShema: BlockSchema = {
    aboutUs: true,
    countriesList: false,
    hotelList: false,
    ticketList: false
  };

  public date$ = new Observable<ChosenDate>(observer => observer.next(this.sharedDate));
  public countriesArr$ = new Observable<ExtendedCountries[]>(observer => observer.next(this.sharedCountriesArr));
  public checkedCountriesArr$ = new Observable<string[]>(observer => observer.next(this.sharedCheckedCountriesArr));
  public hotelsArr$ = new Observable<ExtendedHotels[]>(observer => observer.next(this.sharedHotelsArr));
  public checkedHotelsArr$ = new Observable<ExtendedHotels[]>(observer => observer.next(this.sharedCheckedHotels));
  public airlinesArr$ = new Observable<ExtendedAirlines[]>(observer => observer.next(this.sharedAirlinesArr));
  public blockSchema$ = new Observable<BlockSchema>(observer => observer.next(this.sharedBlockShema));


  public updateDate(obj: ChosenDate): void {
    this.sharedDate = obj;
  }

  public updateCountries(arr: ExtendedCountries[]): void {
    this.sharedCountriesArr = arr;
  }

  public updateCheckedCountries(arr: string[]): void {
    this.sharedCheckedCountriesArr = arr;
  }

  public updateHotels(arr: ExtendedHotels[]): void {
    this.sharedHotelsArr = arr;
  }

  public updateCheckedHotels(arr: ExtendedHotels[]): void {
    this.sharedCheckedHotels = arr;
  }

  public updateAirlines(arr: ExtendedAirlines[]): void {
    this.sharedAirlinesArr = arr;
  }

  public updateBlockShema(key: string): void {
    for (const prop in this.sharedBlockShema) {
      if (Object.prototype.hasOwnProperty.call(this.sharedBlockShema, prop)) {
        this.sharedBlockShema[prop] = false;
        if (prop === key) {
          this.sharedBlockShema[prop] = true;
        }
      }
    }
  }

}
