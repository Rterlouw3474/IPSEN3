export class GoogleresponseModel {

  constructor(
    public originStreet: string,
    public originCountry: string,
    public destinationStreet: string,
    public destinationCountry: string,
    public distance: string) {
  }
}
