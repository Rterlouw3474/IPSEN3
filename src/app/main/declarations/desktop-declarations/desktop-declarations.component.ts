import {Component, OnInit, ViewChild} from '@angular/core';
import {DeclarationsComponent} from '../declarations.component';
import {Router} from '@angular/router';
import {ApplicationStateService} from '../../../application-state.service';
import {HttpHandlerService} from "../../../http-handler.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../../account/auth.service";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-desktop-declarations',
  templateUrl: './desktop-declarations.component.html',
  styleUrls: ['./desktop-declarations.component.scss']
})
export class DesktopDeclarationsComponent extends DeclarationsComponent implements OnInit{
  show: boolean = false;

  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }


  constructor(router: Router, applicationStateService: ApplicationStateService, http: HttpHandlerService, auth:AuthService) {
    super(router, applicationStateService, http, auth);
  }


}
