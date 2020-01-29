import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../../../models/project.model';
import {Form, FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ProfileObjectsService} from '../../profile-objects.service';
import {HttpHandlerService} from '../../../../http-handler.service';
import {AuthService} from '../../../../account/auth.service';
import set = Reflect.set;
import {ProjectService} from '../../../../services/project.service';

@Component({
  selector: 'app-projects-popup',
  templateUrl: './projects-popup.component.html',
  styleUrls: ['./projects-popup.component.scss']
})
export class ProjectsPopupComponent implements OnInit {
  @Input() editMode: boolean;
  @Input() project: Project;

  @Input() showPopup: boolean;
  @Output() showPopupChange = new EventEmitter<boolean>();

  @Output() returnChange = new EventEmitter<boolean>();

  beginDate: FormControl;
  endDate: FormControl;

  popupHeader: string;
  constructor(private auth: AuthService, private datePipe: DatePipe, private httpHandler : HttpHandlerService, private projectService:ProjectService) {
  }

  ngOnInit() {
    if (this.editMode) {
      this.popupHeader = "Project wijzigen";
      this.beginDate = new FormControl(ProfileObjectsService.parseDateObject(this.project.projectStartDate));
      this.endDate = new FormControl(ProfileObjectsService.parseDateObject(this.project.projectEndDate));
    } else {
      this.popupHeader = "Project aanmaken";
      this.beginDate = new FormControl();
      this.endDate = new FormControl();
    }
    this.beginDate.disable({onlySelf: true});
    this.endDate.disable({onlySelf: true});
  }

  closePopup(){
    this.showPopupChange.emit(false);
  }

  closePopupOutsidePopup(event: any){
    if(event.target.className === "full-screen" || event.target.className === "popup-wrapper") {
      this.closePopup();
    }
  }

  createProject(){
    let ok = true;
    ok = this.checkValues();
    if (!ok){
      if(this.editMode) {
        alert("Project niet gewijzigd, niet alle velden zijn ingevuld.")
      } else {
        alert("Project niet aangemaakt, niet alle velden zijn ingevuld.")
      }
    }
    if (ok) {
      const newBeginDate = this.datePipe.transform(this.beginDate.value, 'dd-MM-yyyy');
      const newEndDate = this.datePipe.transform(this.endDate.value, 'dd-MM-yyyy');

      const projectToPost = new Project(this.auth.getUserData().email, this.project.projectName, this.project.projectDesc, newBeginDate, newEndDate);
      console.log(projectToPost);
      if (this.editMode) {
        this.httpHandler.postProject(projectToPost, "/project/update").subscribe();
      } else {
        this.httpHandler.postProject(projectToPost, "/project/create").subscribe();
      }
      const that = this;
      setTimeout(function() {
        that.returnChange.emit(true);
        that.closePopup();
      },200);
    }

  }


  private checkValues() {
    return !(this.project.projectName === "" || this.project.projectDesc === "" || this.beginDate.value === null || this.endDate.value === null);
  }
}
