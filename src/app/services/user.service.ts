import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {AuthService} from '../account/auth.service';
import {HttpHandlerService} from '../http-handler.service';
import {Subscription} from 'rxjs';

@Injectable()
export class UserService {

  user: User;
  subscription: Subscription;

  constructor(private auth: AuthService, private http: HttpHandlerService) {
  }

  public getUserData() {
    this.subscription = this.auth.userProfile$.subscribe(userData => {
      this.user = new User(
        userData.email,
        userData.nickname,
        userData.picture,
        userData.sub
      );
    });

    this.http.getUser(this.user.email).subscribe(
      response => {
        if(response != null){
          this.user = response;
        }else{
          this.http.postUser(this.user, '/user/create');
        }
      },
      error => {
        this.http.postUser(this.user, '/user/create');
      });
  }

  onChangeUsername(nameInput: HTMLInputElement) {
    this.http.updateUsername(this.user.email, nameInput.value).subscribe(
      res => {
        this.http.getUser(this.user.email).subscribe(response => {
          this.user = response;
        });
      }
    );
  }
}
