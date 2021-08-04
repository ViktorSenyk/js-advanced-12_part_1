import { AfterContentChecked, Component } from '@angular/core';

import { SharedService } from './shared/services/shared.service';
import { ChosenDate } from './shared/interfaces/chosen-date';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked {

  public date: ChosenDate;


  constructor(private sharedService: SharedService) { }

  ngAfterContentChecked(): void {
    this.sharedService.date$.subscribe(
      res => this.date = res
    );
  }

}
