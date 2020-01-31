
import {Client} from '../../../models/client.model';
import {Car} from '../../../models/car.model';
import {ProfileObjectsService} from '../profile-objects.service';
import {AuthService} from '../../../account/auth.service';
import {Component, OnInit} from '@angular/core';
import {HttpHandlerService} from '../../../http-handler.service';
import {UserService} from '../../../services/user.service';
import {CarService} from "../../../services/car.service";
import {DeletePopupModel} from '../../shared/delete-popup/delete-popup.model';

@Component({
  selector: 'app-profile-cars',
  templateUrl: './profile-cars.component.html',
  styleUrls: ['./profile-cars.component.scss']
})
export class ProfileCarsComponent implements OnInit {
  private maxCountPage = 6;
  public selectedCars: Car[];
  public pageNumberMinimum = 0;
  public pageNumberMaximum = this.maxCountPage;

  private generateEmptyRows: number;
  public emptyRowsList;

  public parentCheckboxSelected = false;
  public allCheckboxesSelected = false;

  public pageBtnLeft = true;
  public pageBtnRight = true;

  public deleteButtonDisabled = true;

  // popup
  public showDeletePopup = false;
  public deletePopup: DeletePopupModel;
  public showPopup = false;
  public popupCar: Car;
  public popupEditMode = false;

  constructor(private auth: AuthService, private httpHandler : HttpHandlerService, private userService:UserService, public carService:CarService) {
    this.selectedCars = [];
  }

  ngOnInit() {
    this.checkEmptyRows();
    this.checkButtons();
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


  onChange(result: any) {
    // console.log("EMIT EVENT: " + result);
    if(result){
      this.carService.getCarsArray().subscribe(res => {
        this.checkEmptyRows();
        this.checkButtons()
      });
    }
  }

  onCheckboxEvent(car: Car, checked: boolean) {
    if (!checked) {
      this.selectedCars.push(car);
    } else {
      let counter = 0;
      for (const selectedCar of this.selectedCars) {
        if (selectedCar.licencePlate === car.licencePlate) {
          this.selectedCars.splice(counter,1);
        }
        counter++;
      }
    }
    this.checkDeleteButton();
    // console.log(this.selectClients);
  }

  onSelectAllCheckboxes(checked: boolean) {
    this.allCheckboxesSelected = !checked;
    if (this.allCheckboxesSelected) {
      this.resetSelectedCars();
      const tempArray: Car[] = this.carService.cars.slice(this.getMinimum() , this.getMaximum());
      for (const car of tempArray) {
        this.selectedCars.push(car);
      }
    } else {
      this.resetSelectedCars();
    }
    this.checkDeleteButton();
  }

  private resetSelectedCars(){
    this.selectedCars = [];
    this.deleteButtonDisabled = true;
  }

  private checkDeleteButton() {
    this.deleteButtonDisabled = !(this.selectedCars.length > 0);
  }

  deleteCarsSelected(result: any) {
    if (result) {
      for (const selectedCar of this.selectedCars) {
        this.httpHandler
          .deleteProject("/car/delete/" + this.auth.getUserData().email + "/" + selectedCar.licencePlate)
          .subscribe(
            res => {
              this.carService.getCarsArray().subscribe(res => {
                this.checkEmptyRows();
                this.checkButtons()
              })
            })
      }
      this.resetSelectedCars();
      this.carService.cars = [];
      //this.onChange(true);
      this.showDeletePopup = false;
    } else {
      this.showDeletePopup = false;
    }
  }

  verwijderPopup() {
    if (this.selectedCars.length < 1) {
      this.showDeletePopup = false;
    } else if(this.selectedCars.length === 1) {
      this.deletePopup = new DeletePopupModel("Auto verwijderen",
        "Weet u zeker dat u de geselecteerde auto wil verwijderen?",
        "Ja, verwijder auto",
        "Nee, annuleer");
      this.showDeletePopup = true;
    } else if( this.selectedCars.length > 1) {
      this.deletePopup = new DeletePopupModel("Auto verwijderen",
        "Weet u zeker dat u de geselecteerde auto's wilt verwijderen?",
        "Ja, verwijder auto's",
        "Nee, annuleer");
      this.showDeletePopup = true;
    }
  }

}
