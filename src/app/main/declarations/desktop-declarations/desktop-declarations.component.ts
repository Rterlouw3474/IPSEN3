import { Component, OnInit } from '@angular/core';
import {DeclarationsComponent} from '../declarations.component';
import {Router} from '@angular/router';
import {ApplicationStateService} from '../../../application-state.service';

@Component({
  selector: 'app-desktop-declarations',
  templateUrl: './desktop-declarations.component.html',
  styleUrls: ['./desktop-declarations.component.scss']
})
export class DesktopDeclarationsComponent extends DeclarationsComponent {

  constructor(router: Router, applicationStateService: ApplicationStateService) {
    super(router, applicationStateService);
  }

}
