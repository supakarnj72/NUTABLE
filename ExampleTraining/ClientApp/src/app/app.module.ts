import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { ReportOrderComponent } from './components/report-order/report-order.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ErrorPanelComponent } from './components/error-panel/error-panel.component';
import { Safe } from './pipes/safe.pipe';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './services/customer.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HighlightDirective } from './highlight.directive';
import { DxCheckBoxModule, DxDateBoxModule, DxRadioGroupModule, DxSelectBoxModule, DxSliderModule } from 'devextreme-angular';
import { HomeComponent } from './components/home/home.component';
import { UserPermissionComponent } from './components/user-permission/user-permission.component';
import { UnauthizeComponent } from './components/unauthize/unauthize.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DatePipe } from '@angular/common';
import dxCheckBox from 'devextreme/ui/check_box';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    ReportOrderComponent,
    LoginPageComponent,
    ErrorPanelComponent,
    Safe,
    HighlightDirective,
    HomeComponent,
    UserPermissionComponent,
    UnauthizeComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DxButtonModule,
    DxDataGridModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    ModalModule,
    DxSelectBoxModule,
    DxDateBoxModule,
    DxSliderModule,
    DxCheckBoxModule,
    DxRadioGroupModule,
    BrowserAnimationsModule
  ],
  providers: [CustomerService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
