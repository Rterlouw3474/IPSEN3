import {Injectable} from "@angular/core";
import {AuthService} from "../account/auth.service";

@Injectable()
export class LoadService {

  isLoading = true;

  constructor(private auth:AuthService){}

  setLoadingFalse(){
    let setLoading = setInterval(()=>{
      if(this.auth.loggedIn){
        setTimeout(()=>{
          this.isLoading = false;
          clearInterval(setLoading)
        },500);
      }
    }, 200);
  }

}
