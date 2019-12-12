import {Declaration} from './declaration.object';

export class DeclarationsComponentModel {
  public declarations: Declaration[];
  public selectedDeclarations: Declaration[];

  constructor() {
    this.declarations = [
      new Declaration(0, 'Dit is een registratie', 70, 3.80, '2351JT', 87, 'Leithonpark', 'Leiderdorp', 'Nederland', '2352DA', 65, 'Hartelstein', 'Leiderdorp', 'Nederland'),
      new Declaration(1, 'Dit is een registratie', 70, 3.80, '2351JT', 87, 'Leithonpark', 'Leiderdorp', 'Nederland', '2352DA', 65, 'Hartelstein', 'Leiderdorp', 'Nederland'),
      new Declaration(2, 'Dit is een registratie', 70, 3.80, '2351JT', 87, 'Leithonpark', 'Leiderdorp', 'Nederland', '2352DA', 65, 'Hartelstein', 'Leiderdorp', 'Nederland'),
      new Declaration(3, 'Dit is een registratie', 70, 3.80, '2351JT', 87, 'Leithonpark', 'Leiderdorp', 'Nederland', '2352DA', 65, 'Hartelstein', 'Leiderdorp', 'Nederland'),
      new Declaration(4, 'Dit is een registratie', 70, 3.80, '2351JT', 87, 'Leithonpark', 'Leiderdorp', 'Nederland', '2352DA', 65, 'Hartelstein', 'Leiderdorp', 'Nederland'),
      new Declaration(5, 'Dit is een registratie', 70, 3.80, '2351JT', 87, 'Leithonpark', 'Leiderdorp', 'Nederland', '2352DA', 65, 'Hartelstein', 'Leiderdorp', 'Nederland'),
      new Declaration(6, 'Dit is een registratie', 70, 3.80, '2351JT', 87, 'Leithonpark', 'Leiderdorp', 'Nederland', '2352DA', 65, 'Hartelstein', 'Leiderdorp', 'Nederland'),
      new Declaration(7, 'Dit is een registratie', 70, 3.80, '2351JT', 87, 'Leithonpark', 'Leiderdorp', 'Nederland', '2352DA', 65, 'Hartelstein', 'Leiderdorp', 'Nederland'),
      new Declaration(8, 'Dit is een registratie', 70, 3.80, '2351JT', 87, 'Leithonpark', 'Leiderdorp', 'Nederland', '2352DA', 65, 'Hartelstein', 'Leiderdorp', 'Nederland'),
      new Declaration(9, 'Dit is een registratie', 70, 3.80, '2351JT', 87, 'Leithonpark', 'Leiderdorp', 'Nederland', '2352DA', 65, 'Hartelstein', 'Leiderdorp', 'Nederland'),
      new Declaration(10, 'Dit is een registratie', 70, 3.80, '2351JT', 87, 'Leithonpark', 'Leiderdorp', 'Nederland', '2352DA', 65, 'Hartelstein', 'Leiderdorp', 'Nederland'),
      new Declaration(11, 'Dit is een registratie', 70, 3.80, '2351JT', 87, 'Leithonpark', 'Leiderdorp', 'Nederland', '2352DA', 65, 'Hartelstein', 'Leiderdorp', 'Nederland'),
      new Declaration(12, 'Dit is een registratie', 70, 3.80, '2351JT', 87, 'Leithonpark', 'Leiderdorp', 'Nederland', '2352DA', 65, 'Hartelstein', 'Leiderdorp', 'Nederland'),
    ];
    this.selectedDeclarations = [];
  }

  public clone(): DeclarationsComponentModel {
    const clonedModel: DeclarationsComponentModel = JSON.parse(JSON.stringify(this));
    Object.setPrototypeOf(clonedModel, DeclarationsComponentModel);
    return clonedModel;
  }
}
