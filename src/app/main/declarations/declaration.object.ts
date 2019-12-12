export class Declaration{

  ownerID : number;
  decDesc : string;
  // decDate : date;
  decKilometers : number;
  decDeclaration : number;

  decBeginPostal : string;
  decBeginHouseNumber : number;
  decBeginStreet : string;
  decBeginCity : string;
  decBeginCountry : string;

  decEndPostal : string;
  decEndHouseNumber : number;
  decEndStreet : string;
  decEndCity : string;
  decEndCountry : string;

  constructor(ownerID : number, decDesc : string, decKilometers : number, decDeclaration : number, decBeginPostal : string, decBeginHouseNumber : number, decBeginStreet : string, decBeginCity : string, decBeginCountry : string, decEndPostal : string, decEndHouseNumber : number, decEndStreet : string, decEndCity : string, decEndCountry : string){
    this.ownerID = ownerID;
    this.decDesc = decDesc;
    this.decKilometers = decKilometers;
    this.decDeclaration = decDeclaration;
    this.decBeginPostal = decBeginPostal;
    this.decBeginHouseNumber = decBeginHouseNumber;
    this.decBeginStreet = decBeginStreet;
    this.decBeginCity = decBeginCity;
    this.decBeginCountry = decBeginCountry;
    this.decEndPostal = decEndPostal;
    this.decEndHouseNumber = decEndHouseNumber;
    this.decEndStreet = decEndStreet;
    this.decEndCity = decEndCity;
    this.decEndCountry = decEndCountry;

  }
}
