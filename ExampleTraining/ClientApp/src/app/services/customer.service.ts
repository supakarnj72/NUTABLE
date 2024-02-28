import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateCustomerParam, UpdateCustomerParam, QueryAllCustomerParam } from '../models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = '';

  constructor(private http: HttpClient) {
    this.url = environment.urlApiTest;
  }

  public getPolicy() {
    return this.http
      .get<string[]>(this.url + "/Auth/GetPolicy")
  }

  public createCustomer(create: CreateCustomerParam): Observable<void> {
    return this.http
      .post<void>(this.url + "/Customer/CreateCustomer", create)
  }

  public updateCustomer(update: UpdateCustomerParam): Observable<void> {
    return this.http
      .post<void>(this.url + "/Customer/UpdateCustomer", update)
  }

  public deleteCustomer(deleteCustomer: number): Observable<void> {
    return this.http
      .delete<void>(this.url + "/Customer/DeleteCustomer/" + deleteCustomer)
  }

  public queryAllCustomer(param: QueryAllCustomerParam): Observable<any> {
    return this.http
      .post<any>(this.url + "/Customer/QueryAllCustomer", param)
  }

}
