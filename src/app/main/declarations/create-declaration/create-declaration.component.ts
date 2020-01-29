import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpHandlerService} from "../../../http-handler.service";
import {AuthService} from '../../../account/auth.service';
import {Project} from '../../../models/project.model';
import {Car} from '../../../models/car.model';
import {Client} from '../../../models/client.model';
import {FormControl, Validators} from '@angular/forms';
import {Declaration} from '../../../models/declaration.object';
import {CarService} from '../../../services/car.service';
import {ClientService} from '../../../services/client.service';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-create-declaration',
  templateUrl: './create-declaration.component.html',
  styleUrls: ['./create-declaration.component.scss'],
  encapsulation: ViewEncapsulation.None,
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

  projects: Project[];

  // popup
  public showPopupClient = false;
  public showPopupProject = false;
  public showPopupCar = false;
  public popupClient: Client;
  public popupProject: Project;
  public popupCar: Car;
  public popupEditMode = false;



  constructor(private httpHandler : HttpHandlerService, private auth: AuthService, private carService : CarService, private clientService:ClientService, private projectService:ProjectService) { }

  ngOnInit() {
  }

  onCreateDeclaration() {
    console.log(this.klantNaam)
    const newDec = new Declaration(this.auth.getUserData().email, this.omschrijving, '12-12-2020', this.kilometers, this.declaratie,
      this.beginPostcode, this.beginHuisnummer, this.beginStraatnaam, this.beginPlaatsnaam, this.beginLand,
      this.eindPostcode, this.eindHuisnummer, this.eindStraatnaam, this.eindPlaatsnaam, this.eindLand, this.klantNaam, this.projectNaam, this.kentekenPlaat);
    this.httpHandler.postDeclaration(newDec, '/declaration/create').subscribe(res => {
      console.log(res);
    })
  }


  createClient() {
    this.popupClient = new Client("", "", "", null, "", "");
    this.popupEditMode = false;
    this.showPopupClient = true;
  }

  createProject () {
      this.popupProject = new Project("", "", "", "", "");
      this.popupEditMode = false;
      this.showPopupProject = true;
  }

  createCar() {
    this.popupCar = new Car("", "", "", "", "", "", "");
    this.popupEditMode = false;
    this.showPopupCar = true;
  }

}
