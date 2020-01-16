import { Component, OnInit } from '@angular/core';
import {Project} from './project.model';
import {ProfileObjectsService} from '../profile-objects.service';
import {AuthService} from "../../../account/auth.service";

@Component({
  selector: 'app-profile-projects',
  templateUrl: './profile-projects.component.html',
  styleUrls: ['./profile-projects.component.scss']
})
export class ProfileProjectsComponent implements OnInit {

  name: string;
  desc: string;
  startDate: string;
  endDate: string;

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

  constructor(private authservice: AuthService) {
    // hier worden alle projecten in geladen
    this.projects = [
      new Project(this.authservice.getUserData().email, "Fred", "", "17-12-2019", "18-12-2019"),
      new Project(this.authservice.getUserData().email,"Älbert", "", "17-12-2019", "18-12-2019"),
      new Project(this.authservice.getUserData().email,"this.name", "", "17-12-2019", "18-12-2019"),
      new Project(this.authservice.getUserData().email,"this.name", "", "17-12-2019", "18-12-2019"),
      new Project(this.authservice.getUserData().email,"this.name", "", "17-12-2019", "18-12-2019"),
      new Project(this.authservice.getUserData().email,"this.name", "", "17-12-2019", "18-12-2019"),
      new Project(this.authservice.getUserData().email,"this.name", "", "17-12-2019", "18-12-2019"),
      new Project(this.authservice.getUserData().email,"this.name", "", "17-12-2019", "18-12-2019"),
      new Project(this.authservice.getUserData().email,"this.name", "", "17-12-2019", "18-12-2019")
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

  get projectList() {
    return this.projects
  }
}
