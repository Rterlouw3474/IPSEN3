export class ProfileObjectsService {
  public static checkPrevButton(pageNumberMinimum: number) {
    return !(pageNumberMinimum < 2);
  }

  public static checkNextButton(pageNumberMinimum: number, maxCountPage: number, arrayLength: number){
    return !(pageNumberMinimum + maxCountPage > arrayLength);
  }
}
