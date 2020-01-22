export class Car {

  licencePlate: string;
  userEmail: string;
  carName: string;
  carBrand: string;
  carType: string;
  carColor: string;
  fuelType: string;

  constructor(licencePlate: string, userEmail: string, name: string, brand: string, type: string, color: string, fuelType: string) {
    this.userEmail = userEmail;
    this.licencePlate = licencePlate;
    this.carName = name;
    this.carBrand = brand;
    this.carType = type;
    this.carColor = color;
    this.fuelType = fuelType;
  }
}
