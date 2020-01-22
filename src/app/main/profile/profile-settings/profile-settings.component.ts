import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../account/auth.service';
import {User} from '../../../models/user.model';
import {HttpHandlerService} from '../../../http-handler.service';
import {DatabaseUser} from '../../../models/databaseuser.model';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  userEmail: string;
  username: string;

  AuthUser: User;
  databaseUser: DatabaseUser;

  constructor(private auth: AuthService, private http: HttpHandlerService) {


  }

  ngOnInit() {
    this.AuthUser = this.auth.getUserData();
    this.userEmail = this.AuthUser.email;

    this.http.getUser(this.AuthUser.email).subscribe(res => {
      this.databaseUser = res;
      console.log(this.databaseUser);
      this.username = this.databaseUser.username;
    });
  }

  onChangeUsername(nameInput: HTMLInputElement) {
    this.http.updateUsername(this.AuthUser.email, nameInput.value).subscribe(
      res => {
        this.http.getUser(this.AuthUser.email).subscribe(res => {
          this.databaseUser = res;
          this.username = this.databaseUser.username;
        });
      }
    );
  }

}
