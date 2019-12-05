import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.scss']
})


export class DeclarationsComponent implements OnInit {

  constructor() { }

  declaration: string[] = ['dienst1', 'Dikke BMW', '28-03-1996', '999', '300'];
  declarations: string[][] = [this.declaration];

  ngOnInit() {
  }

}
