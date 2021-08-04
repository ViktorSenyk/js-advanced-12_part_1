import { BlockSchema } from './../../shared/interfaces/block-schema';
import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { SharedService } from './../../shared/services/shared.service';
import { ExtendedCountries } from './../../shared/models/extended-countries';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterContentChecked {

  public countriesArr: ExtendedCountries[];
  public blockSchema: BlockSchema;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }
  ngAfterContentChecked(): void {
    this.sharedService.countriesArr$.subscribe(res => this.countriesArr = res);
    this.sharedService.blockSchema$.subscribe(res => this.blockSchema = res);
  }
}
