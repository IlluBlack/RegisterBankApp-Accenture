import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base.component';
import { MatSnackBar } from '@angular/material';
import { GetCreditService } from 'src/app/services/get-credit/get-credit.service';
import { User, legalAge } from './../../user.model';

@Component({
  selector: 'app-get-personal-information',
  templateUrl: './get-personal-information.component.html',
  styleUrls: ['./get-personal-information.component.scss']
})
export class GetPersonalInformationComponent extends BaseComponent implements OnInit {
  @Input() id;

  loadingBar: boolean = true;
  showUserRegistered: boolean = false;
  personalInformation: FormGroup;

  currentDate: Date = new Date();
  maxDate: Date;

  userData: User;
  userFields = userTranslations;

  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private _getCreditService: GetCreditService) {
    super(_snackBar);

    this.personalInformation = _formBuilder.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      birthday: ["", [Validators.required]]
    });

    this.calculateMaxDateInput();
  }

  calculateMaxDateInput(){
    this.maxDate = new Date(this.currentDate.getFullYear() - legalAge, this.currentDate.getMonth(), this.currentDate.getDate() - 1);
  }

  ngOnInit() {
    this.showUserRegistered = false;
    this.cancelLoading();
  }

  register() {
    this.loading();
    if (this.hasLegalAge()) {
      this.setUserData();

      this._getCreditService.registerUser(this.userData).subscribe(data => {
        this.userRegisteredCorrectly();
      }, error => {
        this.openSnackBar("Lo sentimos. Ha ocurrido un error al realizar tu registro", false);
        this.cancelLoading();
      });

    } else {
      this.openSnackBar("Lo sentimos. Debes ser mayor de edad para poder registrarte", undefined);
      this.cancelLoading();
    }
  }

  setUserData() {
    this.userData = {
      identification: this.id,
      firstname: this.personalInformation.get("firstname").value,
      lastname: this.personalInformation.get("lastname").value,
      birthday: this.format_DD_MM_YYYY(this.personalInformation.get("birthday").value)
    };
  }

  hasLegalAge(): boolean {
    let date: Date = this.personalInformation.get("birthday").value;
    if (date.getFullYear() > this.maxDate.getFullYear()) {
      return false;
    }

    if (date.getFullYear() == this.maxDate.getFullYear()) {
      if (date.getMonth() >= this.maxDate.getMonth()) {
        if (date.getDate() > this.maxDate.getDate()) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
    else {
      return true;
    }
  }

  userRegisteredCorrectly() {
    this.showUserRegistered = true;
    this.openSnackBar("¡Genial! Has sido registrado correctamente en nuestra base de datos", true, 8000);
  }

  loading() {
    this.loadingBar = true;
    this.personalInformation.disable();
  }

  cancelLoading() {
    this.loadingBar = false;
    this.personalInformation.enable();
  }

  reload(){
    window.location.reload();
  }

}


export const userTranslations = [
  { name: "Identificación", value: "identification" },
  { name: "Nombre", value: "firstname" },
  { name: "Apellido", value: "lastname" },
  { name: "Fecha de nacimiento", value: "birthday" }
];

