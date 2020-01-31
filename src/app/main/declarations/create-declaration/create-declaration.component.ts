import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpHandlerService} from '../../../http-handler.service';
import {AuthService} from '../../../account/auth.service';
import {Project} from '../../../models/project.model';
import {Car} from '../../../models/car.model';
import {Client} from '../../../models/client.model';
import {FormControl, Validators} from '@angular/forms';
import {Declaration} from '../../../models/declaration.object';
import {CarService} from '../../../services/car.service';
import {ClientService} from '../../../services/client.service';
import {ProjectService} from '../../../services/project.service';
import {DeclarationService} from '../../../services/declaration.service';
import {Router} from '@angular/router';

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


  omschrijving: string;
  datum: string;
  kilometers: number;
  declaratie: number = 0.19;
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
  klantNaam: string;
  projectNaam: string;
  autoNaam: string;
  interactiveRouteMap: string = 'https://www.google.com/maps/embed/v1/view' +
    '?key=AIzaSyCG2jL_rZO0BnhsjSFxvKq39Okq2GZNf98' +
    '&center=52.092876,5.104480' +
    '&zoom=7';
  origin: string;
  destination: string;
  totalCompensation: string;

  projects: Project[];

  // popup
  public showPopupClient = false;
  public showPopupProject = false;
  public showPopupCar = false;
  public popupClient: Client;
  public popupProject: Project;
  public popupCar: Car;
  public popupEditMode = false;

  constructor(private httpHandler: HttpHandlerService, private auth: AuthService,
              public carService: CarService, public clientService: ClientService,
              public projectService: ProjectService, public declarationService: DeclarationService, public router:Router) {
  }

  ngOnInit() {
  }

  onCreateDeclaration() {
    const newDec = new Declaration(this.auth.getUserData().email, this.omschrijving, '12-12-2020', this.kilometers, this.declaratie,
      this.beginPostcode, this.beginHuisnummer, this.beginStraatnaam, this.beginPlaatsnaam, this.beginLand,
      this.eindPostcode, this.eindHuisnummer, this.eindStraatnaam, this.eindPlaatsnaam, this.eindLand, this.klantNaam, this.projectNaam, this.autoNaam);
    this.httpHandler.postDeclaration(newDec, '/declaration/create').subscribe(res => {
      this.declarationService.getDeclarationArray().subscribe();
    })
    this.router.navigate(['/declarations'])
  }


  createClient() {
    this.popupClient = new Client('', '', '', null, '', '');
    this.popupEditMode = false;
    this.showPopupClient = true;
  }

  createProject() {
    this.popupProject = new Project('', '', '', '', '');
    this.popupEditMode = false;
    this.showPopupProject = true;
  }

  createCar() {
    this.popupCar = new Car('', '', '', '', '', '', '');
    this.popupEditMode = false;
    this.showPopupCar = true;
  }

  checkInputValues() {
    if (this.fieldsAreEmpty()) {
      return;
    }

    this.formatInput();

    this.getInteractiveRouteMap();
    this.getOriginDestinationAddressAndDistance();

    setTimeout(() => {
      this.calculate()
    }, 1000)
  }

  private fieldsAreEmpty() {
    if (this.beginStraatnaam == null || this.beginStraatnaam == '' ||
      this.beginPostcode == null || this.beginPostcode == '' ||
      this.beginHuisnummer.toString() == null || this.beginHuisnummer.toString() == '' ||
      this.eindStraatnaam == null || this.eindStraatnaam == '' ||
      this.eindPostcode == null || this.eindPostcode == '' ||
      this.eindHuisnummer.toString() == null || this.eindHuisnummer.toString() == '') {
      return true;
    }
    return false;
  }

  private formatInput() {
    this.origin = this.beginHuisnummer.toString().trim() + '+' + this.beginStraatnaam.replace(' ', '+') + ',' + this.beginPostcode.trim();
    this.destination = this.eindHuisnummer.toString().trim() + '+' + this.eindStraatnaam.replace(' ', '+') + ',' + this.eindPostcode.trim();
  }

  private getInteractiveRouteMap() {
    this.httpHandler.getInteractiveRouteMap('/interactiveroutemap', this.origin, this.destination).subscribe(
      response => this.interactiveRouteMap = response);
  }

  private getOriginDestinationAddressAndDistance() {
    this.httpHandler.getOriginDestinationAndDistance('/calculateddistance', this.origin, this.destination).subscribe(
      response => {       console.log(response)
        this.beginLand = response.originCountry;
        this.beginPlaatsnaam = response.originStreet;
        this.eindLand = response.destinationCountry;
        this.eindPlaatsnaam = response.destinationStreet;
        this.kilometers = parseFloat(response.distance.replace(',', '.'));
      }
    );
  }

  calculate() {
    let kilometers;
    let compensation;

    kilometers = parseFloat(this.declaratie.toString().replace(',', '.'));
    compensation = parseFloat(this.kilometers.toString().replace(',', '.'));

    this.totalCompensation = (kilometers * compensation).toFixed(2);
  }
}
