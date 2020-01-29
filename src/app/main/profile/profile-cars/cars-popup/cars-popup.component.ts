import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../../../models/project.model';
import {FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {HttpHandlerService} from '../../../../http-handler.service';
import {ProfileObjectsService} from '../../profile-objects.service';
import {Car} from "../../../../models/car.model";
import {RDWCar} from "../../../../models/rdwcar.model";
import {RDWFuel} from "../../../../models/rdwfuel.model";
import {AuthService} from "../../../../account/auth.service";
import {CarService} from '../../../../services/car.service';

@Component({
  selector: 'app-cars-create-popup',
  templateUrl: './cars-popup.component.html',
  styleUrls: ['./cars-popup.component.scss']
})
export class CarsPopupComponent implements OnInit {
  @Input() editMode: boolean;
  @Input() car: Car;

  @Input() showPopup: boolean;
  @Output() showPopupChange = new EventEmitter<boolean>();

  @Output() returnChange = new EventEmitter<boolean>();

  licencePlate : string;
  rdwCar : RDWCar[] = [];
  rdwFuel : RDWFuel[] = [];
  carName : string = " ";
  carBrand : string = " ";
  carType : string = " ";
  carColor : string = " ";
  fuelType : string = " ";

  notFound : boolean = false;
  noCarName : boolean = false;


  popupHeader: string;
  constructor(private httpHandler : HttpHandlerService, private auth: AuthService, private carService:CarService) {
  }

  ngOnInit() {
    if (this.editMode) {
      this.popupHeader = "Auto wijzigen";
    } else {
      this.popupHeader = "Auto aanmaken";
    }
  }

  closePopup(){
    this.showPopupChange.emit(false);
  }

  closePopupOutsidePopup(event: any){
    if(event.target.className === "full-screen" || event.target.className === "popup-wrapper") {
      this.closePopup();
    }
  }

  RDWCheck(){
    this.licencePlate = this.licencePlate.toUpperCase();
      this.httpHandler.getRDWCar(this.licencePlate).subscribe(res => {
        if(res[0] != null){
          this.rdwCar = res;
          this.autoFillForm();
        } else {
          this.notFound = true;
        }
      })
  }

  autoFillForm(){
    this.carBrand = this.rdwCar[0].merk;
    this.carType = this.rdwCar[0].handelsbenaming;
    this.carColor = this.rdwCar[0].eerste_kleur;
    this.httpHandler.getRDWFuel(this.licencePlate).subscribe(res =>{
      this.rdwFuel = res;
      this.fuelType = this.rdwFuel[0].brandstof_omschrijving;
    });
    this.notFound = false;
  }

  createCar(){
    if(this.licencePlate != null && this.carName != " " && this.carBrand != " " && this.carType != " " && this.carColor != " " && this.fuelType != " "){
      let car = new Car(this.licencePlate, this.auth.getUserData().email, this.carName, this.carBrand, this.carType, this.carColor, this.fuelType);
      this.httpHandler.postCar(car, "/car/create").subscribe(responseData => {
        console.log(responseData);
        this.carService.getCarsArray();
        this.returnChange.emit(true);
      });

      this.closePopup();
    } else if(this.carName === " " && this.licencePlate != null){
      this.noCarName = true;
    } else {
      this.notFound = true;
    }
  }
}
