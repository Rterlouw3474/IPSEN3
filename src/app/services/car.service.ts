import {Injectable} from "@angular/core";
import {HttpHandlerService} from "../http-handler.service";
import {AuthService} from "../account/auth.service";
import {Car} from '../main/profile/profile-cars/car.model';

@Injectable()
export class CarService {

  constructor(private http:HttpHandlerService, private auth:AuthService){}

  public cars : Car[];

  getCarsArray() {
    return this.http.getCars(this.auth.getUserData().email).subscribe(
      res => {
        this.cars = res;
      });
  }

}
