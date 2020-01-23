import { Component} from '@angular/core';
import {DeclarationsComponent} from '../declarations.component';
import {Router} from '@angular/router';
import {ApplicationStateService} from '../../../application-state.service';
import {HttpHandlerService} from "../../../http-handler.service";
import {AuthService} from "../../../account/auth.service";

@Component({
  selector: 'app-desktop-declarations',
  templateUrl: './desktop-declarations.component.html',
  styleUrls: ['./desktop-declarations.component.scss']
})
export class DesktopDeclarationsComponent extends DeclarationsComponent {

  constructor(router: Router, applicationStateService: ApplicationStateService, http: HttpHandlerService, auth: AuthService) {
    super(router, applicationStateService, http, auth);
  }
}
