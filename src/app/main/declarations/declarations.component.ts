import { Component, OnInit } from '@angular/core';
import {Declaration} from './declaration.model';
import {log} from "util";
import {MAT_CHECKBOX_CLICK_ACTION, MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.scss'],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ]
})


export class DeclarationsComponent implements OnInit {
  declarations: Declaration[] = [];
  pageNumberMinimum: number = 0;
  pageNumberMaximum: number = 10;

  selectedDeclarations: Declaration[] = [];

  allCheckboxesSelected: boolean = false;

  onSelectAllCheckboxes(checked: boolean){
    this.allCheckboxesSelected = !checked;

    if(this.allCheckboxesSelected){
      this.selectedDeclarations.splice(0, 1000);
      for(let counter:number = this.getMinimum(); counter<this.getMaximum(); counter++){
        for(let arrayDeclarations of this.declarations){
          if(counter === arrayDeclarations.ownerID){
            this.selectedDeclarations.push(arrayDeclarations);
          }
        }
      }
    }else{
      this.selectedDeclarations.splice(0, 1000);
    }
    console.log(this.selectedDeclarations);
  }

  onCheckboxEvent(declaration : Declaration, checked: boolean, id:number){
    id=id+this.getMinimum();

    if(!checked){
      this.selectedDeclarations.push(declaration);
    }else{
      let counter = 0;
      for(let arrayDeclarations of this.selectedDeclarations){
        if(arrayDeclarations.ownerID === id){
          this.selectedDeclarations.splice(counter);
        }
        counter++;
      }
    }
  }

  getMinimum(){
    return this.pageNumberMinimum;
  }

  getMaximum(){
    return this.pageNumberMaximum
  }

  nextPage(){
    if(!(this.pageNumberMinimum+10>this.declarations.length)){
      this.pageNumberMinimum += 10;
      this.pageNumberMaximum += 10;
    }
  }

  prevPage(){
    if(this.pageNumberMinimum > 0){
      this.pageNumberMinimum -= 10;
      this.pageNumberMaximum -= 10;
    }
  }


  constructor() { }

  ngOnInit() {
    this.declarations = [
      new Declaration(0, "Dit is een registratie", 70, 3.80, "2351JT", 87, "Leithonpark", "Leiderdorp", "Nederland", "2352DA", 65, "Hartelstein", "Leiderdorp", "Nederland"),
      new Declaration(1, "Dit is een registratie", 70, 3.80, "2351JT", 87, "Leithonpark", "Leiderdorp", "Nederland", "2352DA", 65, "Hartelstein", "Leiderdorp", "Nederland"),
      new Declaration(2, "Dit is een registratie", 70, 3.80, "2351JT", 87, "Leithonpark", "Leiderdorp", "Nederland", "2352DA", 65, "Hartelstein", "Leiderdorp", "Nederland"),
      new Declaration(3, "Dit is een registratie", 70, 3.80, "2351JT", 87, "Leithonpark", "Leiderdorp", "Nederland", "2352DA", 65, "Hartelstein", "Leiderdorp", "Nederland"),
      new Declaration(4, "Dit is een registratie", 70, 3.80, "2351JT", 87, "Leithonpark", "Leiderdorp", "Nederland", "2352DA", 65, "Hartelstein", "Leiderdorp", "Nederland"),
      new Declaration(5, "Dit is een registratie", 70, 3.80, "2351JT", 87, "Leithonpark", "Leiderdorp", "Nederland", "2352DA", 65, "Hartelstein", "Leiderdorp", "Nederland"),
      new Declaration(6, "Dit is een registratie", 70, 3.80, "2351JT", 87, "Leithonpark", "Leiderdorp", "Nederland", "2352DA", 65, "Hartelstein", "Leiderdorp", "Nederland"),
      new Declaration(7, "Dit is een registratie", 70, 3.80, "2351JT", 87, "Leithonpark", "Leiderdorp", "Nederland", "2352DA", 65, "Hartelstein", "Leiderdorp", "Nederland"),
      new Declaration(8, "Dit is een registratie", 70, 3.80, "2351JT", 87, "Leithonpark", "Leiderdorp", "Nederland", "2352DA", 65, "Hartelstein", "Leiderdorp", "Nederland"),
      new Declaration(9, "Dit is een registratie", 70, 3.80, "2351JT", 87, "Leithonpark", "Leiderdorp", "Nederland", "2352DA", 65, "Hartelstein", "Leiderdorp", "Nederland"),
      new Declaration(10, "Dit is een registratie", 70, 3.80, "2351JT", 87, "Leithonpark", "Leiderdorp", "Nederland", "2352DA", 65, "Hartelstein", "Leiderdorp", "Nederland"),
      new Declaration(11, "Dit is een registratie", 70, 3.80, "2351JT", 87, "Leithonpark", "Leiderdorp", "Nederland", "2352DA", 65, "Hartelstein", "Leiderdorp", "Nederland"),
      new Declaration(12, "Dit is een registratie", 70, 3.80, "2351JT", 87, "Leithonpark", "Leiderdorp", "Nederland", "2352DA", 65, "Hartelstein", "Leiderdorp", "Nederland"),
    ];
  }

}
