export class Project{

  userEmail : string;
  projectName: string;
  projectDesc: string;
  projectStartDate: string;
  projectEndDate: string;


  constructor(userEmail: string, projectName: string, projectDesc: string, startDate: string, endDate: string) {
    this.userEmail = userEmail;
    this.projectName = projectName;
    this.projectDesc = projectDesc;
    this.projectStartDate = startDate;
    this.projectEndDate = endDate;
  }
}
