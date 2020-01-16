import {Component, OnInit, ViewChild} from '@angular/core';
import {DeclarationsComponent} from '../declarations.component';
import {Router} from '@angular/router';
import {ApplicationStateService} from '../../../application-state.service';
import {HttpHandlerService} from "../../../http-handler.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../../account/auth.service";
import {Sort} from '@angular/material';


export interface Declaration {
  datum: number;
  kilometers: number;
  bedrag: number;
  omschrijving: string;
  auto: string;
}

@Component({
  selector: 'app-desktop-declarations',
  templateUrl: './desktop-declarations.component.html',
  styleUrls: ['./desktop-declarations.component.scss']
})
export class DesktopDeclarationsComponent extends DeclarationsComponent {
  show: boolean = false;

  declarations: Declaration[] = [
    {omschrijving: 'Test 04', datum: 159, kilometers: 6, bedrag: 24, auto: 'Fiat'},
    {omschrijving: '120', datum: 356, kilometers: 200, bedrag: 49, auto: 'Test'},
    {omschrijving: 'Test 01', datum: 10022001, kilometers: 80, bedrag: 5, auto: 'Audi'},
    {omschrijving: 'Test 16', datum: 120, kilometers: 99, bedrag: 22, auto: 'Lambo'},
    {omschrijving: 'Test 10', datum: 5, kilometers: 368, bedrag: 102, auto: 'Zetta'},
  ];

  sortedData: Declaration[];

  constructor(router: Router, applicationStateService: ApplicationStateService, http: HttpHandlerService, auth:AuthService) {
    super(router, applicationStateService, http, auth);
    this.sortedData = this.declarations.slice();
  }

  sortData(sort: Sort) {
    const data = this.declarations.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'omschrijving': return compare(a.omschrijving, b.omschrijving, isAsc);
        case 'datum': return compare(a.datum, b.datum, isAsc);
        case 'kilometers': return compare(a.kilometers, b.kilometers, isAsc);
        case 'bedrag': return compare(a.bedrag, b.bedrag, isAsc);
        case 'auto': return compare(a.auto, b.auto, isAsc);
        default: return 0;
      }
    });
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
