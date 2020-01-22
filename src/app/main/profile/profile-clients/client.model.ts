export class Client {

  userEmail: string;
  clientName: string;
  clientPostalCode: string;
  clientHouseNumber: number;
  clientCity: string;
  clientCountry: string;


  constructor(userEmail: string, clientName: string, clientPostalCode: string, clientHouseNumber: number, clientCity: string, clientCountry: string) {
    this.userEmail = userEmail;
    this.clientName = clientName;
    this.clientPostalCode = clientPostalCode;
    this.clientHouseNumber = clientHouseNumber;
    this.clientCity = clientCity;
    this.clientCountry = clientCountry;
  }
}
