import { AfterContentChecked, Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ExtendedHotels } from './../../shared/models/extended-hotels';
import { SharedService } from './../../shared/services/shared.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements AfterContentChecked {

  hotelsArr: ExtendedHotels[];
  arrForView: ExtendedHotels[];

  page = 1;
  pageSize = 10;
  collectionSize: number;
  checkedHotels: ExtendedHotels[] = [];

  constructor(private sharedService: SharedService) { }

  ngAfterContentChecked(): void {
    this.sharedService.hotelsArr$.subscribe(res => this.hotelsArr = res);
    this.collectionSize = this.hotelsArr.length;
    this.onPageChange();
  }

  onSubmit(ref: NgForm): void {
    for (const key in ref.form.controls) {
      if (Object.prototype.hasOwnProperty.call(ref.form.controls, key)) {
        const element = ref.form.controls[key];
        if (element.value) {
          const hotel = this.hotelsArr.find(el => el.name === key);
          if (!this.checkedHotels.includes(hotel)) {
            this.checkedHotels.push(hotel);
            this.sharedService.updateCheckedHotels(this.checkedHotels);
          }
          this.hotelsArr.find(el => el.name === key).isChecked = true;
        }
      }
    }
  }

  onUnCheck(ref: HTMLInputElement): void {
    if (!ref.checked) {
      if (this.checkedHotels.find(el => el.name === ref.title)) {
        this.checkedHotels = this.checkedHotels.filter(el => el.name !== ref.title);
        this.sharedService.updateCheckedHotels(this.checkedHotels);
      }
      this.hotelsArr.forEach(el => {
        if (el.name === ref.title) {
          el.isChecked = false;
        }
      });
    }

  }

  onPageChange(): void {
    const startIndex = this.pageSize * (this.page - 1);
    this.arrForView = this.hotelsArr.slice(startIndex, startIndex + this.pageSize);
  }

}
