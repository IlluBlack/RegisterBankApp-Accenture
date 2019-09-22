import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base/base.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetCreditService extends BaseService {

  constructor(private _http: HttpClient) {
    super(_http);
  }

  public isThisUserRegistered(identification: number) {
    return this.get("clients.json").pipe(map((response: Response) => {
      return this.validateUserIn(identification, response);
    }));
  }

  private validateUserIn(identification, data) : boolean{
    for (let user of Object.keys(data)) {
      if (data[user]['identification'] == identification) {
        return true;
      }
    }

    return false;
  }

  public registerUser(data) {
    return this.post("clients.json", data);
  }

}
