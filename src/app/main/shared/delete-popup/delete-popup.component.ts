import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeletePopupModel} from './delete-popup.model';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.scss']
})
export class DeletePopupComponent implements OnInit {


  @Input() popup: DeletePopupModel;
  @Output() boolReturn = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  delete(){
    this.boolReturn.emit(true);
  }

  close() {
    this.boolReturn.emit(false);
  }

  closePopupOutsidePopup(event: any){
    if(event.target.className === "full-screen" || event.target.className === "popup-wrapper") {
      this.close();
    }
  }

}
