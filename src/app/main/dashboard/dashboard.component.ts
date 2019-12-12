import { Component, OnInit } from '@angular/core';
import {HttpHandlerService} from "../../http-handler.service";
import {User} from "../profile/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
