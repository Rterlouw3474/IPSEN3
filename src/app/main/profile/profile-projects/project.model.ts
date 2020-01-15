export class Project{

  userEmail : string;
  name: string;
  desc: string;
  startDate: string;
  endDate: string;


  constructor(userEmail: string, projectName: string, projectDesc: string, startDate: string, endDate: string) {
    this.userEmail = userEmail;
    this.name = projectName;
    this.desc = projectDesc;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
