import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

import { ChosenDate } from './../../shared/interfaces/chosen-date';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public dateNow: string;
  public dateForm: FormGroup;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.dateNow = moment().format('yyyy-MM-DD');
    this.sendDate({ dateFrom: this.dateNow, dateTo: '' });

    this.dateForm = new FormGroup({
      dateFrom: new FormControl(this.dateNow),
      dateTo: new FormControl('')
    });
  }

  public sendDate(obj: ChosenDate): void {
    this.sharedService.updateDate(obj);
  }

}
