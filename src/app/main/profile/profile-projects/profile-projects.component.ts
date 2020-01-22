import { Component, OnInit } from '@angular/core';
import {Project} from './project.model';
import {ProfileObjectsService} from '../profile-objects.service';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../account/auth.service';
import {HttpHandlerService} from '../../../http-handler.service';
import {Declaration} from '../../declarations/declaration.object';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-profile-projects',
  templateUrl: './profile-projects.component.html',
  styleUrls: ['./profile-projects.component.scss']
})
export class ProfileProjectsComponent implements OnInit {
  user: User;
  private maxCountPage = 6;
  public projects: Project[];
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

  // popup
  public showPopup = false;
  public popupProject: Project;
  public popupEditMode = false;

  constructor(private auth: AuthService, private httpHandler : HttpHandlerService) {
    this.selectedProjects = [];
  }

  ngOnInit() {
    this.getProjectsArray();
  }


  getProjectsArray(){
    return this.httpHandler.getProjects(this.auth.getUserData().email).subscribe(
      res => {
        this.projects = res;
        this.selectedProjects = [];
        this.checkEmptyRows();
        this.checkButtons();
      }
    );
  }

  // Wisselen van pagina's
  getMinimum() {
    return this.pageNumberMinimum;
  }

  getMaximum() {
    return this.pageNumberMaximum;
  }

  nextPage() {
    if (!(this.pageNumberMinimum + this.maxCountPage > this.projects.length)) {
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
    this.generateEmptyRows = this.pageNumberMaximum - this.projects.length;
    if (this.generateEmptyRows < 1){
      this.generateEmptyRows = 0;
    }
    this.emptyRowsList = Array(this.generateEmptyRows).fill(1);
  }

  private checkButtons(){
    this.pageBtnLeft = ProfileObjectsService.checkPrevButton(this.pageNumberMinimum);
    this.pageBtnRight = ProfileObjectsService.checkNextButton(this.pageNumberMinimum, this.maxCountPage, this.projects.length);
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
      const that = this;
      setTimeout(function() {
        that.getProjectsArray();
      }), 20000;
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
      const tempArray: Project[] = this.projects.slice(this.getMinimum() , this.getMaximum());
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

  deleteProjectsSelected() {
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
    this.projects = [];
    this.onChange(true);

  }


}
