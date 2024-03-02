import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  // { path: 'login-page', component: LoginPageComponent },
  // { path: 'customer-list', component: CustomerListComponent, canActivate: [AuthGuard] },
  // { path: 'customer-detail', component: CustomerDetailsComponent, canActivate: [AuthGuard] },
  // { path: 'report-order', component: ReportOrderComponent, canActivate: [AuthGuard] },
  // { path: 'home', component: HomeComponent },
  // { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
  // { path: 'user-permission', component: UserPermissionComponent, canActivate: [AuthGuard] },
  // { path: 'unauthize', component: UnauthizeComponent},
  {
    path: '',
    redirectTo: 'app-root',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: [
    
  ]
})
export class AppRoutingModule { }
