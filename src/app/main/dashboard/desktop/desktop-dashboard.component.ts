import { Component, OnInit } from '@angular/core';
import {Declaration} from "../../declarations/declaration.object";
import {HttpHandlerService} from "../../../http-handler.service";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-desktop-dashboard',
  templateUrl: './desktop-dashboard.component.html',
  styleUrls: ['./desktop-dashboard.component.scss']
})
export class DesktopDashboardComponent implements OnInit {

  totalKilometers: number;
  totalMoney: number;
  totalDeclarations : number;


  declarations : Declaration[] = [];

  constructor(private http: HttpHandlerService) { }

  ngOnInit() {
    this.getDeclarationArray()
  }

  getDeclarationArray(){
    this.http.getDeclarations(1).subscribe(
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
