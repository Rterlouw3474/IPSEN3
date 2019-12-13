import { Component, OnInit } from '@angular/core';
import {Declaration} from './declaration.object';
import {log} from 'util';
import {MAT_CHECKBOX_CLICK_ACTION, MatCheckbox} from '@angular/material/checkbox';
import {DeclarationsComponentModel} from './declarations.component.model';
import {Router} from '@angular/router';
import {ApplicationStateService} from '../../application-state.service';

export abstract class DeclarationsComponent implements OnInit {

  private model: DeclarationsComponentModel;
  public myViewModel: DeclarationsComponentModel;

  public pageNumberMinimum = 0;
  public pageNumberMaximum = 10;

  public allCheckboxesSelected = false;

  protected constructor(private router: Router, private applicationStateService: ApplicationStateService) {
    this.model = new DeclarationsComponentModel();
    this.myViewModel = new DeclarationsComponentModel();
    // this.loadData()      //TODO Load the declarations from the backend
    // this.updateView();   //**Activate only when you want ultimate MVC powers**
  }

  ngOnInit() {  }

  private updateView(): void {
    this.myViewModel = this.model.clone();
  }

  onSelectAllCheckboxes(checked: boolean) {
    this.allCheckboxesSelected = !checked;

    if (this.allCheckboxesSelected) {
      this.model.selectedDeclarations.splice(0, 1000);
      for (let counter: number = this.getMinimum(); counter < this.getMaximum(); counter++) {
        for (const arrayDeclarations of this.model.declarations) {
          if (counter === arrayDeclarations.ownerID) {
            this.model.selectedDeclarations.push(arrayDeclarations);
          }
        }
      }
    } else {
      this.model.selectedDeclarations.splice(0, 1000);
    }
    console.log(this.model.selectedDeclarations);
  }

  onCheckboxEvent(declaration: Declaration, checked: boolean, id: number) {
    id = id + this.getMinimum();

    if (!checked) {
      this.model.selectedDeclarations.push(declaration);
    } else {
      let counter = 0;
      for (const arrayDeclarations of this.model.selectedDeclarations) {
        if (arrayDeclarations.ownerID === id) {
          this.model.selectedDeclarations.splice(counter);
        }
        counter++;
      }
    }
  }

  getMinimum() {
    return this.pageNumberMinimum;
  }

  getMaximum() {
    return this.pageNumberMaximum;
  }

  nextPage() {
    if (!(this.pageNumberMinimum + 10 > this.model.declarations.length)) {
      this.pageNumberMinimum += 10;
      this.pageNumberMaximum += 10;
    }
  }

  prevPage() {
    if (this.pageNumberMinimum > 0) {
      this.pageNumberMinimum -= 10;
      this.pageNumberMaximum -= 10;
    }
  }

}
