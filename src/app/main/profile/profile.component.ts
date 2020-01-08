import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../account/auth.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileImage: string;
  user: User;
  username: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUserData();
    this.profileImage = this.user.profileImage;
    this.username = this.user.username;
  }

}
