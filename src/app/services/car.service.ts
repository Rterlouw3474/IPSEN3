import {Injectable} from "@angular/core";
import {HttpHandlerService} from "../http-handler.service";
import {AuthService} from "../account/auth.service";
import {Car} from '../models/car.model';
import {map} from 'rxjs/operators';

@Injectable()
export class CarService {

  constructor(private http:HttpHandlerService, private auth:AuthService){}

  public cars : Car[];

  getCarsArray() {
    return this.http.getCars(this.auth.getUserData().email).pipe(map(res => {
      console.log(res); this.cars = res;}))
  }

}
