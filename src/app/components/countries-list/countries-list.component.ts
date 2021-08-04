import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SharedService } from './../../shared/services/shared.service';
import { ExtendedCountries } from './../../shared/models/extended-countries';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent implements OnInit, AfterContentChecked {


  public page = 1;
  public pageSize = 10;
  public collectionSize: number;
  public countriesArr: ExtendedCountries[];
  public arrForView: ExtendedCountries[];
  public checkedCountriesArr: string[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {

  }
  ngAfterContentChecked(): void {
    this.sharedService.countriesArr$.subscribe(res => this.countriesArr = res);
    this.collectionSize = this.countriesArr.length;
    this.onPageChange();
  }

  onPageChange(): void {
    const startIndex = this.pageSize * (this.page - 1);
    this.arrForView = this.countriesArr.slice(startIndex, startIndex + this.pageSize);
  }

  onSubmit(ref: NgForm): void {
    for (const key in ref.form.controls) {
      if (Object.prototype.hasOwnProperty.call(ref.form.controls, key)) {
        const element = ref.form.controls[key];
        if (element.value) {
          if (!this.checkedCountriesArr.includes(key)) {
            this.checkedCountriesArr.push(key);
            this.sharedService.updateCheckedCountries(this.checkedCountriesArr);
          }
          this.countriesArr.find(el => el.name === key).isChecked = true;
        }
      }
    }
  }

  onUnCheck(ref: HTMLInputElement): void {
    if (!ref.checked) {
      if (this.checkedCountriesArr.includes(ref.title)) {
        this.checkedCountriesArr = this.checkedCountriesArr.filter(el => el !== ref.title);
        this.sharedService.updateCheckedCountries(this.checkedCountriesArr);
      }
      this.countriesArr.forEach(el => {
        if (el.name === ref.title) {
          el.isChecked = false;
        }
      });
    }
  }

}
