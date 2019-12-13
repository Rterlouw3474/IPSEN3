import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpHandlerService} from "../../http-handler.service";
import {User} from "../profile/user.object";
import {Declaration} from "../declarations/declaration.object";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



}
