import {Injectable} from "@angular/core";
import {Declaration} from "../models/declaration.object";
import {HttpHandlerService} from "../http-handler.service";
import {AuthService} from "../account/auth.service";
import {map} from "rxjs/operators";

@Injectable()
export class DeclarationService {

  constructor(private http:HttpHandlerService, private auth:AuthService){}

  public declarations: Declaration[];
  totalKilometers: number;
  totalMoney: string;
  totalDeclarations: number;

  //gets declarations from the user
  getDeclarationArray(){
    return this.http.getDeclarations(this.auth.getUserData().email).pipe(map(res => {
      this.declarations = res;
      this.updateDashboardValues();
    }));
  }

  //calculates declaration statistics
  updateDashboardValues() {
    this.totalKilometers = 0;
    let totalMoneys = 0;
    this.totalDeclarations = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.declarations.length; i++) {
      this.totalKilometers += this.declarations[i].decKilometers;
      totalMoneys += this.declarations[i].decDeclaration * this.declarations[i].decKilometers;
    }
    this.totalMoney = (Math.round(totalMoneys * 1000) / 1000).toFixed(2);
    this.totalMoney = this.totalMoney.replace('.', ',');
    this.totalDeclarations = this.declarations.length;
    console.log(this.totalKilometers);
    console.log(this.declarations);
  }

}
