import { Component, OnInit } from '@angular/core';
import {Declaration} from "../declaration.object";
import {HttpHandlerService} from "../../../http-handler.service";
import {User} from "../../profile/user.object";
import {AuthService} from '../../../account/auth.service';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-create-declaration',
  templateUrl: './create-declaration.component.html',
  styleUrls: ['./create-declaration.component.scss']
})

export class CreateDeclarationComponent implements OnInit {

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


  constructor(private httpHandler : HttpHandlerService, private authService: AuthService) { }

  ngOnInit() {
  }

  onCreateDeclaration(){
    const newDec = new Declaration(this.authService.getUserData().email, this.omschrijving, this.datum, this.kilometers, this.declaratie,
      this.beginPostcode, this.beginHuisnummer, this.beginStraatnaam, this.beginPlaatsnaam, this.beginLand,
      this.eindPostcode, this.eindHuisnummer, this.eindStraatnaam, this.eindPlaatsnaam, this.eindLand, "Albert", "Duitsland", "1A-B23-C");
    this.httpHandler.postDeclaration(newDec, "/declaration/create")
  }

}
