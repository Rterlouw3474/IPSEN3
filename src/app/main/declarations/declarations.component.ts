import { Component, OnInit } from '@angular/core';
import {Declaration} from './declaration.model';

@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.scss']
})


export class DeclarationsComponent implements OnInit {
  declarations: Declaration[] = [];
  pageNumberMinimum: number = 0;
  pageNumberMaximum: number = 10;

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
