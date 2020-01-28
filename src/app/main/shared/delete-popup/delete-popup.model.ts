export class DeletePopupModel {
  header: string;
  mainContent: string;
  confirmButtonText: string;
  cancelButtonText: string;


  constructor(header: string, mainContent: string, confirmButtonText: string, cancelButtonText: string) {
    this.header = header;
    this.mainContent = mainContent;
    this.confirmButtonText = confirmButtonText;
    this.cancelButtonText = cancelButtonText;
  }
}
