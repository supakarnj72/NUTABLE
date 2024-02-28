import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IErrorPanel } from '../error-panel/error-panel.component';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
import { DeleteOrderDetailParam, DeleteOrderDetailViewModel, UpdateOrderDetailParam, UpdateOrderDetailViewModel } from 'src/app/models/order-detail.model';
import { Change } from 'src/app/models/customer.model';
import { UpdateOrderParam } from 'src/app/models/product.model';
@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  @Output('onUpdate') onUpdate: EventEmitter<void> = new EventEmitter();
  
  @ViewChild("orderDetailsModal") modal!: TemplateRef<any>
  @ViewChild("orderCustomerGrid") orderCustomerGrid!: DxDataGridComponent
  @ViewChild('errorPanelModal') public errorPanal!: IErrorPanel;
  @ViewChild("customerGrid") customerGrid!: DxDataGridComponent

  public dataSource!: any[]
  public allowedPageSizes = [5];
  public displayMode = 'full'
  public showInfo = true;
  public showNavButtons = true;

  public modalOrderDetails?: BsModalRef;

  public orderCustomer: any[] = [];

  public nameCustomer: string = "";

  public orderDetails: any;
  public orderDetailShow = false;

  private customerId: number = 0;
  private orderId: string = '';

  changes: Change<any>[] = [];
  editRowKey?: any = null;

  constructor(private modalService: BsModalService,
    private http: HttpClient,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService) {
  }

  ngOnInit(): void {

  }

  public openModal(cell: any): void {
    this.queryAllOrders(cell.customerID);
    this.customerId = cell.customerID;
    this.nameCustomer = cell.name;
    this.modalOrderDetails = this.modalService.show(this.modal, {
      class: 'modal-xl'
    })
  }

  public orderDetailClick(cell: any): void {
    this.orderId = cell.orderId
    this.orderDetailShow = !this.orderDetailShow;
    this.queryAllOrderDetails(cell.orderId);
  }

  public queryAllOrders(customerId: number) {
    this.http
      .post<any>('https://localhost:7249/api/Order/QueryAllOrders/' + customerId, {
      })
      .subscribe((response: any[]) => {
        this.orderCustomer = response;
      })
  }


  public onCancel(): void {
    this.modalOrderDetails?.hide();
    this.orderDetailShow = !this.orderDetailShow;
  }

  public queryAllOrderDetails(orderId: string) {
    this.http
      .post<any>('https://localhost:7249/api/OrderDetail/QueryAllOrdersDetails/' + orderId, {
      })
      .subscribe((response) => {
        this.orderDetails = response;
      })
  }

  async onSaving(e: any) {
    const change = e.changes[0];
    if (change && change.type == 'update') {
      if (change.data.hasOwnProperty('orderId'))
        alert('cannot be edited Order Id');
      if (change.data.hasOwnProperty('totalPrice'))
        alert('cannot be edited Total Price');
      if (change.data.hasOwnProperty('orderDetails'))
        alert('cannot be edited Order Details');
      e.cancel = true;
      change.data = { ...change.key, ...change.data };
      e.promise = this.processSavingOrder(change);
      //for error data grid promise will set (await is not require)
    } else if (change && change.type == 'remove') {
      e.cancel = true;
      change.data = { ...change.key, ...change.data };
      e.promise = this.processDeletingOrder(change);
    }
  }

  async processSavingOrder(change: Change<any>) {
    let order = new UpdateOrderParam();
    order.orderId = change.key.orderId;
    order.orderDate = change.data['dateTime'];
    this.orderService.updateOrder(order).subscribe(
      () => {
        this.queryAllOrders(this.customerId);
        this.queryAllOrderDetails(this.orderId);
      },
      (error) => {
        console.error('Error updating order:', error);
      }
    );
  }

  async processDeletingOrder(change: Change<any>) {
    return this.orderService.deleteOrder(change.key.orderId).subscribe(
      () => {
        this.queryAllOrders(this.customerId);
        this.queryAllOrderDetails(this.orderId);
      },
      (error) => {
        console.error('Error deleting order:', error);
      }
    );
  }

  async onSavingOrderDetail(e: any) {
    const change = e.changes[0];
    if (change && change.type == 'update') {
      e.cancel = true;
      change.data = { ...change.key, ...change.data };
      e.promise = this.processSavingOrderDetail(change);
      //for error data grid promise will set (await is not require)
    } else if (change && change.type == 'remove') {
      e.cancel = true;
      change.data = { ...change.key, ...change.data };
      e.promise = this.processDeletingOrderDetail(change);
    }
  }

  async processSavingOrderDetail(change: Change<any>) {
    let orderDetail = new UpdateOrderDetailParam();
    orderDetail.productId = change.key.productId;
    orderDetail.quantity = change.data['quantity'];
    this.orderDetailService.updateOrderDetail(orderDetail).subscribe(
      (res: UpdateOrderDetailViewModel) => {
        if(!!res.message)
          alert(res.message)
        this.queryAllOrders(this.customerId);
        this.queryAllOrderDetails(this.orderId);
        this.onUpdate.emit();
      },
      (error) => {
        console.error('Error updating order:', error);
      }
    );
  }

  async processDeletingOrderDetail(change: Change<any>) {
    let orderDetail = new DeleteOrderDetailParam();
    orderDetail.orderId = this.orderId
    orderDetail.productId = change.key.productId;
    console.log(orderDetail);
    
    this.orderDetailService.deleteOrderDetail(orderDetail).subscribe(
      (res: DeleteOrderDetailViewModel) => {
        if(!!res.message)
          alert(res.message)
        this.queryAllOrders(this.customerId);
        this.queryAllOrderDetails(this.orderId);
        this.onUpdate.emit();
        if (res.isRefresh)
          this.onCancel()
      },
      (error) => {
        console.error('Error deleting order:', error);
      }
    );
  }

}
