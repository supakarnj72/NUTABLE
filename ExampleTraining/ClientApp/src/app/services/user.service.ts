import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePasswordParam, CreateUserParam, UpdateUserParam, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user = new Subject<User>();
  
  url = '';
  
constructor(private http: HttpClient) { 
  this.url = environment.urlApiTest;
}

public queryAllUser(): Observable<any> {
  return this.http
    .get<any>(this.url + "/User/QueryAllUser")
}

public createUser(create: CreateUserParam): Observable<void> {
  return this.http
    .post<void>(this.url + "/User/CreateUser", create)
}

public changePassword(changePassword: ChangePasswordParam): Observable<void> {
  return this.http
    .post<void>(this.url + "/User/ChangePassword", changePassword)
}

public deleteUser(id: number): Observable<void> {
  return this.http
    .delete<void>(this.url + "/User/DeleteUser/" + id)
}

public updateUser(updateUser: UpdateUserParam): Observable<void> {
  return this.http
    .post<void>(this.url + "/User/UpdateUser" , updateUser)
}


}
