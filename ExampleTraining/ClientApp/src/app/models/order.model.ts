export class CreateOrderParam {
    cutomerId?: number;
    orderDate: Date= new Date();
    orderDetails: OrderDetails[]=[];
}
export class OrderDetails {
    productId?: number;
    quantity?: number;
}