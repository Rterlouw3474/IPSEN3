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

  totalKilometers: number;
  totalMoney: number;
  totalDeclarations : number;


  declarations : Declaration[] = [];

  constructor(private http: HttpHandlerService) { }

  ngOnInit() {
    this.http.getDeclarations(1).subscribe(
      res => {
        this.declarations = res;

        console.log(this.declarations);
      }
    );

    this.updateDashboardValues();
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
    this.totalDeclarations = this.declarations.length+1;
    console.log(this.totalKilometers);
  }

}
