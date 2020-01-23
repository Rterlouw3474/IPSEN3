import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpHandlerService} from '../../http-handler.service';
import {User} from '../profile/user.object';
import {Declaration} from '../declarations/declaration.object';
import {AuthService} from '../../account/auth.service';
import {DatabaseUser} from '../../models/databaseuser.model';
import {Router} from '@angular/router';
import {ApplicationStateService} from '../../application-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  totalKilometers: number;
  totalMoney: string;
  totalDeclarations: number;
  username: string;

  authUser: User;
  databaseUser: DatabaseUser;

  declarations: Declaration[] = [];

  constructor(private applicationStateService: ApplicationStateService,
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

  isMobile() {
    return this.applicationStateService.getIsMobileResolution();
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
    let totalMoneys = 0;
    this.totalDeclarations = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.declarations.length; i++) {
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
