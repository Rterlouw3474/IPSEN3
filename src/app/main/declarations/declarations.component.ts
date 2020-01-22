import { Component, OnInit } from '@angular/core';
import {Declaration} from './declaration.object';
import {DeclarationsComponentModel} from './declarations.component.model';
import {Router} from '@angular/router';
import {ApplicationStateService} from '../../application-state.service';
import {HttpHandlerService} from "../../http-handler.service";
import {AuthService} from '../../account/auth.service';

export abstract class DeclarationsComponent implements OnInit {

  public model: DeclarationsComponentModel;
  public myViewModel: DeclarationsComponentModel;

  public pageNumberMinimum = 0;
  public pageNumberMaximum = 10;

  private maxCountPage = 10;

  public pageBtnLeft = true;
  public pageBtnRight = true;

  private generateEmptyRows: number;
  public emptyRowsList;

  public allCheckboxesSelected = false;
  public parentCheckboxSelected = false;

  protected constructor(private router: Router, private applicationStateService: ApplicationStateService, private http: HttpHandlerService, private auth:AuthService) {
    this.model = new DeclarationsComponentModel(http, auth);
    this.myViewModel = new DeclarationsComponentModel(http, auth);
  }

  ngOnInit() {
    this.model.getDeclarationArray();
    this.checkButtons();
    this.checkEmptyRows();
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
    const selectedDeclaration = this.model.selectedDeclarations[0].declaration;
    this.http
      .deleteDeclaration("/declaration/delete/" + this.auth.getUserData().email + "/" + selectedDeclaration.decDesc +"/" + selectedDeclaration.decDate)
      .subscribe(
        responseData => {
          this.model.getDeclarationArray();

        }
      );

    this.resetSelectedDeclarations();
  }

  OnCopyEvent() {
    const selectedDeclaration = this.model.selectedDeclarations[0].declaration;
    const oldDeclaration = this.createDeclarationCopy(selectedDeclaration);

    this.http.postDeclaration(oldDeclaration, "/declaration/create")
      .subscribe(res => {
      this.allCheckboxesSelected = false;
      this.resetSelectedDeclarations();
      this.model.getDeclarationArray();
    });
  }

  getSlicedDeclaration(){
    try{
      return this.model.declarations.slice(this.getMinimum() , this.getMaximum());
    }catch (e) {
      console.log("no declarations")
    }
  }


  createDeclarationCopy(declaration: Declaration, ) : Declaration{
    if (declaration.decDesc.includes("[")) {
      let a: number = Number(declaration.decDesc.charAt(declaration.decDesc.indexOf("[") + 1));
      declaration.decDesc = declaration.decDesc.substring(0, declaration.decDesc.length - 3);
      if(!(a+1===10)){
        declaration.decDesc = declaration.decDesc.concat("[" + Number(a + 1) + "]")
      }
    } else {
      declaration.decDesc = declaration.decDesc + "[2]";
    }
    return declaration;
  }

  checkDeclarationName(checkDeclaration: Declaration){
    let sameName : Declaration[] = [];
    for (let declaration of this.model.declarations) {
      if (checkDeclaration.decDesc.substring(0, declaration.decDesc.length - 3) === declaration.decDesc.substring(0, declaration.decDesc.length - 3)) {
        sameName.push(declaration)
      }
    }
    return this.createDeclarationCopy(sameName[sameName.length-1])
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
    if (!(this.pageNumberMinimum + 10 >= this.model.declarations.length)) {
      this.allCheckboxesSelected = false;
      this.parentCheckboxSelected = false;
      this.resetSelectedDeclarations();
      this.pageNumberMinimum += 10;
      this.pageNumberMaximum += 10;
      this.checkButtons();
      this.checkEmptyRows();
    }
  }

  prevPage() {
    if (this.pageNumberMinimum > 0) {
      this.allCheckboxesSelected = false;
      this.parentCheckboxSelected = false;
      this.resetSelectedDeclarations();
      this.pageNumberMinimum -= 10;
      this.pageNumberMaximum -= 10;
      this.checkButtons();
      this.checkEmptyRows();
    }
  }

  private checkButtons(){
    if(this.pageNumberMinimum < 2){
      this.pageBtnLeft = false;
    } else {this.pageBtnLeft= true;}
    if(this.pageNumberMinimum + this.maxCountPage > this.model.declarations.length){
      this.pageBtnRight = false;
    } else {this.pageBtnRight = true;}
  }

  resetSelectedDeclarations(){
    this.model.selectedDeclarations.splice(0, 1000);
  }

  private checkEmptyRows() {
    this.generateEmptyRows = this.pageNumberMaximum - this.model.declarations.length;
    if (this.generateEmptyRows < 1){
      this.generateEmptyRows = 0;
    }
    this.emptyRowsList = Array(this.generateEmptyRows).fill(1);
  }

}
