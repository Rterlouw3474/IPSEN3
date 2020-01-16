export class Client {

  userEmail : string;
  name: string;
  postalCode: string;
  houseNumber: string;
  city: string;
  country: string;

  constructor(userEmail: string, name: string, postalCode: string, houseNumber: string, city: string, country: string) {
    this.userEmail = userEmail;
    this.name = name;
    this.postalCode = postalCode;
    this.houseNumber = houseNumber;
    this.city = city;
    this.country = country;
  }
}
