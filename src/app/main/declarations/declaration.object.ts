export class Declaration{

  userEmail : string;
  decDesc : string;
  decDate : string;
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

  constructor(userEmail : string, decDesc : string, decDate: string,  decKilometers : number, decDeclaration : number, decBeginPostal : string, decBeginHouseNumber : number, decBeginStreet : string, decBeginCity : string, decBeginCountry : string, decEndPostal : string, decEndHouseNumber : number, decEndStreet : string, decEndCity : string, decEndCountry : string){
    this.userEmail = userEmail;
    this.decDesc = decDesc;
    this.decDate = decDate;
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
