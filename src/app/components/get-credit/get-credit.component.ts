import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { BaseComponent } from 'src/app/shared/base.component';
import { GetCreditService } from 'src/app/services/get-credit/get-credit.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-get-credit',
  templateUrl: './get-credit.component.html',
  styleUrls: ['./get-credit.component.scss']
})
export class GetCreditComponent extends BaseComponent implements OnInit {
  loadingBar: boolean = true;
  validID: boolean = false;

  identification: FormControl;

  constructor(private _getCreditService: GetCreditService, private _snackBar: MatSnackBar) {
    super(_snackBar);

    this.identification = new FormControl("", [Validators.required])
  }

  ngOnInit() {
    this.cancelLoading();
  }

  validateUser() {
    if (this.isIDNumber()) {
      if (this.isIDInteger()) {
        this.loading();
        this.isInDataBase();
      } else {
        this.showInvalidIdentificationInput("Recuerda que tu identificación no debe contener puntos ni comas", 6000);
      }
    } else {
      this.showInvalidIdentificationInput("Recuerda que tu identificación debe ser numérica");
    }
  }

  isIDNumber() {
    return !isNaN(Number(this.identification.value.toString()));
  }
  isIDInteger() {
    return Number.isInteger(Number(this.identification.value.toString()))
  }

  isInDataBase() {
    this._getCreditService.isThisUserRegistered(this.identification.value).subscribe(response => {
      if (!response) {
        this.continueNextStep();
      } else {
        this.showInvalidIdentificationInput("Lo sentimos. Tu identificación ya se encuentra registrada en nuestra base de datos", 8000);
      }
    }, error => {
      this.openSnackBar("Lo sentimos. Ha ocurrido un error al intentar validar tu identificación", false);
      this.cancelLoading();
    });
  }

  showInvalidIdentificationInput(message: string, time?: number) {
    this.openSnackBar(message, undefined, time ? time : 4000);
    this.cancelLoading();
  }

  private continueNextStep() {
    this.validID = true;
  }

  loading() {
    this.loadingBar = true;
    this.identification.disable();
  }

  cancelLoading() {
    this.loadingBar = false;
    this.identification.enable();
  }

}
