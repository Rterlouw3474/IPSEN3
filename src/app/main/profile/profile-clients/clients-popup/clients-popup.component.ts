import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../../../models/project.model';
import {Form, FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {HttpHandlerService} from '../../../../http-handler.service';
import {Client} from '../../../../models/client.model';
import {ProfileObjectsService} from '../../profile-objects.service';
import {AuthService} from '../../../../account/auth.service';
import {ClientService} from '../../../../services/client.service';

@Component({
  selector: 'app-clients-popup',
  templateUrl: './clients-popup.component.html',
  styleUrls: ['./clients-popup.component.scss']
})
export class ClientsPopupComponent implements OnInit {
  @Input() editMode: boolean;
  @Input() client: Client;

  @Input() showPopup: boolean;
  @Output() showPopupChange = new EventEmitter<boolean>();

  clientName: string;
  clientPostalCode: string;
  clientHouseNumber: number;
  clientCity: string;
  clientCountry: string;

  popupHeader: string;
  constructor(private auth: AuthService, private httpHandler : HttpHandlerService, private clientService:ClientService) {
  }

  ngOnInit() {
    if (this.editMode) {
      this.popupHeader = "Klant wijzigen";
    } else {
      this.popupHeader = "Klant aanmaken";
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

  createClient(){
    if(this.clientName != " " && this.clientPostalCode != " " && this.clientHouseNumber != 0 && this.clientCity != " " && this.clientCountry != " ") {
      let client = new Client(this.auth.getUserData().email, this.client.clientName, this.client.clientPostalCode.replace(" ", ""), this.client.clientHouseNumber, this.client.clientCity, this.client.clientCountry);
      console.log(client);
      this.httpHandler.postClient(client, "/client/create").subscribe(res=> {
        console.log(res);
        this.clientService.getClientsArray();
      }, err=>{
        console.log(err);
        this.clientService.getClientsArray();
      });
      this.closePopup();
    }
  }
}
