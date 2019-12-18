import {Declaration} from './declaration.object';
import {HttpHandlerService} from "../../http-handler.service";

export class DeclarationsComponentModel {
  public declarations: Declaration[];
  public selectedDeclarations: { id : number; declaration : Declaration; }[];

  constructor(private http : HttpHandlerService) {
    this.selectedDeclarations = [];
  }

  public clone(): DeclarationsComponentModel {
    const clonedModel: DeclarationsComponentModel = JSON.parse(JSON.stringify(this));
    Object.setPrototypeOf(clonedModel, DeclarationsComponentModel);
    return clonedModel;
  }

  getDeclarationArray(){
    this.http.getDeclarations("test@test.test").subscribe(
      res => {
        this.declarations = res;
      }
    );
  }


}
