import {Component, OnInit} from '@angular/core';
import {Car} from '../../../models/car.model';
import {ProfileObjectsService} from '../profile-objects.service';
import {AuthService} from '../../../account/auth.service';

@Component({
  selector: 'app-profile-cars',
  templateUrl: './profile-cars.component.html',
  styleUrls: ['./profile-cars.component.scss']
})
export class ProfileCarsComponent implements OnInit {
  private maxCountPage = 6;
  public cars: Car[];
  public selectedCars: Car[];
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

  constructor(private auth: AuthService) {
    this.cars = [
      new Car('ole@gmail.com', 'AB-123-C', 'Golf', 'VW', 'Hatchback', 'Donkerblauw', 'benzine'),
      new Car('ole@gmail.com', 'AB-123-C', 'Golf', 'VW', 'Hatchback', 'Donkerblauw', 'benzine'),
      new Car('ole@gmail.com', 'AB-123-C', 'Golf', 'VW', 'Hatchback', 'Donkerblauw', 'benzine'),
      new Car('ole@gmail.com', 'AB-123-C', 'Golf', 'VW', 'Hatchback', 'Donkerblauw', 'benzine'),
      new Car('ole@gmail.com', 'AB-123-C', 'Golf', 'VW', 'Hatchback', 'Donkerblauw', 'benzine'),
      new Car('ole@gmail.com', 'AB-123-C', 'Golf', 'VW', 'Hatchback', 'Donkerblauw', 'benzine'),
      new Car('ole@gmail.com', 'AB-123-C', 'Golf', 'VW', 'Hatchback', 'Donkerblauw', 'benzine'),
      new Car('ole@gmail.com', 'AB-123-C', 'Golf', 'VW', 'Hatchback', 'Donkerblauw', 'benzine'),
      new Car('ole@gmail.com', 'AB-123-C', 'Golf', 'VW', 'Hatchback', 'Donkerblauw', 'benzine'),
      new Car('ole@gmail.com', 'AB-123-C', 'Golf', 'VW', 'Hatchback', 'Donkerblauw', 'benzine'),
      new Car('ole@gmail.com', 'AB-123-C', 'Golf', 'VW', 'Hatchback', 'Donkerblauw', 'benzine'),
      new Car('ole@gmail.com', 'AB-123-C', 'Golf', 'VW', 'Hatchback', 'Donkerblauw', 'benzine'),
      new Car('ole@gmail.com', 'AB-123-C', 'Golf', 'VW', 'Hatchback', 'Donkerblauw', 'benzine')
    ];
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
    if (!(this.pageNumberMinimum + this.maxCountPage > this.cars.length)) {
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
    this.generateEmptyRows = this.pageNumberMaximum - this.cars.length;
    if (this.generateEmptyRows < 1) {
      this.generateEmptyRows = 0;
    }
    this.emptyRowsList = Array(this.generateEmptyRows).fill(1);
  }

  private checkButtons() {
    this.pageBtnLeft = ProfileObjectsService.checkPrevButton(this.pageNumberMinimum);
    this.pageBtnRight = ProfileObjectsService.checkNextButton(this.pageNumberMinimum, this.maxCountPage, this.cars.length);
  }

  createCar() {
    this.popupEditMode = false;
    this.showPopup = true;
  }

  editCar(car: Car) {
    this.popupCar = car;
    this.popupEditMode = true;
    this.showPopup = true;
  }

}
