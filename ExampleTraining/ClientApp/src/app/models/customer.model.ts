export class CreateCustomerParam {
    name: string ='';
    age: number= 1;
}

export class UpdateCustomerParam {
    customerId: number=0;
    name: string ='';
    age: number=0;
}

export class DeleteCustomerParam {
    customerId?: number;
}
export class QueryAllCustomerParam {
    name: string= '';
    status: string= '';
    loadOptions: any;
}

export class Change<T> {
    type!: 'insert' | 'update' | 'remove';
    key: any;
    data!: Partial<T>;
}


