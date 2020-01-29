import { Component, OnInit } from '@angular/core';
import {Project} from '../../../models/project.model';
import {ProfileObjectsService} from '../profile-objects.service';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../account/auth.service';
import {HttpHandlerService} from '../../../http-handler.service';
import {timeout} from 'rxjs/operators';
import {DeletePopupModel} from '../../shared/delete-popup/delete-popup.model';
import {UserService} from "../../../services/user.service";
import {ProjectService} from "../../../services/project.service";

@Component({
  selector: 'app-profile-projects',
  templateUrl: './profile-projects.component.html',
  styleUrls: ['./profile-projects.component.scss']
})
export class ProfileProjectsComponent implements OnInit {
  user: User;
  private maxCountPage = 6;
  public selectedProjects: Project[];
  public pageNumberMinimum = 0;
  public pageNumberMaximum = this.maxCountPage;

  private generateEmptyRows: number;
  public emptyRowsList;

  public parentCheckboxSelected = false;
  public allCheckboxesSelected = false;

  public pageBtnLeft = true;
  public pageBtnRight = true;

  public deleteButtonDisabled = true;

  // popups
  public showDeletePopup = false;
  public deletePopup: DeletePopupModel;
  public showPopup = false;
  public popupProject: Project;
  public popupEditMode = false;

  constructor(private auth: AuthService, private httpHandler : HttpHandlerService, private userService:UserService, private projectService:ProjectService) {
    this.selectedProjects = [];
    this.checkEmptyRows();
    this.checkButtons();
  }

  ngOnInit() {
  }



  // Wisselen van pagina's
  getMinimum() {
    return this.pageNumberMinimum;
  }

  getMaximum() {
    return this.pageNumberMaximum;
  }

  nextPage() {
    if (!(this.pageNumberMinimum + this.maxCountPage > this.projectService.projects.length)) {
      this.pageNumberMinimum += this.maxCountPage;
      this.pageNumberMaximum += this.maxCountPage;
      this.resetSelectedProjects();
      this.allCheckboxesSelected = false;
      this.parentCheckboxSelected = false;
      this.checkEmptyRows();
      this.checkButtons()
    }
  }

  prevPage() {
    if (this.pageNumberMinimum > 0) {
      this.pageNumberMinimum -= this.maxCountPage;
      this.pageNumberMaximum -= this.maxCountPage;
      this.resetSelectedProjects();
      this.allCheckboxesSelected = false;
      this.parentCheckboxSelected = false;
      this.checkEmptyRows();
      this.checkButtons()
    }
  }

  private checkEmptyRows() {
    this.generateEmptyRows = this.pageNumberMaximum - this.projectService.projects.length;
    if (this.generateEmptyRows < 1){
      this.generateEmptyRows = 0;
    }
    this.emptyRowsList = Array(this.generateEmptyRows).fill(1);
  }

  private checkButtons(){
    this.pageBtnLeft = ProfileObjectsService.checkPrevButton(this.pageNumberMinimum);
    this.pageBtnRight = ProfileObjectsService.checkNextButton(this.pageNumberMinimum, this.maxCountPage, this.projectService.projects.length);
  }

  editProject(project: Project) {
    this.popupProject = new Project(project.userEmail, project.projectName, project.projectDesc, project.projectStartDate, project.projectEndDate);
    this.popupEditMode = true;
    this.showPopup = true;
  }

  createProject() {
    // email wordt toegevoegd onCreate
    this.popupProject = new Project("","","","","");
    this.popupEditMode = false;
    this.showPopup = true;
  }

  onChange(result: any) {
    console.log("EMIT EVENT: " + result);
    if(result){
        this.checkEmptyRows();
        this.checkButtons();
      console.log("getprojects");
    }
  }

  onCheckboxEvent(project: Project, checked: boolean) {
    if (!checked) {
      this.selectedProjects.push(project);
    } else {
      let counter = 0;
      for (const selectedProject of this.selectedProjects) {
        if (selectedProject.projectName === project.projectName) {
          this.selectedProjects.splice(counter,1);
        }
        counter++;
      }
    }
    this.checkDeleteButton();
    console.log(this.selectedProjects);
  }

  onSelectAllCheckboxes(checked: boolean) {
    this.allCheckboxesSelected = !checked;

    if (this.allCheckboxesSelected) {
      this.resetSelectedProjects();
      const tempArray: Project[] = this.projectService.projects.slice(this.getMinimum() , this.getMaximum());
      for (const project of tempArray) {
        this.selectedProjects.push(project);
      }
    } else {
      this.resetSelectedProjects();
    }
    this.checkDeleteButton();

    console.log(this.selectedProjects);
  }

  private resetSelectedProjects(){
    this.selectedProjects = [];
    this.deleteButtonDisabled = true;
  }

  private checkDeleteButton() {
    this.deleteButtonDisabled = !(this.selectedProjects.length > 0);
  }

  deleteProjectsSelected(result: any) {
    if (result) {
      for (const selectedProject of this.selectedProjects) {
        this.httpHandler
          .deleteProject("/project/deleteProject/" + this.auth.getUserData().email + "/" + selectedProject.projectName)
          .subscribe(
            responseData => {
              console.log(responseData);
            }
          );
      }
      this.resetSelectedProjects();
      this.projectService.projects = [];
      //this.onChange(true);
      this.showDeletePopup = false;
    } else {
      this.showDeletePopup = false;
    }

  }

  verwijderPopup() {
    if (this.selectedProjects.length < 1) {
      this.showDeletePopup = false;
    } else if(this.selectedProjects.length === 1) {
      this.deletePopup = new DeletePopupModel("Project verwijderen",
        "Weet u zeker dat u het geselecteerde project wil verwijderen?",
        "Ja, verwijder project",
        "Nee, annuleer");
      this.showDeletePopup = true;
    } else if( this.selectedProjects.length > 1) {
      this.deletePopup = new DeletePopupModel("Project verwijderen",
        "Weet u zeker dat u de geselecteerde projecten wil verwijderen?",
        "Ja, verwijder projecten",
        "Nee, annuleer");
      this.showDeletePopup = true;
    }
  }


}
