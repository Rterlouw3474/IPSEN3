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

  private users = [];


  constructor(private httpHandler : HttpHandlerService) {
    //this.http();
  }

  ngOnInit() {
  }


  onClick() {
    this.httpHandler.getUser("/user/get/test@test.test").subscribe((res : any[])=>{
      console.log(res);
      this.users = res;
    });
  }

  http (){
    const user = new User(this.email, this.username, this.password);
    this.httpHandler.postUser(user, "/user/create")
  }



}
