export class Declaration{

  public id: number;
  public description: string;
  public beginPost: string;
  public endPost: string;
  public km : number;
  public amount : number;

  constructor(id:number, description : string, beginPost: string, endPost: string, km : number, amount : number){
    this.id = id;
    this.description = description;
    this.beginPost = beginPost;
    this.endPost = endPost;
    this.km = km;
    this.amount = amount;
  }
}
