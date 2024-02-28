import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IErrorPanel } from '../error-panel/error-panel.component';
import { catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  policy: string[] = ['test text'];

  url = '';

  public canWrite: boolean;

  public username: string = "";
  public password: string = "";

  @ViewChild('errorPanelModal') public errorPanal!: IErrorPanel;

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private userService: UserService) {
    this.url = environment.urlApiTest;
    this.canWrite = this.authService.canWrite;
  }

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm, error: IErrorPanel): void {
    const username = form.value.username;
    const password = form.value.password;
    const isAuthenticated = true;

    this.http
      .post<any>('https://localhost:7249/api/Auth/Login', {
        "username": username,
        "password": password,
      }).pipe(catchError((e) => {
        console.log(e.error.errorMessage);
        this.errorPanal.setError(e.error.errorMessage);
        return throwError('');
      }))
      .subscribe((response: any) => {
        localStorage.setItem("userId", response.userId);
        this.router.navigate(['/home']);
      })

  }


  public GetPolicy() {
    this.http
      .get<string[]>(this.url + "/Auth/GetPolicy", {
      })
      .subscribe((response: any[]) => {
        this.policy = response;
      })
  }

  public onUserNameChange($event: any): void {
    this.username = $event.target.value;
  }

  public onPasswordChange($event: any): void {
    this.password = $event.target.value;
  }

  public forgotPassword() {
    alert('test devextreme import!');
  }

  // public login() {
  //   this.errorPanal.clearError();

  //   const isAdminOrRoot = true;

  //   this.http
  //     .post<any>('https://localhost:7249/api/Auth/Login', {
  //       "username": this.username,
  //       "password": this.password
  //     }).pipe(catchError((e) => {
  //       console.log(e.error.errorMessage);
  //       this.errorPanal.setError(e.error.errorMessage);
  //       return throwError('');
  //     }))
  //     .subscribe((response: string[]) => {
  //       console.log(response);
  //       this.router.navigate(['/home', { isAdminOrRoot: isAdminOrRoot }]);
  //     })

  // }

}
