import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../account/auth.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  userEmail: string;
  username: string;
  user: User;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUserData();
    this.userEmail = this.user.email;
    this.username = this.user.username;
  }

  onChangeUsername(nameInput: HTMLInputElement) {
    this.username = nameInput.value;
  }

}
