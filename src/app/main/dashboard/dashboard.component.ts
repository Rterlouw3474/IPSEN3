import {Component, OnInit} from "@angular/core";
import {HttpHandlerService} from "../../http-handler.service";
import {AuthService} from "../../account/auth.service";
import {ApplicationStateService} from "../../application-state.service";
import {DeclarationService} from "../../services/declaration.service";
import {UserService} from "../../services/user.service";
import {LoadService} from "../../services/load.service";
import {Declaration} from "../../models/declaration.object";


@Component({
  selector: 'app-desktop-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // popup
  public showPopup = false;
  public popupDeclaration: Declaration;
  public popupEditMode = false;

  constructor(private applicationStateService: ApplicationStateService, private http: HttpHandlerService,
              private auth: AuthService, private decService: DeclarationService, private userService: UserService,
              private load: LoadService) { }

  ngOnInit() {
  }

  isMobile() {
    return this.applicationStateService.getIsMobileResolution();
  }

  editDeclaration(declaration: Declaration) {
    this.popupDeclaration = new Declaration(declaration.userEmail, declaration.decDesc, declaration.decDate, declaration.decKilometers, declaration.decDeclaration, declaration.decBeginPostal, declaration.decBeginHouseNumber, declaration.decBeginStreet, declaration.decBeginCity, declaration.decBeginCountry, declaration.decEndPostal, declaration.decEndHouseNumber, declaration.decEndStreet, declaration.decEndCity, declaration.decEndCountry, declaration.clientName, declaration.projectName, declaration.licencePlate);
    this.popupEditMode = true;
    this.showPopup = true;
  }


}
