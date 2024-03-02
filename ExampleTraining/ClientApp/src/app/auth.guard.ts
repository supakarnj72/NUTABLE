import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { PermissionViewModel } from './models/user-menu.model';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  public id: any;

  constructor(private router: Router, private authService: AuthService) {
    this.id = parseInt(localStorage.getItem('userId')!);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let model: PermissionViewModel;
    let isAuth: boolean;
    this.authService.getAuthStatus(this.id, state.url).subscribe((res: PermissionViewModel) => {
      console.log("call back");

      model = res;
      isAuth = ( model.permission != "Write" && model.permission != "Read" ) ? false : true;
      if (!isAuth) {
        this.router.navigate(['/unauthize']);
        return isAuth;
      } else {
        if (model.permission == "Write") {
          this.authService.canWrite = true;
        } else {
          this.authService.canWrite = false;
        }
        return isAuth;
      }
    });
    return true;
  }

}