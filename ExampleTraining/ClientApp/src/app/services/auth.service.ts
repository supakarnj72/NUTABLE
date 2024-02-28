import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();

  public username: string = '';
  public password: string = '';

  public url = '';

  public canWrite: boolean = false;

  constructor(private http: HttpClient,
    private router: Router) {
    this.url = environment.urlApiTest;
  }


  getAuthStatus(id: number,url: string): Observable<any> {
    return this.http
      .post<any>(this.url + "/Auth/GetPermission", {
        userId: id,
        menuUrl: url
      })
  }

  public logOut(): void {
    localStorage.clear();
    this.router.navigate(['/login-page']);
  }







}

