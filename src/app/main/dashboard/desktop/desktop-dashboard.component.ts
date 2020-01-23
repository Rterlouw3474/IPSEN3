import { Component, OnInit } from '@angular/core';
import {Declaration} from "../../declarations/declaration.object";
import {HttpHandlerService} from "../../../http-handler.service";
import {forkJoin, Observable, Subscription} from 'rxjs';
import {AuthService} from '../../../account/auth.service';
import {User} from '../../../models/user.model';
import {DatabaseUser} from "../../../models/databaseuser.model";

@Component({
  selector: 'app-desktop-dashboard',
  templateUrl: './desktop-dashboard.component.html',
  styleUrls: ['./desktop-dashboard.component.scss']
})
export class DesktopDashboardComponent implements OnInit {

  totalKilometers: number;
  totalMoney: string;
  totalDeclarations: number;
  username: string;

  authUser: User;
  databaseUser : DatabaseUser;

  declarations : Declaration[] = [];

  constructor(private http: HttpHandlerService,
              private auth: AuthService) { }

  ngOnInit() {
    this.getDeclarationArray();
    this.authUser = this.auth.getUserData();

    this.http.getUser(this.authUser.email).subscribe(res=>{
      this.databaseUser = res;
      console.log(this.databaseUser);
      this.username = this.databaseUser.username;
    });
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
    let totalMoneys = 0
    this.totalDeclarations = 0;
    for(let i = 0; i<this.declarations.length; i++){
      this.totalKilometers += this.declarations[i].decKilometers;
      totalMoneys += this.declarations[i].decDeclaration;
    }
    this.totalMoney = (Math.round(totalMoneys * 1000) / 1000).toFixed(2);
    this.totalMoney = this.totalMoney.replace('.', ',');
    this.totalDeclarations = this.declarations.length;
    console.log(this.totalKilometers);
    console.log(this.declarations);
  }
}
