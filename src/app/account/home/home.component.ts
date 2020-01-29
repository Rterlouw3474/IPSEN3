import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {LoadService} from '../../services/load.service';

@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private load: LoadService) { }

  ngOnInit() {
  }
}
