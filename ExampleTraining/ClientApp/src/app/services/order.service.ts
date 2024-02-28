import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CreateOrderParam } from '../models/order.model';
import { UpdateOrderParam } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = '';

  constructor(private http: HttpClient) {
    this.url = environment.urlApiTest;
  }

  public updateOrder(updateOrder: UpdateOrderParam): Observable<void> {
    return this.http
      .post<any>(this.url + "/Order/UpdateOrder", updateOrder)
  }

  public deleteOrder(deleteOrder: string): Observable<void> {
    return this.http
      .delete<any>(this.url + "/Order/DeleteOrder/" + deleteOrder)
  }

  public createOrder(createOrder: CreateOrderParam): Observable<void> {
    return this.http
      .post<void>(this.url + "/Order/CreateOrder", createOrder)
  }

}
