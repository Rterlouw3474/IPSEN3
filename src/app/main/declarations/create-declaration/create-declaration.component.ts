import {Component, OnInit} from '@angular/core';
import {Declaration} from '../declaration.object';
import {HttpHandlerService} from '../../../http-handler.service';
import {User} from '../../profile/user.object';
import {AuthService} from '../../../account/auth.service';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Project} from '../../profile/profile-projects/project.model';
import {Car} from '../../profile/profile-cars/car.model';
import {Client} from '../../profile/profile-clients/client.model';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-declaration',
  templateUrl: './create-declaration.component.html',
  styleUrls: ['./create-declaration.component.scss']
})

export class CreateDeclarationComponent implements OnInit {

  clientFormControl = new FormControl('', Validators.required);
  projectFormControl = new FormControl('', Validators.required);
  carFormControl = new FormControl('', Validators.required);

  omschrijving : string;
  datum : string;
  kilometers: number;
  declaratie: number;
  beginPostcode: string;
  beginHuisnummer: number;
  beginStraatnaam: string;
  beginPlaatsnaam: string;
  beginLand: string;
  eindPostcode: string;
  eindHuisnummer: number;
  eindStraatnaam: string;
  eindPlaatsnaam: string;
  eindLand: string;
  klantNaam : string;
  projectNaam : string;
  kentekenPlaat : string;

  clients: Client[];
  projects: Project[];
  cars: Car[];



  constructor(private httpHandler : HttpHandlerService, private auth: AuthService) { }

  ngOnInit() {
    this.getProjectsArray()
    this.getClientsArray()
    this.getCarsArray()
  }

  getProjectsArray() {
    return this.httpHandler.getProjects(this.auth.getUserData().email).subscribe(
      res => {
        this.projects = res;
      });
  }

  getClientsArray() {
    return this.httpHandler.getClients(this.auth.getUserData().email).subscribe(
      res => {
        this.clients = res;
      });
  }

  getCarsArray() {
    return this.httpHandler.getCars(this.auth.getUserData().email).subscribe(
      res => {
        this.cars = res;
      });
  }

  onCreateDeclaration() {
    const newDec = new Declaration(this.auth.getUserData().email, this.omschrijving, '12-12-2020', this.kilometers, this.declaratie,
      this.beginPostcode, this.beginHuisnummer, this.beginStraatnaam, this.beginPlaatsnaam, this.beginLand,
      this.eindPostcode, this.eindHuisnummer, this.eindStraatnaam, this.eindPlaatsnaam, this.eindLand, 'Albert', 'Duitsland', '1A-B23-C');
    this.httpHandler.postDeclaration(newDec, '/declaration/create').subscribe(res => {
      console.log(res);
    })
  }
}
