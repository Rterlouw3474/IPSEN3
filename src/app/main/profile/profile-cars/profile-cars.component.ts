
import {Client} from '../../../models/client.model';
import {Car} from '../../../models/car.model';
import {ProfileObjectsService} from '../profile-objects.service';
import {AuthService} from '../../../account/auth.service';
import {Component, OnInit} from '@angular/core';
import {HttpHandlerService} from '../../../http-handler.service';
import {UserService} from '../../../services/user.service';
import {CarService} from "../../../services/car.service";

@Component({
  selector: 'app-profile-cars',
  templateUrl: './profile-cars.component.html',
  styleUrls: ['./profile-cars.component.scss']
})
export class ProfileCarsComponent implements OnInit {
  private maxCountPage = 6;
  public selectCars: Car[];
  public pageNumberMinimum = 0;
  public pageNumberMaximum = this.maxCountPage;

  private generateEmptyRows: number;
  public emptyRowsList;

  public allCheckboxesSelected = false;

  public pageBtnLeft = true;
  public pageBtnRight = true;

  // popup
  public showPopup = false;
  public popupCar: Car;
  public popupEditMode = false;

  constructor(private auth: AuthService, private httpHandler : HttpHandlerService, private userService:UserService, private carService:CarService) {
    this.checkEmptyRows();
    this.checkButtons();
  }

  ngOnInit() {
  }

  // Wisselen van pagina's
  getMinimum() {
    return this.pageNumberMinimum;
  }

  getMaximum() {
    return this.pageNumberMaximum;
  }

  nextPage() {
    if (!(this.pageNumberMinimum + this.maxCountPage > this.carService.cars.length)) {
      this.pageNumberMinimum += this.maxCountPage;
      this.pageNumberMaximum += this.maxCountPage;
      this.checkEmptyRows();
      this.checkButtons();
    }
  }

  prevPage() {
    if (this.pageNumberMinimum > 0) {
      this.pageNumberMinimum -= this.maxCountPage;
      this.pageNumberMaximum -= this.maxCountPage;
      this.checkEmptyRows();
      this.checkButtons();
    }
  }

  private checkEmptyRows() {
    this.generateEmptyRows = this.pageNumberMaximum - this.carService.cars.length;
    if (this.generateEmptyRows < 1){
      this.generateEmptyRows = 0;
    }
    this.emptyRowsList = Array(this.generateEmptyRows).fill(1);
  }

  private checkButtons() {
    this.pageBtnLeft = ProfileObjectsService.checkPrevButton(this.pageNumberMinimum);
    this.pageBtnRight = ProfileObjectsService.checkNextButton(this.pageNumberMinimum, this.maxCountPage, this.carService.cars.length);
  }

  onChange(result: any) {
    console.log("EMIT EVENT: " + result);
    if(result){
      this.checkEmptyRows();
      this.checkButtons();
    }
  }

  editCar(car: Car) {
    this.popupCar = new Car(car.licencePlate, car.userEmail, car.carName, car.carBrand, car.carColor, car.carType, car.fuelType);
    this.popupEditMode = true;
    this.showPopup = true;
  }

  createCar() {
    this.popupCar = new Car("", "", "", "", "", "", "");
    this.popupEditMode = false;
    this.showPopup = true;
  }
}
