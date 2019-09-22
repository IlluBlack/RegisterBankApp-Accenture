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
    this.loading();

    this._getCreditService.isThisUserRegistered(this.identification.value).subscribe(response => {
      if(!response){
        this.continueNextStep();
      }else{
        this.openSnackBar("Lo sentimos. Tu identificación ya se encuentra registrada en nuestra base de datos", undefined, 8000);
        this.cancelLoading();
      }
    }, error => {
      this.openSnackBar("Lo sentimos. Ha ocurrido un error al intentar validar tu identificación", false);
      this.cancelLoading();
    });

  }

  continueNextStep(){
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
