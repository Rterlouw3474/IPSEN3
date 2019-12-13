import {Declaration} from './declaration.object';
import {HttpHandlerService} from "../../http-handler.service";

export class DeclarationsComponentModel {
  public declarations: Declaration[];
  public selectedDeclarations: Declaration[];

  constructor(private http : HttpHandlerService) {
    this.selectedDeclarations = [];
  }

  public clone(): DeclarationsComponentModel {
    const clonedModel: DeclarationsComponentModel = JSON.parse(JSON.stringify(this));
    Object.setPrototypeOf(clonedModel, DeclarationsComponentModel);
    return clonedModel;
  }

  getDeclarationArray(){
    this.http.getDeclarations(1).subscribe(
      res => {
        this.declarations = res;
      }
    );
  }


}
