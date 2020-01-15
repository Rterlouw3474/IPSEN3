export class Car {

  userEmail : string;
  licensePlate: string;
  name: string;
  brand: string;
  type: string;
  color: string;
  fuelType: string;

  constructor(userEmail: string, licensePlate: string, name: string, brand: string, type: string, color: string, fuelType: string) {
    this.userEmail = userEmail;
    this.licensePlate = licensePlate;
    this.name = name;
    this.brand = brand;
    this.type = type;
    this.color = color;
    this.fuelType = fuelType;
  }
}
