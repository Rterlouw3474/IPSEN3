import { Component, OnInit } from '@angular/core';
import {Declaration} from "./declaration.model";

@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.scss']
})


export class DeclarationsComponent implements OnInit {
  declarations : Declaration[] = [];

  constructor() { }

  declaration: string[] = ['dienst1', 'Dikke BMW', '28-03-1996', '999', '300'];
  declarations: string[][] = [this.declaration];

  ngOnInit() {
    this.declarations = [
      new Declaration("a", "a", "a", 5,5),
      new Declaration("b", "b", "b", 3,2)
    ]
  }

}
