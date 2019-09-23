import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { isUndefined } from 'util';
import { Router } from '@angular/router';

export abstract class BaseComponent {
  private snackBarTime: number = 4000;

  private errorMessages = {
    required: "Éste campo es obligatorio",
  }

  constructor(private snackBar?: MatSnackBar, private router?: Router) { }

  public openSnackBar(snackMessage: string, cssClass?: boolean, time?: number) {
    this.snackBar.open(snackMessage, "", {
      duration: time ? time : this.snackBarTime,
      panelClass: isUndefined(cssClass) ? "" : cssClass ? "snack-true" : "snack-false"
    });
  }

  public getErrorMessage(formControl: FormControl) {
    const ERROR = formControl.errors;
    if (!formControl.errors) return "";

    for (let error of Object.keys(this.errorMessages)) {
      if (ERROR[error]) {
        return this.errorMessages[error];
      }
    }
  }

  public format_DD_MM_YYYY(date: Date) : string {
    let dateNumbers: Array<number> = [0,0,0];
    dateNumbers[0] = date.getDate(); //day
    dateNumbers[1] = (date.getMonth() + 1); //Month starts in zero
    dateNumbers[2] = date.getFullYear(); //year

    let dateStrings: Array<String> = ["","",""];

    let cont = 0;
    for(let number of dateNumbers){
      if(number< 10){
        dateStrings[cont] = "0" + dateNumbers[cont].toString();
      }else{
        dateStrings[cont] = dateNumbers[cont].toString();
      }

      cont++;
    }

    return `${dateStrings[0]}-${dateStrings[1]}-${dateStrings[2]}`;
  }

}
