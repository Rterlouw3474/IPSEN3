import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../account/auth.service';
import {HttpHandlerService} from "../../http-handler.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private auth: AuthService, private http: HttpHandlerService, private userService:UserService) { }

  ngOnInit() {
  }

}
