import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteOrderDetailParam, DeleteOrderDetailViewModel, UpdateOrderDetailParam, UpdateOrderDetailViewModel } from '../models/order-detail.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  url = '';

  constructor(private http: HttpClient) {
    this.url = environment.urlApiTest;
  }

  public updateOrderDetail(updateOrderDetail: UpdateOrderDetailParam): Observable<UpdateOrderDetailViewModel> {
    return this.http
      .post<any>(this.url + "/OrderDetail/UpdateOrderDetail", updateOrderDetail)
  }

  public deleteOrderDetail(deleteOrderDetail: DeleteOrderDetailParam): Observable<DeleteOrderDetailViewModel> {
    return this.http
      .post<any>(this.url + "/OrderDetail/DeleteOrderDetail" , deleteOrderDetail)
  }
}

