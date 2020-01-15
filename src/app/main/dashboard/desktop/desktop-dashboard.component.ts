import { Component, OnInit } from '@angular/core';
import {Declaration} from "../../declarations/declaration.object";
import {HttpHandlerService} from "../../../http-handler.service";
import {forkJoin, Observable, Subscription} from 'rxjs';
import {AuthService} from '../../../account/auth.service';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-desktop-dashboard',
  templateUrl: './desktop-dashboard.component.html',
  styleUrls: ['./desktop-dashboard.component.scss']
})
export class DesktopDashboardComponent implements OnInit {

  totalKilometers: number;
  totalMoney: number;
  totalDeclarations: number;
  username: string;
  user: User;

  declarations : Declaration[] = [];

  constructor(private http: HttpHandlerService,
              private auth: AuthService) { }

  ngOnInit() {
    this.getDeclarationArray();
    this.user = this.auth.getUserData();
    this.username = this.user.username;
  }

  getDeclarationArray(){
    this.http.getDeclarations(this.auth.getUserData().email)
      .subscribe(
      res => {
        this.declarations = res;
        this.updateDashboardValues();

        //console.log(this.declarations);
      }
    );
  }

  updateDashboardValues(){
    this.totalKilometers = 0;
    this.totalMoney = 0;
    this.totalDeclarations = 0;
    for(let i = 0; i<this.declarations.length; i++){
      this.totalKilometers += this.declarations[i].decKilometers;
      this.totalMoney += this.declarations[i].decDeclaration;
    }
    this.totalMoney = Math.round(this.totalMoney * 1000) / 1000;
    this.totalDeclarations = this.declarations.length;
    console.log(this.totalKilometers);
    console.log(this.declarations);
  }
}
