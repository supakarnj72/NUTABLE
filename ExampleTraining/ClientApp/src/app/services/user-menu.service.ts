import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InsertPermissionParam } from '../models/user-menu.model';

@Injectable({
  providedIn: 'root'
})
export class UserMenuService {

  url = '';

constructor(private http: HttpClient) { 
  this.url = environment.urlApiTest;
}

public GetPermission(userId: number): Observable<any> {
  return this.http
    .get<any>(this.url + `/UserMenu/GetPermission/${userId}`)
}

public InsertPermission(insert: InsertPermissionParam): Observable<any> {
  return this.http
    .post<void>(this.url + "/UserMenu/InsertPermission" , insert)
}

}
