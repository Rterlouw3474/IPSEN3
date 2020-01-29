
import {Project} from '../../../models/project.model';
import {Client} from '../../../models/client.model';
import {ProfileObjectsService} from '../profile-objects.service';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../account/auth.service';
import {HttpHandlerService} from '../../../http-handler.service';
import {UserService} from "../../../services/user.service";
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClientService} from "../../../services/client.service";
import {DeletePopupModel} from '../../shared/delete-popup/delete-popup.model';

@Component({
  selector: 'app-profile-clients',
  templateUrl: './profile-clients.component.html',
  styleUrls: ['./profile-clients.component.scss']
})
export class ProfileClientsComponent implements OnInit {

  @Output() showPopupChange = new EventEmitter<boolean>();

  private maxCountPage = 6;
  public selectClients: Client[];
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
  public popupClient: Client;
  public popupEditMode = false;

  constructor(private auth: AuthService, private httpHandler : HttpHandlerService, private userService:UserService, private clientService:ClientService) {
    this.selectClients = [];
  }

  ngOnInit() {
    // this.selectClients = [];
    this.checkButtons();
    this.checkEmptyRows();
  }

  // Wisselen van pagina's
  getMinimum() {
    return this.pageNumberMinimum;
  }

  getMaximum() {
    return this.pageNumberMaximum;
  }

  nextPage() {
    if (!(this.pageNumberMinimum + this.maxCountPage > this.clientService.clients.length)) {
      this.pageNumberMinimum += this.maxCountPage;
      this.pageNumberMaximum += this.maxCountPage;
      this.resetSelectedProjects();
      this.allCheckboxesSelected = false;
      this.parentCheckboxSelected = false;
      this.checkEmptyRows();
      this.checkButtons();
    }
  }

  prevPage() {
    if (this.pageNumberMinimum > 0) {
      this.pageNumberMinimum -= this.maxCountPage;
      this.pageNumberMaximum -= this.maxCountPage;
      this.allCheckboxesSelected = false;
      this.parentCheckboxSelected = false;
      this.checkEmptyRows();
      this.checkButtons();
    }
  }

  private checkEmptyRows() {
    this.generateEmptyRows = this.pageNumberMaximum - this.clientService.clients.length;
    if (this.generateEmptyRows < 1){
      this.generateEmptyRows = 0;
    }
    this.emptyRowsList = Array(this.generateEmptyRows).fill(1);
  }

  private checkButtons() {
    this.pageBtnLeft = ProfileObjectsService.checkPrevButton(this.pageNumberMinimum);
    this.pageBtnRight = ProfileObjectsService.checkNextButton(this.pageNumberMinimum, this.maxCountPage, this.clientService.clients.length);
  }

  editClient(client: Client) {
    this.popupClient = new Client(client.userEmail, client.clientName, client.clientPostalCode, client.clientHouseNumber, client.clientCity, client.clientCountry);
    this.popupEditMode = true;
    this.showPopup = true;
  }

  createClient(){
    this.popupClient = new Client("","","",null,"","");
    this.popupEditMode = false;
    this.showPopup = true;
  }

  onChange(result: any) {
    // console.log("EMIT EVENT: " + result);
    if(result){
      this.clientService.getClientsArray().subscribe(res => {
        this.checkEmptyRows();
        this.checkButtons()
      });
    }
  }

  onCheckboxEvent(client: Client, checked: boolean) {
    if (!checked) {
      this.selectClients.push(client);
    } else {
      let counter = 0;
      for (const selectedClient of this.selectClients) {
        if (selectedClient.clientName === client.clientName) {
          this.selectClients.splice(counter,1);
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
      this.resetSelectedProjects();
      const tempArray: Client[] = this.clientService.clients.slice(this.getMinimum() , this.getMaximum());
      for (const client of tempArray) {
        this.selectClients.push(client);
      }
    } else {
      this.resetSelectedProjects();
    }
    this.checkDeleteButton();
  }

  private resetSelectedProjects(){
    this.selectClients = [];
    this.deleteButtonDisabled = true;
  }

  private checkDeleteButton() {
    this.deleteButtonDisabled = !(this.selectClients.length > 0);
  }

  deleteClientsSelected(result: any) {
    if (result) {
      for (const selectedClient of this.selectClients) {
        this.httpHandler
          .deleteProject("/client/delete/" + this.auth.getUserData().email + "/" + selectedClient.clientName)
          .subscribe(
            res => {
              this.clientService.getClientsArray().subscribe(res => {
                this.checkEmptyRows();
                this.checkButtons()
              })
            })
      }
      this.resetSelectedProjects();
      this.clientService.clients = [];
      //this.onChange(true);
      this.showDeletePopup = false;
    } else {
      this.showDeletePopup = false;
    }
  }

  verwijderPopup() {
    if (this.selectClients.length < 1) {
      this.showDeletePopup = false;
    } else if(this.selectClients.length === 1) {
      this.deletePopup = new DeletePopupModel("Klant verwijderen",
        "Weet u zeker dat u de geselecteerde klant wil verwijderen?",
        "Ja, verwijder klant",
        "Nee, annuleer");
      this.showDeletePopup = true;
    } else if( this.selectClients.length > 1) {
      this.deletePopup = new DeletePopupModel("Klant verwijderen",
        "Weet u zeker dat u de geselecteerde klanten wilt verwijderen?",
        "Ja, verwijder klanten",
        "Nee, annuleer");
      this.showDeletePopup = true;
    }
  }
}
