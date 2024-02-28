import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Change, CreateCustomerParam, UpdateCustomerParam } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import DataSource from 'devextreme/data/data_source';
import { DxDataGridComponent } from 'devextreme-angular';
import { IErrorPanel } from '../error-panel/error-panel.component';
import { catchError, throwError } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { AddToOrderParam, QueryAllProductParam } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  @ViewChild('errorPanelModal') public errorPanal!: IErrorPanel;
  @ViewChild("details") details!: CustomerDetailsComponent
  @ViewChild("customerGrid") customerGrid!: DxDataGridComponent

  // public summaryProduct = false;
  public modalCreate?: BsModalRef;

  enableEdit = false;
  enableEditIndex = null;

  public name: string = '';
  public age: number = 0;
  public customerId: number = 0;

  public products: any;
  public productID?: number;
  public quantity?: number;
  public orderId?: number;
  public totalPrice: number = 0;

  public dataSource!: any;
  public allowedPageSizes = [5];
  public displayMode = 'full'
  public showInfo = true;
  public showNavButtons = true;

  public customer: any;

  public createCustomerForm = new FormGroup({
    name: new FormControl(),
    age: new FormControl()
  })

  public addOrderForm = new FormGroup({
    quantity: new FormControl(),
    productItem: new FormControl()
  })

  public customerPay = new FormControl()

  public searchForm = new FormGroup({
    searchName: new FormControl(),
    newest: new FormControl(),
    oldest: new FormControl()
  })

  public dataOrder: AddToOrderParam[] = [];

  orderDate: any;
  Date = new Date();

  public status: string = '';

  public orderDetails: any;

  public seletcProduct!: QueryAllProductParam;

  changes: Change<any>[] = [];
  editRowKey?: any = null;

  public canWrite: boolean;

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private customerService: CustomerService,
    private productService: ProductService,
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.canWrite = this.authService.canWrite;
    this.dataSource = new DataSource({
      load: (loadOptions: any) => {
        return this.customerService.queryAllCustomer({
          name: this.name,
          loadOptions: loadOptions,
          status: this.status
        }).toPromise()
      }
    })
    
  }

  ngOnInit(): void {
  }

  public onSearchClick(): void {
    this.status = "";
    this.name = this.searchForm.value.searchName
    if (this.searchForm.value.newest)
      this.status = "newest";
    if (this.searchForm.value.oldest)
      this.status = "oldest";
    if (this.searchForm.value.newest && this.searchForm.value.oldest)
      this.status = "";
    this.customerGrid.instance.refresh()
  }

  public onCreateCustomerClick(template: TemplateRef<any>) {
    this.modalCreate = this.modalService.show(template, {
      class: 'modal-md'
    })
    this.createCustomerForm.reset()
  }

  public onSaveCreateCustomer(error: IErrorPanel): void {
    error.clearError();
    let customer = new CreateCustomerParam()
    customer.name = this.createCustomerForm.value.name
    customer.age = this.createCustomerForm.value.age
    this.customerService.createCustomer(customer).pipe(catchError((e) => {
      error.setError(e.error.errorMessage);
      return throwError('');
    })).subscribe(() => {
      this.customerGrid.instance.refresh()
      this.onCancel()
    })
  }

  public onSaveEditCustomer(error: IErrorPanel): void {
    error.clearError();
    let customer = new UpdateCustomerParam()
    customer.customerId = this.customerId
    customer.name = this.createCustomerForm.value.name
    customer.age = this.createCustomerForm.value.age
    this.customerService.updateCustomer(customer).pipe(catchError((e) => {
      error.setError(e.error.errorMessage);
      return throwError('');
    })).subscribe(() => {
      this.customerGrid.instance.refresh()
      this.onCancel()
    })
  }

  public onOrderCountClick(cell: any): void {
    this.details.openModal(cell)
  }

  public onCancel(): void {
    this.customerId = 0;
    this.createCustomerForm.reset()
    this.modalCreate?.hide()
    this.addOrderForm.reset()
  }

  public onEditCustomer(template: TemplateRef<any>, cell: any): void {
    this.createCustomerForm.patchValue({
      name: cell.data.name,
      age: cell.data.age
    })
    this.customerId = cell.data.customerID
    this.modalCreate = this.modalService.show(template, {
      class: 'modal-md'
    })
  }

  public onDeleteCustomer(cell: any, error: IErrorPanel): void {
    let result = confirm("Are you sure to delete?");
    if (result) {
      this.customerService.deleteCustomer(cell.data.customerID).pipe(catchError((e) => {
        error.setError(e.error.errorMessage);
        return throwError('');
      })).subscribe(() => {
        this.customerGrid.instance.refresh()
      })
    }
  }

  public onNewOrder(template: TemplateRef<any>, cell: any): void {
    this.productService.queryAllProduct().subscribe((response) => {
      this.products = response;
      this.seletcProduct = this.products[0]
    })
    this.customerId = cell.data.customerID
    this.dataOrder = [];
    this.addOrderForm.reset()
    this.customerPay.patchValue(0)
    this.totalPrice = 0;
    this.modalCreate = this.modalService.show(template, {
      class: 'modal-md'
    })

  }

  public onAddToOrder(): void {
    const newOrder: AddToOrderParam = {
      productName: this.addOrderForm.value.productItem.productName,
      quantity: this.addOrderForm.value.quantity,
      price: this.addOrderForm.value.productItem.price,
      productId: this.addOrderForm.value.productItem.productID
    };

    if (newOrder.quantity! > 0) {
      const oldOrder = this.dataOrder.findIndex(order => order.productName === newOrder.productName);

      if (oldOrder >= 0) {
        this.dataOrder[oldOrder].quantity! += newOrder.quantity!;
      } else {
        this.dataOrder.push(newOrder);
      }
      this.calTotalPrice();
    } else {
      alert("ไม่สามารถเพิ่มสินค้าได้");
    }
    this.addOrderForm.get('quantity')?.reset();
  }

  async onSaving(e: any) {
    const change = e.changes[0];
    if (change && change.type == 'update') {
      if (change.data.hasOwnProperty('productName'))
        alert('cannot be edited Product Name');
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
    this.dataOrder.forEach(dataOrder => {
      if (change.key.productId == dataOrder.productId) {
        dataOrder.quantity = change.data['quantity']
      }
    })
    this.calTotalPrice()
  }

  async processDeletingOrder(change: Change<any>) {
    const productNameToDelete = change.key.productName;
    const indexToDelete = this.dataOrder.findIndex(order => order.productName === productNameToDelete);
    if (indexToDelete !== -1) {
      this.dataOrder.splice(indexToDelete, 1);
    }
    this.calTotalPrice();
  }

  private calTotalPrice(): void {
    this.totalPrice = 0;
    this.dataOrder.forEach(dataOrder => {
      this.totalPrice += dataOrder.price! * dataOrder.quantity!;
    });
  }

  public onPurchase(): void {
    const order = {
      customerId: this.customerId,
      orderDate: this.Date,
      orderDetails: this.dataOrder
    };
    this.orderService.createOrder(order)
      .subscribe(() => {
        this.customerGrid.instance.refresh()
        this.onCancel()
      });
  }

  public refreshGrid(): void {
    this.customerGrid.instance.refresh();
  }

  public onLogOut(): void {
    this.authService.logOut()
  }
}

