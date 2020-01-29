import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../account/auth.service';
import {User} from '../../models/user.model';
import {HttpHandlerService} from '../../http-handler.service';
import {DatabaseUser} from '../../models/databaseuser.model';
import {ApplicationStateService} from '../../application-state.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileImage: string;
  user: User;
  username: string;
  databaseUser: DatabaseUser;
  opened: boolean;

  constructor(private applicationStateService: ApplicationStateService, private auth: AuthService, private http: HttpHandlerService) { }

  ngOnInit() {
    this.user = this.auth.getUserData();
    this.profileImage = this.user.profileImage;
    this.opened = true;

    this.http.getUser(this.user.email).subscribe(res => {
      this.databaseUser = res;
      this.username = this.databaseUser.username;
    });
  }

  isMobile() {
    return this.applicationStateService.getIsMobileResolution();
  }

  toggleSideNav(e: Event) {
    this.opened = !this.opened;
    console.log('I work');
  }
}
