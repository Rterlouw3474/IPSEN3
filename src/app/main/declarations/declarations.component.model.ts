import {Declaration} from './declaration.object';
import {HttpHandlerService} from "../../http-handler.service";
import {AuthService} from '../../account/auth.service';

export class DeclarationsComponentModel {
  public declarations: Declaration[];
  public selectedDeclarations: { id : number; declaration : Declaration; }[];

  constructor(private http : HttpHandlerService, private auth:AuthService) {
    this.selectedDeclarations = [];
  }

  public clone(): DeclarationsComponentModel {
    const clonedModel: DeclarationsComponentModel = JSON.parse(JSON.stringify(this));
    Object.setPrototypeOf(clonedModel, DeclarationsComponentModel);
    return clonedModel;
  }

  getDeclarationArray(){
    this.http.getDeclarations(this.auth.getUserData().email).subscribe(
      res => {
        this.declarations = res;
      }
    );
  }


}
