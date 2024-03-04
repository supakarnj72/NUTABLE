import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomePageComponent } from './components/main/components/home-page/home-page.component';
import { CourseEntryComponent } from './components/course/components/course-entry/course-entry.component';
import { CoursePageComponent } from './components/course/components/course-page/course-page.component';
import { ProfessorPageComponent } from './components/professor/components/professor-page/professor-page.component';
import { SchedulePageComponent } from './components/schedule/components/schedule-page/schedule-page.component';


const routes: Routes = [
  {
    path: 'home-page',
    component: HomePageComponent
  },
  {
    path: 'course-entry',
    component: CourseEntryComponent
  },
  {
    path: 'course-page',
    component: CoursePageComponent
  },
  {
    path: 'professor-page',
    component: ProfessorPageComponent
  },
  {
    path: 'schedule-page',
    component: SchedulePageComponent
  },
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
