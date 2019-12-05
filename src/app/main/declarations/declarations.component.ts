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

  ngOnInit() {
    this.declarations = [
      new Declaration("a", "a", "a", 5,5),
      new Declaration("b", "b", "b", 3,2)
    ]
  }

}
