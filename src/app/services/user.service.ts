import {Injectable} from "@angular/core";
import {User} from "../models/user.model";
import {DatabaseUser} from "../models/databaseuser.model";
import {AuthService} from "../account/auth.service";
import {HttpHandlerService} from "../http-handler.service";
import {Subscription} from "rxjs";

@Injectable()
export class UserService {

  username: string;
  authUser: User;
  databaseUser : DatabaseUser;
  subscription:Subscription;

  constructor(private auth:AuthService, private http:HttpHandlerService){ }

  public getUserData() {
    this.subscription = this.auth.userProfile$.subscribe(userData => {
      console.log(userData);
      this.authUser = new User(
        userData.email,
        userData.nickname,
        userData.picture,
        userData.sub
      );
      this.http.getUser(this.authUser.email).subscribe(res=>{
        this.databaseUser = res;
        console.log(this.databaseUser);
        this.username = this.databaseUser.username;
      });
    });
  }

  onChangeUsername(nameInput: HTMLInputElement) {
    this.http.updateUsername(this.authUser.email, nameInput.value).subscribe(
      res =>{
        this.http.getUser(this.authUser.email).subscribe(res=>{
          this.databaseUser = res;
          this.username = this.databaseUser.username;
        })
      }
    )
  }
}
