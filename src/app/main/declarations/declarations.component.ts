import {Component, OnInit} from "@angular/core";
import {ApplicationStateService} from "../../application-state.service";
import {HttpHandlerService} from "../../http-handler.service";
import {AuthService} from "../../account/auth.service";
import {Declaration} from "../../models/declaration.object";
import {User} from "../../models/user.model";
import {DeclarationService} from "../../services/declaration.service";
import {LoadService} from "../../services/load.service";
import {Sort} from "@angular/material/sort";
import {CarService} from "../../services/car.service";
import {ProjectService} from "../../services/project.service";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-declarations',
  templateUrl: './declarations.component.html',
  styleUrls: ['./declarations.component.scss']
})

export class DeclarationsComponent implements OnInit {

  //page variables
  public pageNumberMinimum = 0;
  public pageNumberMaximum = 10;
  private maxCountPage = 10;
  public pageBtnLeft = true;
  public pageBtnRight = true;

  //empty row variables
  private generateEmptyRows: number;
  public emptyRowsList;

  //checkbox variables
  public allCheckboxesSelected = false;
  public parentCheckboxSelected = false;

  // popup
  public showPopup = false;
  public popupDeclaration: Declaration;
  public popupEditMode = false;

  //edit button variables
  public removeDelete = true;
  public removeEdit = true;

  public selectedDeclarations: { id: number; declaration : Declaration; }[];

  //kan volgens mij gewoon weg
  licencePlate: string;
  projectName : string;
  clientName: string;

  public authUser : User;

  constructor(private applicationStateService: ApplicationStateService, private http: HttpHandlerService,
              private auth: AuthService, private decService:DeclarationService,
              private load:LoadService, private carService: CarService, private projectService:ProjectService,
              private clientService:ClientService) {
    this.selectedDeclarations = [];
    this.checkButtons();
    this.checkEmptyRows();
  }

  ngOnInit() {}


  isMobile() {
    return this.applicationStateService.getIsMobileResolution();
  }



  sortData(sort: Sort) {
    const data = this.decService.declarations.slice();
    if (!sort.active || sort.direction === '') {
      this.decService.declarations = data;
      return;
    }

    this.decService.declarations = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'omschrijving': return this.compare(a.decDesc, b.decDesc, isAsc);
        //case 'auto': return this.compare(a.dec, b.auto, isAsc);
        case 'datum': return this.compare(a.decDate, b.decDate, isAsc);
        case 'kilometers': return this.compare(a.decKilometers, b.decKilometers, isAsc);
        case 'bedrag': return this.compare(a.decDeclaration, b.decDeclaration, isAsc);
        default: return 0;
      }
    });
  }


 compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

  //function for checking all boxes when the parent checkbox is checked.
  onSelectAllCheckboxes(checked: boolean) {
    this.allCheckboxesSelected = !checked;

    if (this.allCheckboxesSelected) {
      this.resetSelectedDeclarations();
      const tempArray: Declaration[] = this.decService.declarations.slice(this.pageNumberMinimum , this.pageNumberMaximum);
      let id = this.pageNumberMinimum;

      for (const declaration of tempArray) {
            this.selectedDeclarations.push({id, declaration});
            id++;
        }
    } else {
      this.resetSelectedDeclarations();
    }
    this.removeButtonsFromScreen();
  }

  //function for deleting a declaration
  OnDeleteEvent() {
    const selectedDeclaration = this.selectedDeclarations[0].declaration;
    this.http.deleteDeclaration('/declaration/delete/'
                          + this.auth.getUserData().email + '/'
                          + selectedDeclaration.decDesc + '/'
                          + selectedDeclaration.decDate)
      .subscribe(
        responseData => {
          this.decService.getDeclarationArray().subscribe(()=>{
            this.checkButtons();
            this.checkEmptyRows();
          });
        });
    this.resetSelectedDeclarations();
  }

  //gets declarations based on page count
  getSlicedDeclaration() {
    try {
      return this.decService.declarations.slice(this.pageNumberMinimum , this.pageNumberMaximum);
    } catch (e) { } //no declarations
  }

  //creates a copy of a declaration
  createDeclarationCopy(declaration: Declaration, ): Declaration {
    if (declaration.decDesc.includes('[')) {
      const a: number = Number(declaration.decDesc.charAt(declaration.decDesc.indexOf('[') + 1));

      declaration.decDesc = declaration.decDesc.substring(0, declaration.decDesc.length - 3);
      if (!(a + 1 === 10)) {
        declaration.decDesc = declaration.decDesc.concat('[' + Number(a + 1) + ']');
      }
    } else {
      declaration.decDesc = declaration.decDesc + '[2]';
    }
    return declaration;
  }

  //function for copying a declaration
  OnCopyEvent() {
    const selectedDeclaration = this.selectedDeclarations[0].declaration;
    const oldDeclaration = this.createDeclarationCopy(selectedDeclaration);

    this.http.postDeclaration(oldDeclaration, '/declaration/create')
      .subscribe(res => {
          this.allCheckboxesSelected = false;
          this.resetSelectedDeclarations();
          this.decService.getDeclarationArray().subscribe(()=>{
            this.checkButtons();
            this.checkEmptyRows();
          });
      });

  }

  //removes edit buttons from DOM after animation
  removeButtonsFromScreen() {
    const that = this;
    if (this.selectedDeclarations.length == 0) {
      setTimeout(function() {
        that.removeDelete = true;
        that.removeEdit = true;
      }, 150);
    } else if (this.selectedDeclarations.length == 1) {
      this.removeDelete = false;
      this.removeEdit = false;
    } else if (this.selectedDeclarations.length > 1) {
      setTimeout(function() {
        that.removeDelete = false;
        that.removeEdit = true;
      }, 150);
    }
  }

  //function for checking a checkbox
  onCheckboxEvent(declaration: Declaration, checked: boolean, id: number) {
    id = id + this.pageNumberMinimum;
    if (!checked) {
      this.selectedDeclarations.push({id, declaration});
    } else {
      let counter = 0;
      for (const selectedDeclaration of this.selectedDeclarations) {
        if (selectedDeclaration.id === id) {
          this.selectedDeclarations.splice(counter, 1);
        }
        counter++;
      }
    }
    this.removeButtonsFromScreen();
  }

  getRealMaximum() {
    if (this.decService.declarations.length < this.pageNumberMaximum) {
      return this.decService.declarations.length;
    } else {
      return this.pageNumberMaximum;
    }
  }

  nextPage() {
    if (!(this.pageNumberMinimum + 10 >= this.decService.declarations.length)) {
      this.pageNumberMinimum += 10;
      this.pageNumberMaximum += 10;
      this.pageReset();
    }
  }

  prevPage() {
    if (this.pageNumberMinimum > 0) {
      this.pageNumberMinimum -= 10;
      this.pageNumberMaximum -= 10;
      this.pageReset();
    }
  }

  pageReset(){
    this.allCheckboxesSelected = false;
    this.parentCheckboxSelected = false;
    this.resetSelectedDeclarations();
    this.checkButtons();
    this.checkEmptyRows();
  }

  private checkButtons() {
    this.pageBtnLeft = this.pageNumberMinimum >= 2;
    this.pageBtnRight = this.pageNumberMinimum + this.maxCountPage <= this.decService.declarations.length;
  }

  resetSelectedDeclarations() {
    this.selectedDeclarations = [];
    this.removeButtonsFromScreen();
  }

  private checkEmptyRows() {
    this.generateEmptyRows = this.pageNumberMaximum - this.decService.declarations.length;
    if (this.generateEmptyRows < 1) {
      this.generateEmptyRows = 0;
    }
    this.emptyRowsList = Array(this.generateEmptyRows).fill(1);
  }


  editDeclaration(declaration: Declaration) {
    this.popupDeclaration = new Declaration(declaration.userEmail, declaration.decDesc, declaration.decDate, declaration.decKilometers, declaration.decDeclaration, declaration.decBeginPostal, declaration.decBeginHouseNumber, declaration.decBeginStreet, declaration.decBeginCity, declaration.decBeginCountry, declaration.decEndPostal, declaration.decEndHouseNumber, declaration.decEndStreet, declaration.decEndCity, declaration.decEndCountry, declaration.clientName, declaration.projectName, declaration.licencePlate);
    this.popupEditMode = true;
    this.showPopup = true;
  }

  //converts €0.0 to normal €0,00 notation
  convertToNormalNotation(declaration: Declaration) {
    let money = 0;
    let returnMoney: string;
    money += declaration.decDeclaration;
    returnMoney = (Math.round(money * 1000) / 1000).toFixed(2);
    returnMoney = returnMoney.replace('.', ',');
    return returnMoney;
  }

  private checkButtons() {
    this.pageBtnLeft = this.pageNumberMinimum >= 2;
    this.pageBtnRight = this.pageNumberMinimum + this.maxCountPage <= this.decService.declarations.length;
  }

  private checkEmptyRows() {
    this.generateEmptyRows = this.pageNumberMaximum - this.decService.declarations.length;
    if (this.generateEmptyRows < 1) {
      this.generateEmptyRows = 0;
    }
    this.emptyRowsList = Array(this.generateEmptyRows).fill(1)
  }
}
