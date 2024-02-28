import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  url = '';

constructor(private http: HttpClient) { 
  this.url = environment.urlApiTest;
}

public queryAllMenu(): Observable<any> {
  return this.http
    .get<any>(this.url + "/Menu/QueryAllMenu")
}

}

