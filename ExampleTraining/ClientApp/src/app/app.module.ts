import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Safe } from './pipes/safe.pipe';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './services/customer.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HighlightDirective } from './highlight.directive';
import { DxCheckBoxModule, DxDateBoxModule, DxRadioGroupModule, DxSelectBoxModule, DxSliderModule } from 'devextreme-angular';
import { DatePipe } from '@angular/common';
import { MenuComponent } from './components/core/menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    Safe,
    HighlightDirective,
    MenuComponent
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
    DxRadioGroupModule
  ],
  providers: [CustomerService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
