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
import {Client} from '../../../../models/client.model';

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

  // licencePlate : string;
  rdwCar : RDWCar[] = [];
  rdwFuel : RDWFuel[] = [];
  // carName : string = " ";
  // carBrand : string = " ";
  // carType : string = " ";
  // carColor : string = " ";
  // fuelType : string = " ";

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
    const tijdelijkeLijst = this.car.licencePlate.split('-');

    this.car.licencePlate = this.car.licencePlate.toUpperCase();
      this.httpHandler.getRDWCar(tijdelijkeLijst.join('').toUpperCase()).subscribe(res => {
        if(res[0] != null){
          this.rdwCar = res;
          this.autoFillForm();
        } else {
          this.notFound = true;
        }
      })
  }

  autoFillForm(){
    this.car.carBrand = this.rdwCar[0].merk;
    this.car.carType = this.rdwCar[0].handelsbenaming;
    this.car.carColor = this.rdwCar[0].eerste_kleur;
    this.httpHandler.getRDWFuel(this.car.licencePlate).subscribe(res =>{
      this.rdwFuel = res;
      this.car.fuelType = this.rdwFuel[0].brandstof_omschrijving;
    });
  }

  createCar(){
    let ok = true;
    ok = this.checkValues();
    if (!ok) {
      if(this.editMode) {
        alert("Auto niet gewijzigd, niet alle velden zijn ingevuld.")
      } else {
        alert("Auto niet aangemaakt, niet alle velden zijn ingevuld.")
      }
    }
    if(ok){
      let carToPost = new Car(this.car.licencePlate, this.auth.getUserData().email, this.car.carName, this.car.carBrand, this.car.carType, this.car.carColor, this.car.fuelType);
      if (this.editMode) {
        this.httpHandler.postCar(carToPost, "/car/update").subscribe();
      } else {
        this.httpHandler.postCar(carToPost, "/car/create").subscribe();
      }

      const that = this;
      setTimeout(function() {
        that.returnChange.emit(true);
        that.closePopup();
      },200);
    }
  }

  private checkValues(){
    return this.car.licencePlate != null && this.car.carName != " ";
  }
}
