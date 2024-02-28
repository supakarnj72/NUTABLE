
export class UpdateOrderDetailParam {
    productId?: number;
    quantity?: number;
}
export class DeleteOrderDetailParam {
    productId?: number;
    orderId: string='';
}

export interface DeleteOrderDetailViewModel {
    isRefresh: boolean;
    message: string;
}

export interface UpdateOrderDetailViewModel {
    isRefresh: boolean;
    message: string;
}
