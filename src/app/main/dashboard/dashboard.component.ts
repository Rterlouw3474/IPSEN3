import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpHandlerService} from '../../http-handler.service';
import {User} from '../profile/user.object';
import {Declaration} from '../declarations/declaration.object';
import {AuthService} from '../../account/auth.service';
import {DatabaseUser} from '../../models/databaseuser.model';
import {Router} from '@angular/router';
import {ApplicationStateService} from '../../application-state.service';

export abstract class DashboardComponent implements OnInit {

  totalKilometers: number;
  totalMoney: number;
  totalDeclarations: number;
  username: string;

  authUser: User;
  databaseUser: DatabaseUser;

  declarations: Declaration[] = [];

  protected constructor(private router: Router,
                        private applicationStateService: ApplicationStateService,
                        private http: HttpHandlerService,
                        private auth: AuthService) {
  }

  ngOnInit() {
    this.getDeclarationArray();

    this.http.getUser(this.authUser.email).subscribe(res => {
      this.databaseUser = res;
      console.log(this.databaseUser);
      this.username = this.databaseUser.username;
    });
  }

  getDeclarationArray() {
    this.http.getDeclarations(this.auth.getUserData().email)
      .subscribe(
        res => {
          this.declarations = res;
          this.updateDashboardValues();

          // console.log(this.declarations);
        }
      );
  }

  updateDashboardValues() {
    this.totalKilometers = 0;
    this.totalMoney = 0;
    this.totalDeclarations = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.declarations.length; i++) {
      this.totalKilometers += this.declarations[i].decKilometers;
      this.totalMoney += this.declarations[i].decDeclaration;
    }
    this.totalMoney = Math.round(this.totalMoney * 1000) / 1000;
    this.totalDeclarations = this.declarations.length;
    console.log(this.totalKilometers);
    console.log(this.declarations);
  }
}
