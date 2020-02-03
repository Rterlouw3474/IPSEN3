import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../account/auth.service';
import {HttpHandlerService} from "../../http-handler.service";
import {UserService} from "../../services/user.service";
import {User} from '../../models/user.model';
import {ApplicationStateService} from '../../application-state.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  opened: boolean;

  constructor(private applicationStateService: ApplicationStateService, private auth: AuthService, private http: HttpHandlerService, public userService:UserService) { }

  ngOnInit() {
    this.opened = true;
  }

  isMobile() {
    return this.applicationStateService.getIsMobileResolution();
  }

  toggleSideNav(e: Event) {
    this.opened = !this.opened;
    console.log('I work');
  }
}
