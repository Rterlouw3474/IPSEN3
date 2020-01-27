

export class ProfileObjectsService {
  public static checkPrevButton(pageNumberMinimum: number) {
    return !(pageNumberMinimum < 2);
  }

  public static checkNextButton(pageNumberMinimum: number, maxCountPage: number, arrayLength: number){
    return !(pageNumberMinimum + maxCountPage > arrayLength);
  }

  public static parseDateObject(date: string){
    try {
      let startDateList = date.split('-');
      startDateList[1] = (Number(startDateList[1]) - 1).toString();
      let startDateFinal = new Date();
      console.log(startDateList);
      startDateFinal.setFullYear(
        Number(startDateList[2]),
        Number(startDateList[1]),
        Number(startDateList[0]));
      return startDateFinal;
    } catch (exception){
      console.log(exception);
      console.log("Startdate not valid");
      return null;
    }
  }
}
