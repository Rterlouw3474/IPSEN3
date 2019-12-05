export class Declaration{

  public description: string;
  public beginPost: string;
  public endPost: string;
  public km : number;
  public amount : number;

  constructor(description : string, beginPost: string, endPost: string, km : number, amount : number){
    this.description = description;
    this.beginPost = beginPost;
    this.endPost = endPost;
    this.km = km;
    this.amount = amount;
  }
}
