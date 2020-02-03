import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../account/auth.service';
import {HttpHandlerService} from "../../../http-handler.service";
import {UserService} from "../../../services/user.service";
import {User} from '../../../models/user.model';
import {ProfileComponent} from '../profile.component';
import {ApplicationStateService} from '../../../application-state.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  constructor(private applicationStateService: ApplicationStateService, private auth: AuthService, private http: HttpHandlerService, public userService: UserService) {
  }

  ngOnInit() {}

  toggleSideNav() {
    const elem = document.getElementsByClassName('sidenav')[0];
    const opened = elem.classList.contains('is-open');
    if (opened) {
      elem.classList.remove('is-open');
    } else {
      elem.classList.add('is-open');
    }
  }

  isMobile() {
    return this.applicationStateService.getIsMobileResolution();
  }
}
