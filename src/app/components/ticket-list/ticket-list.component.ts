import { AfterContentChecked, Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HttpService } from './../../shared/services/http.service';
import { SharedService } from './../../shared/services/shared.service';
import { ExtendedAirlines } from 'src/app/shared/models/extended-airlines';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements AfterContentChecked {



  page = 1;
  pageSize = 10;
  collectionSize: number;
  airlinesArr: ExtendedAirlines[];
  arrForView: ExtendedAirlines[];

  modal = false;
  message: string;
  confirm: string;

  constructor(private sharedService: SharedService, private httpService: HttpService) { }

  ngAfterContentChecked(): void {
    this.sharedService.airlinesArr$.subscribe(res => this.airlinesArr = res);
    this.collectionSize = this.airlinesArr.length;
    this.onPageChange();
  }

  onPageChange(): void {
    const startIndex = this.pageSize * (this.page - 1);
    this.arrForView = this.airlinesArr.slice(startIndex, startIndex + this.pageSize);
  }

  onUnCheck(ref: HTMLInputElement): void {
    const airline = this.airlinesArr.find(el => el.flightDate.toString() === ref.title);
    airline.isChecked = !airline.isChecked;
  }

  onSubmit(ref: NgForm): void {
    this.toggleModal('Order this tour?', 'Accept');
  }

  toggleModal(msg: string = '', confirm?: string): void {
    this.message = msg;
    if (confirm) {
      this.confirm = confirm;
    }
    this.modal = !this.modal;
  }

  ifConfirm(): void {
    this.httpService.orderTour().subscribe(
      (res) => {
        this.message = res as unknown as string;
        this.confirm = undefined;
      }
    );
  }

}
