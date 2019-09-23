import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export abstract class BaseService {
  private HttpUrl: Array<string> = environment.HttpUrl;

  constructor(private http: HttpClient) { }

  public get(url: string, root?: number) {
    return this.http.get(this.getUrl(url, root));
  }

  public post(url: string, data: JSON, root?: number) {
    return this.http.post(this.getUrl(url, root), data);
  }


  private getUrl(url: string, root?: number): string {
    return this.HttpUrl[root ? root : 0] + url
  }
}
