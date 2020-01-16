import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApplicationStateService} from '../../../application-state.service';
import {HttpHandlerService} from '../../../http-handler.service';
import {AuthService} from '../../../account/auth.service';
import {DashboardComponent} from '../dashboard.component';

@Component({
  selector: 'app-mobile-dashboard',
  templateUrl: './mobile-dashboard.component.html',
  styleUrls: ['./mobile-dashboard.component.scss']
})
export class MobileDashboardComponent extends DashboardComponent {

  constructor(router: Router, applicationStateService: ApplicationStateService, http: HttpHandlerService, auth: AuthService) {
    super(router, applicationStateService, http, auth);
  }
}
