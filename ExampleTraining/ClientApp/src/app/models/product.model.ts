export class QueryAllProductParam {
    productID?: number;
    productName: string= '';
}

export class UpdateOrderParam {
    orderDate: any;
    orderId?: string = '';
}

export class AddToOrderParam {
    customerId?: number;
    productId?: number;
    productName: string = '';
    quantity?: number;
    price?: number;
}