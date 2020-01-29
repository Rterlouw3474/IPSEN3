import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../account/auth.service';
import {HttpHandlerService} from "../../../http-handler.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {


  constructor(private auth: AuthService, private http:HttpHandlerService, private userService:UserService) {
  }

  ngOnInit() {
  }



}
