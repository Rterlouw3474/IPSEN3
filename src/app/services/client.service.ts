import {Injectable} from "@angular/core";
import {HttpHandlerService} from "../http-handler.service";
import {AuthService} from "../account/auth.service";
import {Client} from '../models/client.model';

@Injectable()
export class ClientService {

  constructor(private http:HttpHandlerService, private auth:AuthService){}

  public clients : Client[];

  getClientsArray() {
    return this.http.getClients(this.auth.getUserData().email).subscribe(
      res => {
        this.clients = res;
      });
  }

}
