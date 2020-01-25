import { Component, OnInit } from '@angular/core';
import {Project} from './project.model';
import {ProfileObjectsService} from '../profile-objects.service';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../account/auth.service';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-profile-projects',
  templateUrl: './profile-projects.component.html',
  styleUrls: ['./profile-projects.component.scss']
})
export class ProfileProjectsComponent implements OnInit {
  private maxCountPage = 6;
  public projects: Project[];
  public selectedProjects: Project[];
  public pageNumberMinimum = 0;
  public pageNumberMaximum = this.maxCountPage;

  private generateEmptyRows: number;
  public emptyRowsList;

  public allCheckboxesSelected = false;

  public pageBtnLeft = true;
  public pageBtnRight = true;

  // popup
  public showPopup = false;
  public popupProject: Project;
  public popupEditMode = false;

  constructor(private auth: AuthService, private userService:UserService) {
    // hier worden alle projecten in geladen
    this.projects = [
      new Project(userService.authUser.email,"Project 1", "Dit is een beschrijving!!!!!", "11-06-2000", "20-12-2019"),
      new Project(userService.authUser.email,"Project 2", "Beschrijving YOLO", "17-12-2019", "18-12-2019"),
      new Project(userService.authUser.email,"Project 3", "lol", "17-12-2019", "18-12-2019"),
      new Project(userService.authUser.email,"Project 4", "Peter r de vries vind dit een beschrijving", "17-12-2019", "18-12-2019"),
      new Project("baljit@krdf.nl","Project 5", "Beschrijving2", "17-12-2019", "18-12-2019"),
      new Project("ole@krdf.nl","Project 6", "Beschrijving3", "17-12-2019", "18-12-2019"),
      new Project("richard@krdf.nl","Project 7", "Beschrijving4", "17-12-2019", "18-12-2019"),
      new Project("richard@krdf.nl","Project 8", "Beschrijving56", "17-12-2019", "18-12-2019"),
      new Project("richard@krdf.nl","Project 9", "Beschrijving766", "17-12-2019", "18-12-2019")
    ];
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
    if (!(this.pageNumberMinimum + this.maxCountPage > this.projects.length)) {
      this.pageNumberMinimum += this.maxCountPage;
      this.pageNumberMaximum += this.maxCountPage;
      this.checkEmptyRows();
      this.checkButtons()
    }
  }

  prevPage() {
    if (this.pageNumberMinimum > 0) {
      this.pageNumberMinimum -= this.maxCountPage;
      this.pageNumberMaximum -= this.maxCountPage;
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
    this.popupProject = project;
    this.popupEditMode = true;
    this.showPopup = true;
  }
}
