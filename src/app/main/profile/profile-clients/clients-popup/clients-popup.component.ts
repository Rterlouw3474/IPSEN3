import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../profile-projects/project.model';
import {FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {HttpHandlerService} from '../../../../http-handler.service';
import {Client} from '../client.model';
import {ProfileObjectsService} from '../../profile-objects.service';

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

  beginDate: FormControl;
  endDate: FormControl;

  popupHeader: string;
  constructor(private httpHandler : HttpHandlerService) {
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

    const clientToPost = new Client(this.client.userEmail, this.client.clientName, this.client.clientPostalCode.replace(" ",""), this.client.clientHouseNumber, this.client.clientCity, this.client.clientCountry);
    console.log(clientToPost);
    this.httpHandler.postClient(clientToPost, "/client/create");
  }

}
