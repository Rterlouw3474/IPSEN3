import { Component, OnInit } from '@angular/core';
import {HttpHandlerService} from "../../http-handler.service";
import {User} from "../profile/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalKilometers : number;

  email: string = 'emaedewffffeil@email.com';
  username: string = "vis";
  password: string = '43951a7a2aa519b05ddc0bc8';
  login = {email: this.email, username: this.username, password: this.password};


  constructor(private httpHandler : HttpHandlerService) {
    //this.http();
  }

  ngOnInit() {
  }

  onClick(){
    //console.log(this.httpHandler.getListOfGroup("/user/getUserByID/1"));

    this.httpHandler
      .getListOfGroup("/user/get/test@test.test")
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
  }

  http (){
    const user = new User(this.email, this.username, this.password);
    this.httpHandler.postUser(user, "/user/create")
  }



}
