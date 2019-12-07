import { Component, OnInit } from '@angular/core';
import {Declaration} from './declaration.model';

@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.scss']
})


export class DeclarationsComponent implements OnInit {
  declarations: Declaration[] = [];

  constructor() { }

  ngOnInit() {
    this.declarations = [
      new Declaration('Rit naar werk', 'Ferrari', '21-12-2019', 37, 7 ),
      new Declaration('Rit naar huis', 'Ferrari', '21-12-2019', 37, 7 ),
      new Declaration('Rit naar werk', 'Ferrari', '22-12-2019', 37, 7 ),
      new Declaration('Rit naar huis', 'Ferrari', '22-12-2019', 37, 7 ),
      new Declaration('Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration('Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration('Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration('Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration('Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration('Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration('Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration('Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 ),
      new Declaration('Ritje naar Amerika', 'Ferrari', '23-12-2019', 4582, 503 )
    ];
  }

}
