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
      this.selectedDeclarations.splice(0, 100);
      for(let counter:number = this.getMinimum(); counter<this.getMaximum(); counter++){
        for(let arrayDeclarations of this.declarations){
          if(counter === arrayDeclarations.id){
            this.selectedDeclarations.push(arrayDeclarations);
          }
        }
      }
    }else{
      this.selectedDeclarations.splice(0, 100);
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
        if(arrayDeclarations.id === id){
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
      new Declaration(0, 'Rit naar werk', 'Ferrari', '21-12-2019', 37, 7 ),
      new Declaration(1, 'Rit naar huis', 'Ferrari', '21-12-2019', 37, 7 ),
      new Declaration(2, 'Rit naar werk', 'Ferrari', '22-12-2019', 37, 7 ),
      new Declaration(3, 'Rit naar huis', 'Ferrari', '22-12-2019', 37, 7 ),
      new Declaration(4, 'Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration(5, 'Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration(6, 'Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration(7, 'Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration(8, 'Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration(9, 'Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration(10, 'Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration(11, 'Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration(12, 'Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 )
    ];
  }

}
