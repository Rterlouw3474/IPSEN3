import { Component, OnInit } from '@angular/core';
import {Declaration} from '../../declarations/declaration.object';
import {HttpHandlerService} from '../../../http-handler.service';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {AuthService} from '../../../account/auth.service';
import {User} from '../../../models/user.model';
import {DatabaseUser} from '../../../models/databaseuser.model';
import {DashboardComponent} from '../dashboard.component';
import {Router} from '@angular/router';
import {ApplicationStateService} from '../../../application-state.service';

@Component({
  selector: 'app-desktop-dashboard',
  templateUrl: './desktop-dashboard.component.html',
  styleUrls: ['./desktop-dashboard.component.scss']
})
export class DesktopDashboardComponent extends DashboardComponent {

  constructor(router: Router, applicationStateService: ApplicationStateService, http: HttpHandlerService, auth: AuthService) {
    super(router, applicationStateService, http, auth);
  }
}
