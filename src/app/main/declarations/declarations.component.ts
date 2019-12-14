import { Component, OnInit } from '@angular/core';
import {Declaration} from './declaration.object';
import {log} from 'util';
import {MAT_CHECKBOX_CLICK_ACTION, MatCheckbox} from '@angular/material/checkbox';
import {DeclarationsComponentModel} from './declarations.component.model';
import {Router} from '@angular/router';
import {ApplicationStateService} from '../../application-state.service';
import {HttpSentEvent} from "@angular/common/http";
import {HttpHandlerService} from "../../http-handler.service";

export abstract class DeclarationsComponent implements OnInit {

  private model: DeclarationsComponentModel;
  public myViewModel: DeclarationsComponentModel;

  public pageNumberMinimum = 0;
  public pageNumberMaximum = 10;

  public allCheckboxesSelected = false;

  protected constructor(private router: Router, private applicationStateService: ApplicationStateService, private http: HttpHandlerService) {
    this.model = new DeclarationsComponentModel(http);
    this.myViewModel = new DeclarationsComponentModel(http);

    // this.loadData()      //TODO Load the declarations from the backend
    // this.updateView();   //**Activate only when you want ultimate MVC powers**
  }

  ngOnInit() {
    this.model.getDeclarationArray();
  }

  private updateView(): void {
    this.myViewModel = this.model.clone();
  }

  //TODO: de 'selectAll' checkbox heeft 2 clicks nodig per actie (??)
  // 5 euro voor de persoon die de bug fixt.
  onSelectAllCheckboxes(checked: boolean) {
    this.allCheckboxesSelected = !checked;

    if (this.allCheckboxesSelected) {
      this.resetSelectedDeclarations();
      const tempArray : Declaration[] = this.model.declarations.slice(this.getMinimum() , this.getMaximum());
      let id = this.getMinimum();

      for (const declaration of tempArray) {
            this.model.selectedDeclarations.push({id, declaration});
            id++;
        }

    } else {
      this.resetSelectedDeclarations();
    }
    console.log(this.model.selectedDeclarations);
  }

  onCheckboxEvent(declaration: Declaration, checked: boolean, id: number) {
    id = id + this.getMinimum();
    if (!checked) {
      this.model.selectedDeclarations.push({id, declaration});
    } else {
      let counter = 0;
           for (const selectedDeclaration of this.model.selectedDeclarations) {
             if (selectedDeclaration.id === id) {
               this.model.selectedDeclarations.splice(counter,1);
             }
             counter++;
           }
    }
    console.log(this.model.selectedDeclarations)
  }

  getMinimum() {
    return this.pageNumberMinimum;
  }

  getMaximum() {
      return this.pageNumberMaximum;
  }

  getRealMaximum(){
    if(this.model.declarations.length < this.getMaximum()){
      return this.model.declarations.length
    }else{
      return this.getMaximum();
    }
  }

  nextPage() {
    if (!(this.pageNumberMinimum + 10 > this.model.declarations.length)) {
      this.allCheckboxesSelected = false;
      this.resetSelectedDeclarations();
      this.pageNumberMinimum += 10;
      this.pageNumberMaximum += 10;
    }
  }

  prevPage() {
    if (this.pageNumberMinimum > 0) {
      this.allCheckboxesSelected = false;
      this.resetSelectedDeclarations();
      this.pageNumberMinimum -= 10;
      this.pageNumberMaximum -= 10;
    }
  }

  resetSelectedDeclarations(){
    this.model.selectedDeclarations.splice(0, 1000);
  }

}
