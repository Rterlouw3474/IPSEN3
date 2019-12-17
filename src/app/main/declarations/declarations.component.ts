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
  public parentCheckboxSelected = false;

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

  //TODO: zodra de juiste implementatie van declaratie opvragen in de database/backend is geimplementeerd deze herschrijven.
  OnDeleteEvent(){
    this.http
      .deleteDeclaration("/declaration/delete/30")
      .subscribe();
    this.model.getDeclarationArray();
    this.updateView();
  }

  OnCopyEvent() {
    const selectedDeclaration = this.model.selectedDeclarations[0].declaration;
    const oldDeclaration = this.createDeclarationCopy(selectedDeclaration);

    //const declarationCopy = new Declaration(oldDeclaration.ownerID, oldDeclaration.decDesc, oldDeclaration.decKilometers, oldDeclaration.decDeclaration, oldDeclaration.decBeginPostal, oldDeclaration.decBeginHouseNumber, oldDeclaration.decBeginStreet, oldDeclaration.decBeginCity, oldDeclaration.decBeginCountry, oldDeclaration.decEndPostal, oldDeclaration.decEndHouseNumber, oldDeclaration.decEndStreet, oldDeclaration.decEndCity, oldDeclaration.decEndCountry);
    const newDeclaration = this.checkDeclarationName(oldDeclaration);

    this.http.postDeclaration(newDeclaration, "/declaration/create");

    this.allCheckboxesSelected = false;
    this.resetSelectedDeclarations();
    this.model.getDeclarationArray();

    this.updateView();
  }

  createDeclarationCopy(declaration: Declaration) : Declaration{
    if (declaration.decDesc.includes("[")) {
      let a: number = Number(declaration.decDesc.charAt(declaration.decDesc.indexOf("[") + 1));
      declaration.decDesc = declaration.decDesc.substring(0, declaration.decDesc.length - 3);
      declaration.decDesc = declaration.decDesc.concat("[" + Number(a + 1) + "]")
    } else {
      declaration.decDesc = declaration.decDesc + "[2]";
    }
    return declaration;
  }

  checkDeclarationName(declaration2: Declaration){
    for (let declaration of this.model.declarations) {
      if (declaration2.decDesc === declaration.decDesc) {
        return this.checkDeclarationName(this.createDeclarationCopy(declaration2));
      }else{
        return declaration2
      }
    }
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
      this.parentCheckboxSelected = false;
      this.resetSelectedDeclarations();
      this.pageNumberMinimum += 10;
      this.pageNumberMaximum += 10;
    }
  }

  prevPage() {
    if (this.pageNumberMinimum > 0) {
      this.allCheckboxesSelected = false;
      this.parentCheckboxSelected = false;
      this.resetSelectedDeclarations();
      this.pageNumberMinimum -= 10;
      this.pageNumberMaximum -= 10;
    }
  }

  resetSelectedDeclarations(){
    this.model.selectedDeclarations.splice(0, 1000);
  }

}
