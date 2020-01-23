import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpHandlerService} from '../../../../http-handler.service';
import {AuthService} from "../../../../account/auth.service";
import {Declaration} from "../../declaration.object";
import {slideInAnimation} from "../../../../models/animations";
import {FormControl} from "@angular/forms";
import {ProfileObjectsService} from "../../../profile/profile-objects.service";

@Component({
  selector: 'app-declaration-popup',
  templateUrl: './declaration-popup.component.html',
  styleUrls: ['./declaration-popup.component.scss']
})
export class DeclarationPopupComponent implements OnInit {
  @Input() editMode: boolean;
  @Input() declaration: Declaration;

  @Input() showPopup: boolean;
  @Output() showPopupChange = new EventEmitter<boolean>();

  beginPostcode : string;
  beginHuisnummer : number;
  beginStraatnaam : string;
  beginPlaatsnaam : string;
  beginLand : string;
  eindPostcode : string;
  eindHuisnummer : number;
  eindStraatnaam : string;
  eindPlaatsnaam : string;
  eindLand : string;
  kilometers: number;
  declaratie: number;
  omschrijving : string;
  datum : string;
  klantNaam : string;
  projectNaam : string;
  kentekenPlaat : string;


  popupHeader: string;
  constructor(private httpHandler : HttpHandlerService, private auth: AuthService) {

  }

  ngOnInit() {
    if (this.editMode) {
      this.popupHeader = "Declaratie wijzigen";
    } else {
      this.popupHeader = "Declaratie aanmaken";
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


  updateDeclaration(){
    let updatedDeclaration = new Declaration(this.declaration.userEmail, this.declaration.decDesc, this.declaration.decDate, this.declaration.decKilometers, this.declaration.decDeclaration, this.declaration.decBeginPostal, this.declaration.decBeginHouseNumber, this.declaration.decBeginStreet, this.declaration.decBeginCity, this.declaration.decBeginCountry, this.declaration.decEndPostal, this.declaration.decEndHouseNumber, this.declaration.decEndStreet, this.declaration.decEndCity, this.declaration.decEndCountry, this.declaration.clientName, this.declaration.projectName, this.declaration.licencePlate);
    this.httpHandler.postDeclaration(updatedDeclaration, "/declaration/update/").subscribe()
  }

}